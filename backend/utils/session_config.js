// utils/session_config.js

import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { createConnectPool } from '../src/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: './env/.env.app' });

// Import the SESSION_SECRET from environment variables
const SESSION_SECRET = process.env.SESSION_SECRET;

// Generate a random session ID
const generateSessionId = () => {
    // Generate a random string using alphanumeric characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const sessionIdLength = 32; // You can adjust the length as needed
    let sessionId = '';
    for (let i = 0; i < sessionIdLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        sessionId += characters.charAt(randomIndex);
    }
    return sessionId;
};

// Configure session middleware using SESSION_SECRET
const sessionMiddleware = session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge:  24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (24 hours)
        httpOnly: true,
    },
});

// Middleware function to manage sessions
const saveSession = (req, res, next) => {
    const session = req.session;
    const currentTime = Date.now();
    const sessionDurationMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Generate session ID if not present
    if (!session.id) {
        session.id = generateSessionId(); // Use the generated session ID
    }

    // Check if session exists and expiration is in the future
    if (session && session.expires > currentTime) {
        next(); // Session is valid, proceed
    } else {
        // Session expired or doesn't exist, create/update session
        const newExpires = currentTime + sessionDurationMs;
        session.expires = newExpires;
        next(); // Proceed to save the session automatically by express-session middleware
    }
};

export { sessionMiddleware, saveSession, generateSessionId };
// Path: backend/utils/session_config.js
