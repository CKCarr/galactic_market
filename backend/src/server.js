// Description: This file is the entry point for the application. It creates an Express application and listens on a port for incoming requests. It also sets up the MySQL session store and applies middleware to parse incoming requests.
// src/server.js

// Import the express module
import express from 'express';
// Import the mysql module
import mysql from 'mysql2';
// import cors for cross-origin resource sharing
import cors from 'cors';
// Import the myConnection middleware
import myConnection from 'express-myconnection';
// Import express-session and MySQLStore
import session from 'express-session';
// import cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';
// Import the saveSession function from utils to save the session
import { saveSession, sessionMiddleware } from '../utils/session_config.js';
// Import the MySQL connection pool and winston logger
import { createConnectPool, logger } from './db.js';
// import swagger for API documentation
import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from '../config/swagger/swaggerConfig.js';
// import dotenv for environment variables
import dotenv from 'dotenv';
dotenv.config({ path: './env/.env.app' });
dotenv.config({ path: './env/.env.mysql' });
// import path
import path from 'path';
// Set the port and host
const PORT = process.env.PORT;
const HOST = process.env.HOST;
// import middleware from utils
import { authMiddleware }  from '../utils/authMiddleware.js';
// import application endpoints/controllers from api/v1/views
import cartRoutes from '../api/v1/views/cart.js';
import destRoute from '../api/v1/views/destinations.js';
import healthRoute from '../api/v1/views/health.js';
import marketRoute from '../api/v1/views/marketItems.js';
import router from '../api/v1/views/route.js';
import sessionRoute from '../api/v1/views/session.js';
import userRoutes from '../api/v1/views/users.js';


// Create an Express application
const app = express();
// Apply middleware to parse incoming requests globally
// app.use(authMiddleware);

// Enable CORS
app.use(cors());

// Set the view engine and views directory
app.set('view engine', 'ejs' );
app.set('views', path.join(path.resolve(), 'views'));

// Use express-myconnection middleware with MySQL
app.use(myConnection(mysql, createConnectPool, 'pool'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Session middleware and saveSession middleware to manage sessions
app.use(sessionMiddleware);
app.use(saveSession);

// swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// home route
app.use('/', router);

// health routes
app.use('/', healthRoute);

// session routes
app.use('/', sessionRoute);

// user routes
app.use('/', userRoutes);

// destination routes
app.use('/', destRoute);

// market items routes
app.use('/', marketRoute);

// cart routes
app.use('/', cartRoutes);

app.listen(PORT, HOST, () => {
    console.log('TO INFINITY AND BEYOND!!!!🚀🧑‍🚀👨‍🚀👩‍🚀🚀')
    logger.info(`Server up and running! Listening on http://${HOST}:${PORT}`);
});

// swagger hosted at http//localhost:3000/api-docs
// app.listen(PORT, HOST, () => {
