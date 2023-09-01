const express = require('express');
const categoryRouter = express.Router();
const Category = require('../models/category');

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get a list of categories
 *     description: Retrieve a list of categories with their names and descriptions.
 *     responses:
 *       200:
 *         description: A list of categories.
 *       500:
 *         description: Unable to fetch categories.

 *   post:
 *     summary: Create a new category
 *     description: Create a new category with a name and description.
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
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Unable to create category.
 */


categoryRouter.get('/', async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find({}, 'name description');

    // Return the list of categories
    res.json(categories);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Unable to fetch categories' });
  }
});

categoryRouter.post('/', async (req, res) => {
    try {
      // Extract category data from the request body
      const { name, description } = req.body;
  
      // Create a new category object
      const newCategory = new Category({ name, description });
  
      // Save the new category to the database
      await newCategory.save();
  
      // Return a success response
      res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
      // Handle any errors
      res.status(400).json({ error: 'Unable to create category' });
    }
  });

module.exports = {categoryRouter};
