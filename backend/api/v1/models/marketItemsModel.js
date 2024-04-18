// api/v1/models/marketItemsModel.js
import { createConnectPool } from '../../../src/db.js';
import logger from '../../../utils/logger.js';

const mysqlPool = createConnectPool();

export async function getAllMarketItems() {
    try {
        const [items] = await mysqlPool.query('SELECT * FROM market_items');
        return items;
    } catch (err) {
        logger.error('Error fetching market items:', err);
        throw err;
    }
}

export async function getMarketItemById(itemId) {
    try {
        const [item] = await mysqlPool.query('SELECT * FROM market_items WHERE market_item_id = ?', [itemId]);
        return item[0] || null;
    } catch (err) {
        logger.error('Error fetching market item by ID:', err);
        throw err;
    }
}

export async function addMarketItem(itemData) {
    const { mi_name, mi_description, mi_price } = itemData;
    try {
        const [result] = await mysqlPool.query('INSERT INTO market_items (mi_name, mi_description, mi_price) VALUES (?, ?, ?)', [mi_name, mi_description, mi_price]);
        return result.insertId;
    } catch (err) {
        logger.error('Error adding market item:', err);
        throw err;
    }
}

export async function updateMarketItem(itemId, itemData) {
    const { mi_name, mi_description, mi_price } = itemData;
    try {
        const [result] = await mysqlPool.query('UPDATE market_items SET mi_name = ?, mi_description = ?, mi_price = ? WHERE market_item_id = ?', [mi_name, mi_description, mi_price, itemId]);
        return result.affectedRows > 0;
    } catch (err) {
        logger.error('Error updating market item:', err);
        throw err;
    }
}
