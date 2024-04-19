// api/v1/models/cart_model.js

import { createConnectPool, logger } from '../../../src/db.js';
// import logger from '../../../utils/logger.js';

const mysqlPool = createConnectPool();

// Function to check if the user has a cart
export const checkUserCart = async (userId) => {
    const [existingCart] = await mysqlPool.query('SELECT cart_id FROM cart WHERE user_id = ?', [userId]);
    return existingCart.length > 0 ? existingCart[0].cart_id : null;
};

// Function to create a cart for the user if it doesn't exist
export const createCartIfNotExists = async (userId) => {
    const existingCart = await checkUserCart(userId);
    if (!existingCart) {
        await mysqlPool.query('INSERT INTO cart (user_id) VALUES (?)', [userId]);
    }
};

// get item type function to check if the item is a destination or market item
export const getItemType = async (itemId) => {
    const [destDetails] = await mysqlPool.query('SELECT * FROM destinations WHERE dest_id = ?', [itemId]);
    if (destDetails.length > 0) {
        return 'destinations';
    }

    const [marketItemDetails] = await mysqlPool.query('SELECT * FROM market_items WHERE mi_id = ?', [itemId]);
    if (marketItemDetails.length > 0) {
        return 'market_items';
    }

    throw new Error('Item not found');
};


// Function to get the price of an item based on its type and ID
export const getItemPrice = async (itemId, itemType) => {

    let itemPrice;
    if (itemType === 'destinations') {
        const [destDetails] = await mysqlPool.query('SELECT dest_price FROM destinations WHERE dest_id = ?', [itemId]);
        if (!destDetails || destDetails.length === 0) throw new Error('Destination not found');
        itemPrice = destDetails[0].dest_price;
    } else if (itemType === 'market_items') {
        const [marketItemDetails] = await mysqlPool.query('SELECT mi_price FROM market_items WHERE mi_id = ?', [itemId]);
        if (!marketItemDetails || marketItemDetails.length === 0) throw new Error('Market item not found');
        itemPrice = marketItemDetails[0].mi_price;
    } else {
        throw new Error('Invalid item type');
    }
    return itemPrice;
};

// Function to add an item to the cart
export const addItemToCart = async (user_id, item_id, item_type, quantity) => {
    // Determine the correct column name based on the item type
    let column_name;
    if (item_type === 'destinations') {
        column_name = 'destination_id';
    } else if (item_type === 'market_items') {
        column_name = 'market_item_id';
    } else {
        logger.error('Invalid item type:', item_type);
        throw new Error('Invalid item type');
    }

    // Get the price of the item
    const item_price = await getItemPrice(item_id, item_type);

    // Construct the SQL query string using the correct column name
    const sql = `INSERT INTO cart (user_id, ${column_name}, item_type, quantity, item_price) VALUES (?, ?, ?, ?, ?)`;

    // Insert item into the cart with item's price
    logger.info('Adding item to cart:', user_id, item_id, item_type, quantity, item_price);
    await mysqlPool.query(sql, [user_id, item_id, item_type, quantity, item_price]);

    logger.info('Item added to cart:', item_price);
    return item_price; // Return the item's price instead of the total price
}

// Function to update cart item in the database
export const updateCartItem = async (cartItemId, quantity) => {
    await mysqlPool.query('UPDATE cart SET quantity = ?, total_price = (quantity * unit_price) WHERE cart_id = ?', [quantity, cartItemId]);
    // Fetch updated total price after the update
    const [updatedItem] = await mysqlPool.query('SELECT total_price FROM cart WHERE cart_id = ?', [cartItemId]);
    return updatedItem[0].total_price;
};

// Function to get cart item by ID from the database
export const getCartItemById = async (cartItemId) => {
    const [cartItem] = await mysqlPool.query('SELECT * FROM cart WHERE cart_id = ?', [cartItemId]);
    return cartItem[0];
};

// Function to fetch cart items from the database
export async function fetchCartItems(userId) {
    console.log('Fetching cart items for user ID:', userId);
    try {
        logger.info('Fetching cart items for user ID:', userId);
        const [cartItems] = await mysqlPool.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
        console.log('Cart items:', cartItems);
        logger.info('Cart items retrieved successfully:', cartItems);
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
        logger.info(`Item removed from cart:, ${cartItemId}`);
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
