import express from 'express';
import { mysqlPool } from '../../src/db.js';
const destRoute = express.Router();

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
destRoute.get('/', async (req, res) => {
    try {
        const [destinations] = await mysqlPool.query('SELECT dest_name, dest_description, dest_price, dest_image_url FROM destinations');
        if (destinations.length > 0) {
            res.json(destinations);
        } else {
            res.status(404).send({ message: 'No destinations found' });
        }
    } catch (err) {
        console.error('Error fetching destinations from database:', err);
        res.status(500).send({ message: 'Error fetching destinations', error: err.message });
    }
});

// creates new destination
/**
 * @swagger
 * /destinations:
 *   post:
 *     summary: Create a new destination
 *     tags: [Destinations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Destination'
 *     responses:
 *       201:
 *         description: Destination created successfully
 */
destRoute.post('/', async (req, res) => {
    const { dest_name, dest_description, dest_price, dest_image_url } = req.body;
    try {
        const [result] = await mysqlPool.query('INSERT INTO destinations (dest_name, dest_description, dest_price, dest_image_url) VALUES (?, ?, ?, ?)', [dest_name, dest_description, dest_price, dest_image_url]);
        res.status(201).json({ message: 'Destination created successfully', destination_id: result.insertId });
    } catch (error) {
        console.error('Error adding destination:', error);
        res.status(500).send('Error adding destination');
    }
});

// retrieves details of a specific destination
/**
 * @swagger
 * /destinations/{destination_id}:
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
destRoute.get('/:destination_id', async (req, res) => {
    const { destination_id } = req.params;
    try {
        const [destinations] = await mysqlPool.query('SELECT dest_name, dest_description, dest_price, dest_image_url FROM destinations WHERE destination_id = ?', [destination_id]);
        const destination = destinations[0];
        if (destination) {
            res.json(destination);
        } else {
            res.status(404).json({ message: 'Destination not found' });
        }
    } catch (error) {
        console.error('Error fetching destination:', error);
        res.status(500).send('Error fetching destination');
    }
});

// updates a destination
/**
 * @swagger
 * /destinations/{destination_id}:
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
destRoute.put('/:destination_id', async (req, res) => {
    const { dest_name, dest_description, dest_price, dest_image_url } = req.body;
    const { destination_id } = req.params;
    try {
        const [result] = await mysqlPool.query('UPDATE destinations SET dest_name = ?, dest_description = ?, dest_price = ?, dest_image_url = ? WHERE destination_id = ?', [dest_name, dest_description, dest_price, dest_image_url, destination_id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Destination not found');
        } else {
            res.status(200).send('Destination updated successfully');
        }
    } catch (error) {
        console.error('Error updating destination:', error);
        res.status(500).send('Error updating destination');
    }
});


//schema for destinations

/**
 * @swagger
 * components:
 *   schemas:
 *     Destination:
 *       type: object
 *       required:
 *         - destination_id
 *         - name
 *         - description
 *         - image_url
 *         - price
 *       properties:
 *         destination_id:
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