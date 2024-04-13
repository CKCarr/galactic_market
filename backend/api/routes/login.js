// api/routes/login.js

// import mysql_db from '../../src/db';
import express from 'express';
import bcrypt from 'bcrypt';
const loginRoute = express.Router();

/**
 * @swagger
 * /login:
 * post:
 *  summary: Login a user
 *  description: Login a user with username and password.
 * responses:
 *  200:
 *      description: Login successful
 *  401:
 *      description: Invalid credentials
 *  500:
 *      description: Server error
*/

// User login route
loginRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [user] = await mysql_db.query('SELECT * FROM Users WHERE username = ?', [username]);

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default loginRoute;
