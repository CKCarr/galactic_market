// src/db.js
// Create a connection to the MySQL database
import mysql from 'mysql2';
import dotenv from 'dotenv';

// import .env variables
dotenv.config({ path: '../env/.env.mysql' });

// Create a connection to the database

const mysql_db = mysql.connect({
  // Use the MYSQL_HOST env variable
  host: process.env.MYSQL_HOST || '127.0.0.1',
  // Use the MYSQL_USER env variable
  user: process.env.MYSQL_USER,
  // Use the MYSQL_PASSWORD env variable
  password: process.env.MYSQL_PASSWORD,
  // Use the MYSQL_DATABASE env variable
  database: process.env.MYSQL_DATABASE,
  debug: true,
});

// Check if the connection to the database is successful
mysql_db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }

  console.log('Connected to the database!');
});

// Handle MySQL connection errors
connection.on('error', (err) => {
  console.error('MySQL connection error:', err);
});

export default mysql_db;
