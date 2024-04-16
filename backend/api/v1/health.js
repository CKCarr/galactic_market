// /api/v1/health
//         // Optionally include a database check or other critical checks

import express from 'express';
const healthRoute = express.Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Check the health of the application
 *     description: Check if the application is running
 *     responses:
 *       200:
 *         description: OK
 *       503:
 *         description: Service Unavailable
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             uptime:
 *               type: number
 *               description: The uptime of the application
 *             message:
 *               type: string
 *               description: The status of the application
 *             timestamp:
 *               type: number
 *               description: The current timestamp
 */

healthRoute.get('/api/v1/health', (req, res) => {
    // Perform necessary checks, such as database connectivity
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        // Optionally include a database check or other critical checks
        res.send(healthCheck);
    } catch (e) {
        healthCheck.message = e;
        res.status(503).send(healthCheck);
    }
});

export default healthRoute;
