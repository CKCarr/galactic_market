// /src/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import winston from 'winston';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';

dotenv.config({ path: '../env/.env.mysql' });

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});

// Create a MySQL connection pool options from environment variables
const mysqlOptions = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  debug: false,
};

// Create a MySQL connection pool with options
const createConnectPool = () => mysql.createPool(mysqlOptions);

// Create a MySQL session store
const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000, // Check every 15 minutes
  expiration: 86400000, // Session expires after 24 hours (in milliseconds)
  createDatabaseTable: true,
}, createConnectPool()); // Pass createConnectPool directly here


// Simple queries to test the connection
// Get a connection from the pool and execute a query
const getDestinations = async () => {
  try {
    const pool = createConnectPool();
    const [rows, fields] = await pool.query('SELECT * FROM destinations LIMIT 3');
    console.log('Destinations:');
    logger.info('Destination Query result:', rows);
  } catch (error) {
    logger.error('Error executing query:', error);
  }
};
const getUsers = async () => {
  try {
    const pool = createConnectPool();
    const [rows, fields] = await pool.query('SELECT * FROM users LIMIT 3');
    console.log('Users:');
    logger.info('Users Query result:', rows);
  } catch (error) {
    logger.error('Error executing query:', error);
  }
};
const getMarketItems = async () => {
  try {
    const pool = createConnectPool();
    const [rows, fields] = await pool.query('SELECT * FROM market_items LIMIT 3');
    console.log('Market Items:');
    logger.info('Market Query result:', rows);
  } catch (error) {
    logger.error('Error executing query:', error);
  }
};

const getCart = async () => {
  try {
    const pool = createConnectPool();
    const [rows, fields] = await pool.query('SELECT * FROM cart LIMIT 3');
    console.log('Cart Items:');
    logger.info('Cart Query result:', rows);
  } catch (error) {
    logger.error('Error executing query:', error);
  }
};

// Call the function to get a connection from the pool
getDestinations();
getUsers();
getMarketItems();
getCart();

// Export the connection pool and logger
export { createConnectPool, sessionStore, logger };
