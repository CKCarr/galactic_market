const express = require('express');
const marketRoute= express.Router();

// GET all market items
/**
 * @swagger
 * /market-items:
 *   get:
 *     summary: Retrieve a list of all market items
 *     tags: [Market Items]
 *     responses:
 *       200:
 *         description: A list of market items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MarketItem'
 */
marketRoute.get('/market_items', async (req, res) => {
    try {
        const [items] = await mysql_db.query('SELECT * FROM Market_Items');
        res.json(items);
    } catch (err) {
        console.error('Error fetching market items:', err);
        res.status(500).send('Error fetching market items');
    }
});

// GET a single market item by ID
/**
 * @swagger
 * /market-items/{id}:
 *   get:
 *     summary: Retrieve a specific market item by ID
 *     tags: [Market Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the market item to retrieve
 *     responses:
 *       200:
 *         description: Detailed information about a market item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MarketItem'
 *       404:
 *         description: Market item not found
 */
marketRoute.get('/market-items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [item] = await mysql_db.query('SELECT * FROM Market_Items WHERE market_item_id = ?', [id]);
        if (item.length > 0) {
            res.json(item[0]);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (err) {
        console.error('Error fetching market item:', err);
        res.status(500).send('Error fetching market item');
    }
});


// POST a new market item
/**
 * @swagger
 * /market-items:
 *   post:
 *     summary: Add a new market item
 *     tags: [Market Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarketItem'
 *     responses:
 *       201:
 *         description: Market item added successfully
 */
marketRoute.post('/market-items', async (req, res) => {
    const { item_name, item_description, price } = req.body;
    try {
        const result = await mysql_db.query('INSERT INTO Market_Items (item_name, item_description, price) VALUES (?, ?, ?)', [item_name, item_description, price]);
        res.status(201).json({ message: 'Item added successfully', market_item_id: result.insertId });
    } catch (err) {
        console.error('Error adding market item:', err);
        res.status(500).send('Error adding market item');
    }
});

// PUT to update a market item
/**
 * @swagger
 * /market-items/{id}:
 *   put:
 *     summary: Update a market item
 *     tags: [Market Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the market item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarketItem'
 *     responses:
 *       200:
 *         description: Market item updated successfully
 *       404:
 *         description: Market item not found
 */
marketRoute.put('/market-items/:id', async (req, res) => {
    const { item_name, item_description, price } = req.body;
    const { id } = req.params;
    try {
        const result = await mysql_db.query('UPDATE Market_Items SET item_name = ?, item_description = ?, price = ? WHERE market_item_id = ?', [item_name, item_description, price, id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Market item not found');
        } else {
            res.status(200).send('Market item updated successfully');
        }
    } catch (err) {
        console.error('Error updating market item:', err);
        res.status(500).send('Error updating market item');
    }
});


//schema for market items
/**
 * @swagger
 * components:
 *   schemas:
 *     MarketItem:
 *       type: object
 *       required:
 *         - item_name
 *         - item_description
 *         - price
 *       properties:
 *         market_item_id:
 *           type: integer
 *           description: The auto-generated ID of the market item.
 *         item_name:
 *           type: string
 *           description: The name of the market item.
 *         item_description:
 *           type: string
 *           description: The detailed description of the market item.
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the market item.
 *       example:
 *         market_item_id: 1
 *         item_name: "Photo Bundle"
 *         item_description: "A collection of stunning space photographs."
 *         price: 50.00
 */

export default marketRoute;