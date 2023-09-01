// routes/products.js
const express = require('express');
const Product = require('../models/product');
const {authenticateToken} = require("../middleware/auth"); // Import authentication middleware

const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of products with essential details such as name, price, description, and availability.
 *     responses:
 *       200:
 *         description: A list of products.
 *       500:
 *         description: An error occurred.

 *   post:
 *     summary: Create a new product
 *     description: Create a new product with a name, description, price, category, image, and availability.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *               availability:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       500:
 *         description: An error occurred.

 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve detailed information of a specific product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details.
 *       500:
 *         description: An error occurred.

 *   put:
 *     summary: Update a product by ID
 *     description: Update a product's name, description, price, category, and image by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated product details.
 *       500:
 *         description: An error occurred.

 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       500:
 *         description: An error occurred.
 */



productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

productRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const products = await Product.find({_id:id});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


// POST: Create a new product (protected route)
productRouter.post('/', async (req, res) => {
    try {
        const { name, description, price, category, image ,availability} = req.body;
        const newProduct = new Product({ name, description, price, category, image,availability });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


// // PUT: Update a product by ID (protected route)
productRouter.put('/:id',authenticateToken, async (req, res) => {
  try {
        const { name, description, price, category, image } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, image },
            { new: true } // Return the updated document
        );
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
     }
});

// DELETE: Delete a product by ID (protected route)
productRouter.delete('/:id',authenticateToken, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = {productRouter};
