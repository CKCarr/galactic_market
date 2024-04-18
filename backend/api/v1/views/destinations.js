// api/v1/views

import express from 'express';

import destinationController from '../controllers/destinationController.js';
import { createConnectPool } from '../../../src/db.js';

const destRoute = express.Router();
const mysqlPool = createConnectPool();

// Apply authMiddleware to routes that require authentication
// destRoute.use(authMiddleware);

// retrieves list of destinations
/**
 * @swagger
 * /destinations:
 *   get:
 *     summary: Retrieve a list of all destinations
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: A list of destinations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Destination'
 */

destRoute.get('/destinations', destinationController.getAll);

// retrieves details of a specific destination
/**
 * @swagger
 * /destinations/{dest_id}:
 *   get:
 *     summary: Retrieve details about a specific destination
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: destination_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the destination to retrieve
 *     responses:
 *       200:
 *         description: Detailed information about the destination
 *       404:
 *         description: Destination not found
 */
destRoute.get('/destinations/:dest_id', destinationController.getById);

// updates a destination
/**
 * @swagger
 * /destinations/{dest_id}:
 *   put:
 *     summary: Update details of a specific destination
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: destination_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Destination'
 *     responses:
 *       200:
 *         description: Destination updated successfully
 *       404:
 *         description: Destination not found
 */
destRoute.put('/destinations/:dest_id', destinationController.update);

//schema for destinations
/**
 * @swagger
 * components:
 *   schemas:
 *     Destination:
 *       type: object
 *       required:
 *         - dest_id
 *         - name
 *         - description
 *         - image_url
 *         - price
 *       properties:
 *         dest_id:
 *           type: integer
 *           description: The auto-generated id of the destination
 *         name:
 *           type: string
 *           description: Name of the destination
 *         description:
 *           type: string
 *           description: Detailed description of the destination
 *         image_url:
 *           type: string
 *           description: URL to an image of the destination
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the destination in USD
 */

export default destRoute;
