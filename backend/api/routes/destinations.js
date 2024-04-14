import express from 'express';
import { readCSV } from '../../utils/readCSV.js';

const destRouter = express.Router();
const csvFilePath = '../../datasets/destinations.csv';


let destinations = [];

readCSV(csvFilePath).then(data => {
    destinations = data;
    console.log('Destinations loaded:', destinations);
}).catch(err => {
    console.error('Failed to load destinations:', err);
});


// schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Destination:
 *       type: object
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
 *       required:
 *         - name
 *         - description
 *         - price
 */

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
destRouter.get('/destinations', (req, res) => {
    if (destinations.length > 0) {
        res.json(destinations);
    } else {
        res.status(404).send({ message: 'No destinations found' });
    }
});

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
destRouter.post('/destinations', (req, res) => {
    const { name, description, image_url, price } = req.body;
    const newDestination = {
        destination_id: destinations.length + 1,
        name,
        description,
        image_url,
        price
    };
    destinations.push(newDestination);
    res.status(201).json(newDestination);
});

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
destRouter.get('/:destination_id', (req, res) => {
    const destination = destinations.find(d => d.destination_id === parseInt(req.params.destination_id));
    if (destination) {
        res.json(destination);
    } else {
        res.status(404).json({ message: 'Destination not found' });
    }
});


/**
 * @swagger
 * /destinations/{destination_id}/price:
 *   get:
 *     summary: Retrieve the price of a specific destination
 *     tags: [Destinations]
 *     parameters:
 *       - in: path
 *         name: destination_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the destination whose price is being retrieved
 *     responses:
 *       200:
 *         description: Price of the destination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the destination
 *       404:
 *         description: Destination not found
 */
destRouter.get('/:destination_id/price', (req, res) => {
    const destination = destinations.find(d => d.destination_id === parseInt(req.params.destination_id));
    if (destination) {
        res.json({ price: destination.price });
    } else {
        res.status(404).json({ message: 'Destination not found' });
    }
});

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
 *         description: The ID of the destination to update
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
destRouter.put('/:destination_id', (req, res) => {
    const index = destinations.findIndex(d => d.destination_id === parseInt(req.params.destination_id));
    if (index !== -1) {
        destinations[index] = {...destinations[index], ...req.body};
        res.json(destinations[index]);
    } else {
        res.status(404).json({ message: 'Destination not found' });
    }
});


export default destRouter;