import express from 'express';
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
destRoute.get('/destination', async (req, res) => {
    try {
        const [destinations] = await mysql_db.query('SELECT * FROM Destinations');
        if (destinations.length > 0) {
            res.json(destinations);
        } else {
            res.status(404).send({ message: 'No destinations found' });
        }
    } catch (err) {
        console.error('Error fetching destinations from database:', err);
        res.status(500).send('Error fetching destinations');
    }
});

//creates new destination
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
destRoute.post('/destination', async (req, res) => {
    const { name, description, image_url, price } = req.body;
    try {
        const [result] = await mysql_db.query('INSERT INTO Destinations (name, description, image_url, price) VALUES (?, ?, ?, ?)', [name, description, image_url, price]);
        res.status(201).json({ message: 'Destination created successfully', destination_id: result.insertId });
    } catch (error) {
        console.error('Error adding destination:', error);
        res.status(500).send('Error adding destination');
    }
});

//retrieves details of destination
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
    try {
        const [destinations] = await mysql_db.query('SELECT * FROM Destinations WHERE destination_id = ?', [req.params.destination_id]);
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


//gets price of destination
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
destRoute.put('/:destination_id', async (req, res) => {
    const { name, description, image_url, price } = req.body;
    try {
        const [result] = await mysql_db.query('UPDATE Destinations SET name = ?, description = ?, image_url = ?, price = ? WHERE destination_id = ?', [name, description, image_url, price, req.params.destination_id]);
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

export default destRoute;