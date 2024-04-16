// /src/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';
import winston from 'winston';

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

// Create a MySQL connection pool
const createConnectPool = () => {
  try {
    const mysqlPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
    });
    return mysqlPool.promise(); // Use the promise-based API
  }
  catch (err) {
    logger.error('Error creating MySQL pool:', err);
    throw err; // Throw the error to handle it outside
  }
};

// Get a connection from the pool and execute a query
const getDestinations = async () => {
  try {
    const pool = createConnectPool();
    const [rows, fields] = await pool.query('SELECT * FROM Destinations LIMIT 3');
    console.log('Destinations:');
    logger.info('Query result:', rows);
  } catch (error) {
    logger.error('Error executing query:', error);
  }
};
const getUsers = async () => {
  try {
    const pool = createConnectPool();
    const [rows, fields] = await pool.query('SELECT * FROM users LIMIT 3');
    console.log('Users:');
    logger.info('Query result:', rows);
  } catch (error) {
    logger.error('Error executing query:', error);
  }
};
const getMarketItems = async () => {
  try {
    const pool = createConnectPool();
    const [rows, fields] = await pool.query('SELECT * FROM Market_Items LIMIT 3');
    console.log('Market Items:');
    logger.info('Query result:', rows);
  } catch (error) {
    logger.error('Error executing query:', error);
  }
};

const getCart = async () => {
  try {
    const pool = createConnectPool();
    const [rows, fields] = await pool.query('SELECT * FROM Cart LIMIT 3');
    console.log('Cart Items:');
    logger.info('Query result:', rows);
  } catch (error) {
    logger.error('Error executing query:', error);
  }
};

// Call the function to get a connection from the pool
getDestinations();
getUsers();
getMarketItems();
getCart();

export { createConnectPool, logger};
