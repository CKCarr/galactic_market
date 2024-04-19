// /api/v1/cart
//  Cart Management API
// get list of Items in the Cart, Add items to the cart, remove items from the cart, get the total price of items in the cart, and clear all items in the cart.

import express from 'express';
import cartController from '../controllers/cartController.js';
import { authMiddleware }  from '../../../utils/authMiddleware.js';
import { body, validationResult } from 'express-validator';

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
 * /cart/{userId}:
 *   get:
 *     summary: Retrieve a list of items in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           description: User ID of the cart to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of items in the cart based on the authenticated user
 *       401:
 *         description: Unauthorized if the user is not logged in
 *       403:
 *         description: Forbidden if trying to access someone else's cart
 *       500:
 *         description: Database error
 */

cartRoutes.get('/cart/:userId', authMiddleware, cartController.getCartItemsByUser);

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
 *               user_id:
 *                 type: integer
 *               item_id:
 *                 type: integer
 *               item_type:
 *                type: string
 *               quantity:
 *                type: integer
 *     responses:
 *       201:
 *         description: Item added to the cart
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Database error
 */
cartRoutes.post('/add', [
    body('user_id').isInt(),
    body('item_id').isInt(),
    body('item_type').isIn(['destinations', 'market_items']),
    body('quantity').isInt({ min: 1 })
], cartController.addCartItem);

/**
 * @swagger
 * /update/{cartItemId}:
 *   put:
 *     summary: Update an item in the cart
 *     tags: [Cart]
 *     description: Update an item in the cart
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: ID of the cart item to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Database error
 */
cartRoutes.put('/update/:cartItemId', cartController.updateCartItem);

/**
 * @swagger
 * /cart/remove/{cart_Id}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     description: Remove an item from the cart by its ID.
 *     parameters:
 *       - in: path
 *         name: cart_Id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the cart item to remove.
 *     responses:
 *       200:
 *         description: Item removed from the cart
 *       400:
 *         description: Invalid request or cart item not found
 *       500:
 *         description: Database error
 */
cartRoutes.delete('/cart/remove/:cart_Id', cartController.removeItemFromCart);


/**
 * @swagger
 * /checkout:
 *   get:
 *     summary: Calculate total price for checkout
 *     tags: [Cart]
 *     description: Authenticate and calculate the total price of items in the cart for checkout.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total price for checkout
 *       401:
 *         description: Unauthorized if the user is not logged in
 *       500:
 *         description: Database error
 */
cartRoutes.get('/checkout', authMiddleware, cartController.calculateTotal);

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
