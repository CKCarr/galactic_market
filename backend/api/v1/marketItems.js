import express from 'express';
import { createConnectPool, logger } from '../../src/db.js';

const marketRoute = express.Router();
const mysqlPool = createConnectPool();

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
marketRoute.get('/', async (req, res) => {
    try {
        const [items] = await mysqlPool.query('SELECT * FROM market_items');
        logger.info('Market items retrieved successfully', items);
        res.json(items);
    } catch (err) {
        logger.error('Error fetching market items:', err);
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
marketRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [item] = await mysqlPool.query('SELECT * FROM market_items WHERE market_item_id = ?', [id]);
        if (item.length > 0) {
            logger.info('Market item retrieved successfully', item[0]);
            res.json(item[0]);
        } else {
            logger.error('Market item not found', { id });
            res.status(404).send('Market item not found');
        }
    } catch (err) {
        logger.error('Error fetching market item:', err);
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
marketRoute.post('/', async (req, res) => {
    const { mi_name, mi_description, mi_price } = req.body;
    try {
        const [result] = await mysqlPool.query('INSERT INTO market_items (mi_name, mi_description, mi_price) VALUES (?, ?, ?)', [mi_name, mi_description, mi_price]);
        logger.info('New market item added successfully', { id: result.insertId });
        res.status(201).json({ message: 'Item added successfully', market_item_id: result.insertId });
    } catch (err) {
        logger.error('Error adding market item:', err);
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
marketRoute.put('/:id', async (req, res) => {
    const { mi_name, mi_description, mi_price } = req.body;
    const { id } = req.params;
    try {
        const [result] = await mysqlPool.query('UPDATE market_items SET mi_name = ?, mi_description = ?, mi_price = ? WHERE market_item_id = ?', [mi_name, mi_description, mi_price, id]);
        if (result.affectedRows === 0) {
            logger.error('Market item not found on update', { id });
            res.status(404).send('Market item not found');
        } else {
            logger.info('Market item updated successfully', { id });
            res.status(200).send('Market item updated successfully');
        }
    } catch (err) {
        logger.error('Error updating market item:', err);
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