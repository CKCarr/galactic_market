// userController.js

// Import the logger module
import logger from '../../../utils/logger.js';
// Import the user model
import { authMiddleware } from '../../../utils/authMiddleware.js';
import { findUserByUsername, createUser, loginUser } from '../models/user_model.js';

const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Username, email, and password are required.' });
            }
            const userExists = await findUserByUsername(username);
            if (userExists) {
                return res.status(400).json({ message: 'Username already exists.' });
            }
            const userId = await createUser(username, email, password);
            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            logger.error('Error registering user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const token = await loginUser(username, password);
            if (!token) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            res.status(200).json({ token });
        } catch (error) {
            logger.error('Error logging in user:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

// Apply authMiddleware to protected routes
userController.protectedRoute = [
    authMiddleware,
    (req, res) => {
        // Your protected route logic here
        res.status(200).json({ message: 'Authorized access' });
    }
];

export default userController;
