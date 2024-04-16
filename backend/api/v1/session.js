
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createConnectPool, logger } from '../../src/db.js';

dotenv.config({ path: '../env/.env.app' });
dotenv.config({ path: '../env/.env.mysql' });

const sessionRoute = express.Router();

/**
 * @swagger
 * /api/v1/session:
 *   get:
 *     summary: Check user session
 *     description: Check if a user session is still active.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User session is active
 *       401:
 *         description: Unauthorized
 */
sessionRoute.get('/api/v1/session', (req, res) => {
    res.json({ message: 'Session active' });

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {

            res.status(401).json({ message: 'Unauthorized' });
        } else {
            res.json({ message: 'Session active' });
        }
    });
});

export default sessionRoute;
