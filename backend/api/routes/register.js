// api/routes/register.js - api routes for the application

import express from 'express';
const registerRoute = express.Router();

/**
 * @swagger
 * /register:
 *  post:
 *  summary: Register a new user
 *  description: Register a new user with username, email and password.
 * responses:
 *  201:
 *      description: User created successfully
 *  400:
 *      description: Username, email and password are required.
 *  500:
 *      description: Server error
 * 
 */
registerRoute.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required.' });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const result = await mysql_db.query(
            'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default registerRoute;
