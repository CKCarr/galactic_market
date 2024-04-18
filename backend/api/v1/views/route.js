// api/routes/routes.js - api routes for the application

import express from 'express';
const router = express.Router();

/*
swagger: '2.0'
info:
    title: Galactic Destination custom API
    version: 1.0.0
    description: A custom API for Galactic Destination project
    contact:
        name: Galactic Destination Team
        email:
    securitySchemes:
        bearerAuth:
            type: http
            scheme: bearer
            bearerFormat: JWT

    security:
        - bearerAuth: []
*/
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
