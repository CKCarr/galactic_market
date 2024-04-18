// api/v1/models/cart_model.js

import { createConnectPool, logger } from '../../../src/db.js';
// import logger from '../../../utils/logger.js';

const mysqlPool = createConnectPool();

// Function to fetch cart items from the database
export async function fetchCartItems(userId) {
    try {
        const [cartItems] = await mysqlPool.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
        return cartItems;
    } catch (error) {
        logger.error('Error fetching cart items:', error);
        throw error;
    }
};

// Function to update cart item quantity in the database
export async function updateCartItemQuantity(cartItemId, quantity) {
    try {
        await mysqlPool.query('UPDATE cart SET quantity = ? WHERE cart_id = ?', [quantity, cartItemId]);
    } catch (error) {
        logger.error('Error updating cart item quantity:', error);
        throw error;
    }
};

// Function to remove item from cart in the database
export async function removeItemFromCart(cartItemId) {
    try {
        await mysqlPool.query('DELETE FROM cart WHERE cart_id = ?', [cartItemId]);
    } catch (error) {
        logger.error('Error removing item from cart:', error);
        throw error;
    }
};

// Function to calculate total price of items in the cart
export async function calculateCartTotal(userId) {
    try {
        const [result] = await mysqlPool.query(
            'SELECT SUM(item_price * quantity) AS total FROM cart WHERE user_id = ?',
            [userId]
        );
        const total = result[0].total || 0;
        logger.info('Total price for checkout:', total);
        return total;
    } catch (error) {
        logger.error('Error calculating total for checkout:', error);
        throw error;
    }
};

// Function to clear cart for a user in the database
export async function clearCart(userId) {
    try {
        await mysqlPool.query('DELETE FROM cart WHERE user_id = ?', [userId]);
    } catch (error) {
        logger.error('Error clearing cart:', error);
        throw error;
    }
};
