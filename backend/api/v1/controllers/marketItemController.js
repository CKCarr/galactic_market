// api/v1/controllers/marketItemController.js
import { getAllMarketItems, getMarketItemById, addMarketItem, updateMarketItem } from '../models/marketItemsModel.js';
import logger from '../../../utils/logger.js';

const marketItemController = {
    getAll: async (req, res) => {
        try {
            const items = await getAllMarketItems();
            res.json(items);
        } catch (err) {
            logger.error('Error getting market items:', err);
            res.status(500).send('Error fetching market items');
        }
    },

    getById: async (req, res) => {
        const mi_id = req.params.mi_id;
        try {
            const market_items = await getMarketItemById(mi_id);
            if (market_items) {
                res.json(market_items);
            } else {
                res.status(404).json({ message: 'Market item not found' });
            }
        } catch (err) {
            logger.error('Error getting market item by ID:', err);
            res.status(500).send('Error fetching market item');
        }
    },

    add: async (req, res) => {
        const itemData = req.body;
        try {
            const itemId = await addMarketItem(itemData);
            res.status(201).json({ message: 'Item added successfully', market_item_id: itemId });
        } catch (err) {
            logger.error('Error adding market item:', err);
            res.status(500).send('Error adding market item');
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const itemData = req.body;
        try {
            const updated = await updateMarketItem(id, itemData);
            if (updated) {
                res.status(200).send('Market item updated successfully');
            } else {
                res.status(404).send('Market item not found');
            }
        } catch (err) {
            logger.error('Error updating market item:', err);
            res.status(500).send('Error updating market item');
        }
    }
};

export default marketItemController;
