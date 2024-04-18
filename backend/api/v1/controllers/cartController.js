// /api/v1/controllers/cartController.js

import * as cartModel from '../models/cart_model.js';
import logger from '../../../utils/logger.js';

const cartController = {
    getCartItems: async (req, res) => {
        try {
            const cartItems = await cartModel.fetchCartItems(req.user.userId);
            res.status(200).json(cartItems);
            logger.info('Cart items retrieved successfully:', cartItems);
        } catch (error) {
            logger.error('Error fetching cart items:', error);
            res.status(500).json({ message: 'Error fetching cart items', error: error.message });
        }
    },

    addItemToCart: async (req, res) => {
        try {
            const { item_name, item_price } = req.body;
            if (!item_name || item_price === undefined) {
                return res.status(400).json({ message: 'Item name and price are required.' });
            }
            const itemId = await cartModel.addCartItem(req.user.userId, item_name, item_price);
            logger.info('Item added to the cart:', itemId);
            res.status(201).json({ message: 'Item added to the cart', data: itemId });
        } catch (error) {
            logger.error('Error adding item to cart:', error);
            res.status(500).json({ message: 'Error adding item to cart', error: error.message });
        }
    },

    updateCartItem: async (req, res) => {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        try {
            await cartModel.updateCartItemQuantity(cartItemId, quantity);
            res.status(200).json({ message: 'Cart item quantity updated successfully' });
        } catch (error) {
            logger.error('Error updating cart item quantity:', error);
            res.status(500).json({ message: 'Error updating cart item quantity', error: error.message });
        }
    },

    removeItemFromCart: async (req, res) => {
        const { cartItemId } = req.params;
        try {
            await cartModel.removeItemFromCart(cartItemId);
            res.status(200).json({ message: 'Item removed from cart successfully' });
        } catch (error) {
            logger.error('Error removing item from cart:', error);
            res.status(500).json({ message: 'Error removing item from cart', error: error.message });
        }
    },

    calculateTotal: async (req, res) => {
        try {
            const total = await cartModel.calculateCartTotal(req.user.userId);
            res.status(200).json({ total });
        } catch (error) {
            logger.error('Error calculating total for checkout:', error);
            res.status(500).json({ message: 'Error calculating total for checkout', error: error.message });
        }
    },

    clearCart: async (req, res) => {
        try {
            await cartModel.clearCart(req.user.userId);
            res.status(200).json({ message: 'Cart cleared successfully' });
        } catch (error) {
            logger.error('Error clearing cart:', error);
            res.status(500).json({ message: 'Error clearing cart', error: error.message });
        }
    }
};

export default cartController;
