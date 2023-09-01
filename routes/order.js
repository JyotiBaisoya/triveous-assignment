const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/order');
const {authenticateToken} = require('../middleware/auth');
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Place an order
 *     description: Create a new order with a list of products and calculate the total order amount.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *       400:
 *         description: Unable to place the order.
 *       500:
 *         description: An error occurred.

 *   get:
 *     summary: Get order history
 *     description: Retrieve the order history for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history for the authenticated user.
 *       500:
 *         description: Unable to fetch order history.

 * /order/history:
 *   get:
 *     summary: Get order history
 *     description: Retrieve the order history for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history for the authenticated user.
 *       500:
 *         description: Unable to fetch order history.

 * /order/{orderId}:
 *   get:
 *     summary: Get order details by ID
 *     description: Retrieve the order details for a specific order by its ID for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Unable to fetch order details.
 */



orderRouter.post('/', authenticateToken, async (req, res) => {
  try {
    const { products } = req.body;

    // Calculate the total order amount
    const totalAmount = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    // Create a new order
    const newOrder = new Order({
      user: req.user.userId, // User ID from authentication
      products,
      totalAmount,
    });

    // Save the new order to the database
    await newOrder.save();

    // Return a success response
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Unable to place the order' });
  }
});

// Order History (GET)
orderRouter.get('/history', authenticateToken, async (req, res) => {
  try {
    // Fetch the order history for the authenticated user
    const orders = await Order.find({ user: req.user.userId}).populate(
      'products.product'
    );

    // Return the order history
    res.json(orders);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Unable to fetch order history' });
  }
});

// Order Details (GET)
orderRouter.get('/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch the order details by order ID for the authenticated user
    const order = await Order.findOne({ _id: orderId, user: req.user.userId }).populate(
      'products.product'
    );

    if (!order) {
      // Order not found
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return the order details
    res.json(order);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Unable to fetch order details' });
  }
});

module.exports = orderRouter;
