import express from 'express';
// import { authMiddleware }  from '../../../utils/authMiddleware.js';
// import { createConnectPool } from '../../../src/db.js';


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
sessionRoute.get('/session', (req, res) => {
    if (!req.user) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    res.status(200).send({ message: 'User session is active' });
});

export default sessionRoute;
