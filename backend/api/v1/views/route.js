// api/v1/views/routes.js - api routes for the application

import express from 'express';
import { logger } from '../../../src/db.js'
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Returns a welcome message to the API root endpoint.
 *     responses:
 *       200:
 *         description: A welcome message.
 */
router.get('/', (req, res) => {
    res.send('Welcome to the Galactic Destinations Market !!!');
});

export default router;
