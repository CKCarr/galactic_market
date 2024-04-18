// /api/v1/cart
//  Cart Management API
// get list of Items in the Cart, Add items to the cart, remove items from the cart, get the total price of items in the cart, and clear all items in the cart.

import express from 'express';
import cartController from '../controllers/cartController.js';
import { authMiddleware }  from '../../../utils/authMiddleware.js';

const cartRoutes = express.Router();

// Middleware to verify user authentication
// cartRoutes.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Retrieve a list of items in the cart
 *     tags: [Cart]
 *     description: List all items in the cart
 *     responses:
 *       200:
 *         description: A list of items in the cart
 *       500:
 *         description: Database error
 */
cartRoutes.get('/cart', cartController.getCartItems);
/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
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
cartRoutes.post('/add', cartController.addItemToCart);

/**
 * @swagger
 * /update/:cartItemId:
 *   put:
 *     summary: Add an item to the cart
 *     tags: [Cart]
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
cartRoutes.put('/update/:cartItemId', cartController.updateCartItem);

/**
 * @swagger
 * /cart/remove/:cartItemId:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
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
cartRoutes.delete('cart/remove/:cartItemId', cartController.removeItemFromCart);

/**
 * @swagger
 * /checkout:
 *   get:
 *     summary: Calculate total price for checkout
 *     tags: [Cart]
 *     description: Calculate the total price of items in the cart for checkout
 *     responses:
 *       200:
 *         description: Total price for checkout
 *       500:
 *         description: Database error
 */
cartRoutes.get('/checkout', cartController.calculateTotal);

/**
 * @swagger
 * /clear:
 *   delete:
 *     summary: Clear all items in the cart
 *     tags: [Cart]
 *     description: Clear all items in the cart
 *     responses:
 *       200:
 *         description: Cart cleared
 *       500:
 *         description: Database error
 */
cartRoutes.delete('/clear', cartController.clearCart);


/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         cartItemId:
 *           type: string
 *           description: The ID of the cart item
 *         itemName:
 *           type: string
 *           description: The name of the item in the cart
 *         itemPrice:
 *           type: number
 *           description: The price of the item in the cart
 */
export default cartRoutes;
