// src/db.js
// Create a connection to the MySQL database
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// import .env variables
dotenv.config({ path: '../env/.env.mysql' });

// Create a connection to the database

const mysql_connection = await mysql.createConnection({
  // Use the MYSQL_HOST env variable
  host: process.env.MYSQL_HOST,
  // Use the MYSQL_USER env variable
  user: process.env.MYSQL_USER,
  // Use the MYSQL_PASSWORD env variable
  password: process.env.MYSQL_PASSWORD,
  // Use the MYSQL_DATABASE env variable
  database: process.env.MYSQL_DATABASE,
});

mysql_connection.connect(function (err) {
  if (err) {
    throw new Error('Error connecting to MySQL: ', err.message);
  }
  console.log('Connected to MySQL as ID:', mysql_connection.threadId);
});

export default mysql_connection;
