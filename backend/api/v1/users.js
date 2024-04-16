// api/routes/users.js - api routes for the application

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createConnectPool, logger } from '../../src/db.js';

import dotenv from 'dotenv';

dotenv.config({ path: '../env/.env.app' });
dotenv.config({ path: '../env/.env.mysql' });

const userRoutes = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: List all users from the database
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Database error
 */
userRoutes.get('/api/v1/users', async (req, res) => {
    try {
        const pool = createConnectPool(); // Create the connection pool
        const connection = await pool.getConnection(); // Get a connection from the pool
        const [users] = await connection.query('SELECT * FROM users'); // Execute the query
        connection.release(); // Release the connection back to the pool
        return res.json(users);
    } catch (error) {
        logger.error('Database error:', error);
        res.status(500).send('Error fetching users');
    }
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
userRoutes.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const result = await mysqlPool.query(
            'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login as a registered user
 *     description: Authenticate a user and log them in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
userRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [user] = await mysqlPool.query('SELECT * FROM Users WHERE username = ?', [username]);

        if (user && await bcrypt.compare(password, user.password)) {
            // Generate JWT token
            const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default userRoutes;
