const express = require('express');
const router = express.Router();
import readCSV from '../../utils/readCSV.js';
let users = [];

readCSV( '../../datasets/users.csv')
    .then(data => {
        users = data;
        console.log('Users loaded successfully');
    })
    .catch(err => {
        console.error('Failed to load users from CSV:', err);
    });

// GET /users - Retrieve a list of all users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', (req, res) => {
    res.json(users);
});

// POST /users - Create a new user
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The encrypted password of the user
 *       example:
 *         user_id: 1
 *         first_name: John
 *         last_name: Doe
 *         username: johndoe
 *         email: johndoe@example.com
 *         password: hashed_password
 */
router.post('/', (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    const newUser = {
        user_id: users.length + 1,
        first_name,
        last_name,
        username,
        email,
        password
    };
    users.push(newUser);
    res.status(201).send(newUser);
});

// GET /users/{user_id} - Retrieve details about a specific user
/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Retrieve details about a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the user to retrieve
 *     responses:
 *       200:
 *         description: Detailed information about a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/:user_id', (req, res) => {
    const user = users.find(u => u.user_id === parseInt(req.params.user_id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// PUT /users/{user_id} - Update details of a specific user
/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     summary: Update details of a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put('/:user_id', (req, res) => {
    let user = users.find(u => u.user_id === parseInt(req.params.user_id));
    if (user) {
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        res.send(user);
    } else {
        res.status(404).send('User not found');
    }
});

// DELETE /users/{user_id} - Delete a specific user
/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     summary: Delete a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:user_id', (req, res) => {
    const index = users.findIndex(u => u.user_id === parseInt(req.params.user_id));
    if (index >= 0) {
        users.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;
