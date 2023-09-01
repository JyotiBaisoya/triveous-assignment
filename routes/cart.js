// routes/cart.js
const express = require('express');
const Cart = require('../models/cart');
const {authenticateToken} = require('../middleware/auth');

const cartRouter = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's cart
 *     description: Retrieve the user's cart, which contains a list of products.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart.
 *       500:
 *         description: Unable to fetch user's cart.

 *   post:
 *     summary: Add a product to the cart
 *     description: Add a product to the user's cart by specifying the product ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to add to the cart.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product added to cart.
 *       500:
 *         description: Unable to add the product to the cart.

 * /cart/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     description: Remove a product from the user's cart by specifying the product ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to remove from the cart.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from cart.
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Unable to remove the product from the cart.
 */


// GET: Fetch user's cart (protected route)
cartRouter.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from decoded token
        const cart = await Cart.findOne({ user: userId }).populate('products');
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

cartRouter.post('/add/:productId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If cart doesn't exist, create a new one
            cart = new Cart({ user: userId, products: [] });
        }

        // Add the product to the cart's products array
        cart.products.push(productId);
        await cart.save();

        res.json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

cartRouter.delete('/remove/:productId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product from the cart's products array
        cart.products.pull(productId);
        await cart.save();

        res.json({ message: 'Product removed from cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = cartRouter;
