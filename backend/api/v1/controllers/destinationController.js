import { getAllDestinations, getDestinationById, updateDestination } from '../models/destination_model.js';
import logger from '../../../utils/logger.js';

const destinationController = {
    getAll: async (req, res) => {
        try {
            const destinations = await getAllDestinations();
            res.json(destinations);
        } catch (err) {
            logger.error('Error getting destinations:', err);
            res.status(500).send('Error fetching destinations');
        }
    },

    getById: async (req, res) => {
        const dest_id = req.params.dest_id;
        try {
            const destination = await getDestinationById(dest_id);
            if (destination) {
                res.json(destination);
            } else {
                res.status(404).json({ message: 'Destination not found' });
            }
        } catch (err) {
            logger.error('Error getting destination by ID:', err);
            res.status(500).send('Error fetching destination');
        }
    },

    update: async (req, res) => {
        const { dest_id } = req.params;
        const destData = req.body;
        try {
            const updated = await updateDestination(dest_id, destData);
            if (updated) {
                res.status(200).send('Destination updated successfully');
            } else {
                res.status(404).send('Destination not found');
            }
        } catch (err) {
            logger.error('Error updating destination:', err);
            res.status(500).send('Error updating destination');
        }
    }
};

export default destinationController;
