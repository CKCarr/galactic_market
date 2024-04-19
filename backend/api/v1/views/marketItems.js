import express from 'express';
import marketItemController from '../controllers/marketItemController.js';

const marketRoute = express.Router();

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
marketRoute.get('/market-items', marketItemController.getAll);

// GET a single market item by ID
/**
 * @swagger
 * /market-items/{mi_id}:
 *   get:
 *     summary: Retrieve a specific market item by ID
 *     tags: [Market Items]
 *     parameters:
 *       - in: path
 *         name: mi_id
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
marketRoute.get('/market-items/:mi_id', marketItemController.getById);

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
marketRoute.post('/market-items', marketItemController.add);

// PUT to update a market item
/**
 * @swagger
 * /market-items/{id}:
 *   put:
 *     summary: Update a market item
 *     tags: [Market Items]
 *     parameters:
 *       - in: path
 *         name: mi_id
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
marketRoute.put('/market-items/:id', marketItemController.update);

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
