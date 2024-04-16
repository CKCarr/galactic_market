// /backend/utils/logger.js
import winston from 'winston';

const logger = winston.createLogger({
    // logs folder is created in the root directory of the project
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' })
    ]
});

export default logger;
