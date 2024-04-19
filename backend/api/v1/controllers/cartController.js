// /api/v1/controllers/cartController.js


import { checkUserCart, createCartIfNotExists, getItemType, getItemPrice, addItemToCart, updateCartItem, getCartItemById, fetchCartItems, updateCartItemQuantity, removeItemFromCart, calculateCartTotal, clearCart } from '../models/cart_model.js';

import logger from '../../../utils/logger.js';

const cartController = {

    getUserCart: async (req, res) => {
        const { userId } = req.user.user_id;  // Assuming the user ID is stored in req.user.user_id
        try {
            const cartId = await checkUserCart(userId);
            logger.info('Cart ID retrieved successfully:', cartId);
            const cartItems = await fetchCartItems(userId);
            logger.info('Cart items retrieved successfully:', cartItems);
            res.status(200).json(cartItems);
        } catch (error) {
            logger.error('Error fetching cart items:', error);
            res.status(500).json({ message: 'Error fetching cart items', error: error.message });
        }
},
    addCartItem: async (req, res) => {
    const { user_id, item_id, item_type, quantity } = req.body;
    try {
        const totalPrice = await addItemToCart(user_id, item_id, item_type, quantity);
        logger.info('Item added to cart successfully:', totalPrice);
        res.status(201).json({ message: 'Item added to cart successfully', total_price: totalPrice });
    } catch (error) {
        logger.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
},

    updateCartItemQuantity: async (req, res) => {
    const { cartItemId } = req.params.cart_id;
    const { quantity } = req.body.quantity;
    try {
        const totalPrice = await updateCartItem(cartItemId, quantity);
        logger.info('Item updated in cart successfully:', totalPrice);
        res.json({ message: 'Item updated in cart successfully', total_price: totalPrice });
    } catch (error) {
        logger.error('Error updating item in cart:', error);
        res.status(500).json({ message: 'Error updating item in cart' });
    }
},
    getCartItemsByUser: async (req, res) => {
    const urlUserId = req.params.user_id;  // User ID from URL
    logger.info('URL User ID:', urlUserId);
    const jwtUserId = req.user.user_id;   // User ID from JWT
    logger.info('JWT User ID:', jwtUserId);

    // Check if the authenticated user is trying to access their own cart
    if (urlUserId !== jwtUserId) {
        return res.status(403).json({ message: "Forbidden: You can only access your own cart." });
    }

    try {
        const cartItems = await fetchCartItems(jwtUserId);
        res.status(200).json(cartItems);
    } catch (error) {
        logger.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
},

    updateCartItem: async (req, res) => {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        try {
            await updateCartItemQuantity(cartItemId, quantity);
            logger.info('Cart item quantity updated successfully');
            res.status(200).json({ message: 'Cart item quantity updated successfully' });
        } catch (error) {
            logger.error('Error updating cart item quantity:', error);
            res.status(500).json({ message: 'Error updating cart item quantity', error: error.message });
        }
    },

    removeItemFromCart: async (req, res) => {
        const { cartItemId }  = req.params;
        try {
            await removeItemFromCart(cartItemId);
            logger.info('Item removed from cart successfully');
            res.status(200).json({ message: 'Item removed from cart successfully' });
        } catch (error) {
            logger.error('Error removing item from cart:', error);
            res.status(500).json({ message: 'Error removing item from cart', error: error.message });
        }
    },

    calculateTotal: async (req, res) => {
        try {
            const total = await calculateCartTotal(req.user.user_id);
            logger.info('Total price for checkout:', total);
            res.status(200).json({ total });
        } catch (error) {
            logger.error('Error calculating total for checkout:', error);
            res.status(500).json({ message: 'Error calculating total for checkout', error: error.message });
        }
    },

    clearCart: async (req, res) => {
        try {
            await clearCart(req.user.user_id);
            logger.info('Cart cleared successfully');
            res.status(200).json({ message: 'Cart cleared successfully' });
        } catch (error) {
            logger.error('Error clearing cart:', error);
            res.status(500).json({ message: 'Error clearing cart', error: error.message });
        }
    }
};

export default cartController;
