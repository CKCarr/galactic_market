import { createConnectPool } from '../../../src/db.js';
import logger from '../../../utils/logger.js';

const mysqlPool = createConnectPool();

export async function getAllDestinations() {
    try {
        const [destinations] = await mysqlPool.query('SELECT * FROM destinations');
        return destinations;
    } catch (err) {
        logger.error('Error fetching destinations from database:', err);
        throw err;
    }
}

export async function getDestinationById(destId) {
    try {
        const [destinations] = await mysqlPool.query('SELECT dest_name, dest_description, dest_price, dest_image_url FROM destinations WHERE dest_id = ?', [destId]);
        return destinations[0] || null;
    } catch (err) {
        logger.error('Error fetching destination by ID:', err);
        throw err;
    }
}

export async function updateDestination(destId, destData) {
    const { dest_name, dest_description, dest_price, dest_image_url } = destData;
    try {
        const [result] = await mysqlPool.query('UPDATE destinations SET dest_name = ?, dest_description = ?, dest_price = ?, dest_image_url = ? WHERE dest_id = ?', [dest_name, dest_description, dest_price, dest_image_url, destId]);
        return result.affectedRows > 0;
    } catch (err) {
        logger.error('Error updating destination:', err);
        throw err;
    }
}
