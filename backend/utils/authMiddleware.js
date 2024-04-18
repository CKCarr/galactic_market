// utils/authMiddleware.js for the authMiddleware function.
// used in the session.js file to verify the user's session.
// api/v1/session.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config({ path: '../env/.env.app' });
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    req.user = null; // set user to null by default
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            logger.error('Error verifying JWT:', error);
            return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
        }
        req.user = decoded; // add decoded user to request object
        next(); // continue to the next middleware
    });
};

const generateJWTToken = (userId, userName) => {
    const token = jwt.sign({ id: userId, name: userName }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
    return token;
};

export { authMiddleware, generateJWTToken };
