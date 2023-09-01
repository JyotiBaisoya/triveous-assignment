
const express = require('express');
const bcrypt = require('bcrypt');
const User= require('../models/user');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userRouter = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a unique email and hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       401:
 *         description: User already exists. Please login.
 *       500:
 *         description: An error occurred.
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user with their email and password, and provide a JWT token for access to protected routes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: User logged in successfully. Returns a JWT token.
 *       401:
 *         description: User not found or incorrect password. Please check your credentials.
 *       500:
 *         description: An error occurred.
 */


userRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(401).json({ message: 'User already exists Please Login !' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not exists Please Signup First !' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect Password Please Check Again !' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
              process.env.secretKey,
            { expiresIn: '12h' }
        );

        res.status(200).json({ token, user,message:"Logged In Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = {userRouter};

