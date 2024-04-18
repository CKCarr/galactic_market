import { createConnectPool } from '../../../src/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config({ path: './env/.env.app' });
import { body, validationResult } from 'express-validator';
import { generateJWTToken } from '../../../utils/authMiddleware.js';

const mysqlPool = createConnectPool();


// Function to find a user by username
export async function findUserByUsername(username) {
    try {
        const [user] = await mysqlPool.query('SELECT * FROM users WHERE username = ?', [username]);
        return user[0] || null;
    } catch (error) {
        logger.error('Error finding user by username:', error);
        throw error;
    }
};

// Function to create a new user
export async function createUser(username, email, password) {
    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await mysqlPool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        return result.insertId;
    } catch (error) {
        logger.error('Error creating user:', error);
        throw error;
    }
};

// Function to verify user credentials and generate JWT token
export async function loginUser(username, password) {
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return null; // User not found
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null; // Incorrect password
        }
        const token = generateJWTToken(user.userId, user.username);
        return token;
    } catch (error) {
        logger.error('Error logging in user:', error);
        throw error;
    }
};
// Path: backend/api/v1/models/user_models.js
