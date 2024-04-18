// api/routes/users.js - api routes for the application

import express from 'express';
import userController from '../controllers/userController.js';
const userRoutes = express.Router();




/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Register a new user with username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
userRoutes.post('/register', userController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     description: Login user with username and password to generate JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Server error
 */
userRoutes.post('/login', userController.login);

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - email
 *          - password
 *        properties:
 *          username:
 *            type: string
 *            description: The username of the user.
 *          email:
 *            type: string
 *            format: email
 *            description: The email address of the user.
 *          password:
 *            type: string
 *            format: password
 *            description: The password of the user.
 */

export default userRoutes;
// Path: backend/api/v1/views/users.js
