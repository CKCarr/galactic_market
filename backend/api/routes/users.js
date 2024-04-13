// backend/api/routes/travelers.js
const express = require('express');
const router = express.Router();

// Mock data for demonstration
let travelers = [
    { traveler_id: 1, first_name: 'John', last_name: 'Doe', username: 'johndoe', email: 'john@example.com', password: 'hashed_password' },
    { traveler_id: 2, first_name: 'Jane', last_name: 'Doe', username: 'janedoe', email: 'jane@example.com', password: 'hashed_password' }
];

// GET /travelers - Retrieve a list of all travelers
/**
 * @swagger
 * /travelers:
 *   get:
 *     summary: Retrieve a list of all travelers
 *     tags: [Travelers]
 *     responses:
 *       200:
 *         description: A list of travelers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Traveler'
 */
router.get('/', (req, res) => {
    res.json(travelers);
});

// POST /travelers - Create a new traveler
/**
 * @swagger
 * components:
 *   schemas:
 *     Traveler:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         traveler_id:
 *           type: integer
 *           description: The auto-generated id of the traveler
 *         first_name:
 *           type: string
 *           description: The first name of the traveler
 *         last_name:
 *           type: string
 *           description: The last name of the traveler
 *         username:
 *           type: string
 *           description: The username of the traveler
 *         email:
 *           type: string
 *           description: The email of the traveler
 *         password:
 *           type: string
 *           description: The encrypted password of the traveler
 *       example:
 *         traveler_id: 1
 *         first_name: John
 *         last_name: Doe
 *         username: johndoe
 *         email: johndoe@example.com
 *         password: hashed_password
 */
router.post('/', (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    const newTraveler = {
        traveler_id: travelers.length + 1, // simplistic approach for id
        first_name,
        last_name,
        username,
        email,
        password // in production, ensure the password is hashed before storing
    };
    travelers.push(newTraveler);
    res.status(201).send(newTraveler);
});

// GET /travelers/{traveler_id} - Retrieve details about a specific traveler
/**
 * @swagger
 * /travelers/{traveler_id}:
 *   get:
 *     summary: Retrieve details about a specific traveler
 *     tags: [Travelers]
 *     parameters:
 *       - in: path
 *         name: traveler_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the traveler to retrieve
 *     responses:
 *       200:
 *         description: Detailed information about a traveler
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Traveler'
 *       404:
 *         description: Traveler not found
 */
router.get('/:traveler_id', (req, res) => {
    const traveler = travelers.find(t => t.traveler_id === parseInt(req.params.traveler_id));
    if (traveler) {
        res.json(traveler);
    } else {
        res.status(404).send('Traveler not found');
    }
});

// PUT /travelers/{traveler_id} - Update details of a specific traveler
/**
 * @swagger
 * /travelers/{traveler_id}:
 *   put:
 *     summary: Update details of a specific traveler
 *     tags: [Travelers]
 *     parameters:
 *       - in: path
 *         name: traveler_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the traveler to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Traveler'
 *     responses:
 *       200:
 *         description: Traveler updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Traveler'
 *       404:
 *         description: Traveler not found
 */
router.put('/:traveler_id', (req, res) => {
    let traveler = travelers.find(t => t.traveler_id === parseInt(req.params.traveler_id));
    if (traveler) {
        traveler.first_name = req.body.first_name || traveler.first_name;
        traveler.last_name = req.body.last_name || traveler.last_name;
        traveler.username = req.body.username || traveler.username;
        traveler.email = req.body.email || traveler.email;
        traveler.password = req.body.password || traveler.password; // remember to hash new passwords
        res.send(traveler);
    } else {
        res.status(404).send('Traveler not found');
    }
});

// DELETE /travelers/{traveler_id} - Delete a specific traveler
/**
 * @swagger
 * /travelers/{traveler_id}:
 *   delete:
 *     summary: Delete a specific traveler
 *     tags: [Travelers]
 *     parameters:
 *       - in: path
 *         name: traveler_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the traveler to delete
 *     responses:
 *       204:
 *         description: Traveler deleted successfully
 *       404:
 *         description: Traveler not found
 */

router.delete('/:traveler_id', (req, res) => {
    const index = travelers.findIndex(t => t.traveler_id === parseInt(req.params.traveler_id));
    if (index >= 0) {
        travelers.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Traveler not found');
    }
});

module.exports = router;
