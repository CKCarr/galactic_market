import express from 'express';
import logger from '../../../utils/logger.js';
import { authMiddleware } from '../../../utils/authMiddleware.js';

const sessionRoute = express.Router();

// const mysqlPool = createConnectPool();
// sessionRoute.use(authMiddleware);
/**
 * @swagger
 * /session:
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
sessionRoute.get('/session', authMiddleware, (req, res) => {
    if (!req.user) {
        logger.error('Unauthorized - No user object present');
        return res.status(401).json({ message: 'Unauthorized - No user object present' });
    }
    logger.info('User session is active - User:', req.user.name);
    res.status(200).json({ message: 'User session is active', user: req.user });
});

export default sessionRoute;
