// /api/v1/views/health
import express from 'express';
const healthRoute = express.Router();
import { authMiddleware } from '../../../utils/authMiddleware.js';

// Middleware to verify user authentication
// healthRoute.use(authMiddleware);

/**
 * @swagger
 * /health:
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
healthRoute.get('/health', (req, res) => {
  // Perform necessary checks, such as database connectivity
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    // Return a response with a status code of 200
    req.session.views = req.session.views ? req.session.views + 1 : 1;
    res.status(200).send(healthCheck);
  } catch (e) {
    healthCheck.message = e.message || 'Internal Server Error';
    res.status(503).send(healthCheck);
  }
});

export default healthRoute;
