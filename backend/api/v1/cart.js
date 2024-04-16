// /api/v1/cart
//  Cart MAnagemanet API
// get list of Items in the Cart, Add items to the cart, remove items from the cart, get the total price of items in the cart, and clear all items in the cart.

import express from 'express';
import { mysqlPool } from '../../src/db.js';
import logger from '../../utils/logger.js';

const cartRoutes = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Retrieve a list of items in the cart
 *     description: List all items in the cart
 *     responses:
 *       200:
 *         description: A list of items in the cart
 *       500:
 *         description: Database error
 */
cartRoutes.get('/', async (req, res) => {
    try {
        const [cart] = await mysqlPool.query('SELECT * FROM Cart ORDER BY item_name');
        logger.info('Cart items retrieved Successfully:', cart);
        return res.json(cart);
    }
    catch (error) {
        console.error('Database Error:', error);
        logger.error('Database Error:', { message: 'Database error', error: error.message });
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});


/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     description: Add an item to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_name:
 *                 type: string
 *               item_price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to the cart
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Database error
 */
cartRoutes.post('/add', async (req, res) => {
    try {
        const { item_name, item_price } = req.body;
        if (!item_name || item_price === undefined) {
            return res.status(400).json({ message: 'item_name and item_price are required.' });
        }
        const [result] = await mysqlPool.query('INSERT INTO Cart (item_name, item_price) VALUES (?, ?)', [item_name, item_price]);
        logger.info('Item added to the cart:', result);
        res.status(201).json({ message: 'Item added to the cart', data: result });
    } catch (error) {
        console.error('Database Error:', error);
        logger.error('Database Error:', { message: 'Database error', error: error.message });
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});


/**
 * @swagger
 * /remove:
 *   delete:
 *     summary: Remove an item from the cart
 *     description: Remove an item from the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item_name
 *             properties:
 *               item_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item removed from the cart
 *       500:
 *         description: Database error
 */

cartRoutes.delete('/remove', async (req, res) => {
    try {
        const { item_name } = req.body;
        if (!item_name) {
            logger.error('Item_name is required:', { message: 'item_name is required.' });
            return res.status(400).json({ message: 'item_name is required.' });
        }
        const [result] = await mysqlPool.query('DELETE FROM Cart WHERE item_name = ?', [item_name]);
        logger.info('Item removed from the cart:', result);
        if (result.affectedRows === 0) {
            logger.error('Item not found:', { message: 'Item not found.' });
            return res.status(404).json({ message: 'Item not found.' });
        }
        logger.info('Item removed from the cart:', result);
        res.status(204).json();  // No content to send back
    } catch (error) {
        console.error('Database Error:', error);
        logger.error('Database Error:', { message: 'Database error', error: error.message });
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});

/**
 * @swagger
 * /total:
 *   get:
 *     summary: Get the total price of items in the cart
 *     description: Get the total price of items in the cart
 *     responses:
 *       200:
 *         description: Total price of items in the cart
 *       500:
 *         description: Database error
 */

cartRoutes.get('/total', async (req, res) => {
    try {
        const [results] = await mysqlPool.query('SELECT SUM(item_price) AS total FROM Cart');
        if (results.length === 0) {
            logger.error('Cart is empty:', { message: 'Cart is empty.' });
            return res.status(404).json({ message: 'Cart is empty.' });
        }
        const total = results[0].total || 0; // Handle case where SUM might return null
        logger.info('Total price of items in the cart:', total);
        res.json({ total: total });
    } catch (error) {
        console.error('Database Error:', error);
        logger.error('Database Error:', { message: 'Database error', error: error.message });
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});

/**
 * @swagger
 * /clear:
 *   delete:
 *     summary: Clear all items in the cart
 *     description: Clear all items in the cart
 *     responses:
 *       200:
 *         description: Cart cleared
 *       500:
 *         description: Database error
 */

cartRoutes.delete('/clear', async (req, res) => {
    try {
        const [cart] = await mysqlPool.query('DELETE * FROM Cart');
        return res.json(cart);
    }
    catch (error) {
        console.error('Database Error:', error);
    }
});

export default cartRoutes;
