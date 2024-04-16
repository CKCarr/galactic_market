import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session'
import { createConnectPool, logger } from './db.js'; // Import the MySQL connection pool

import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from '../config/swagger/swaggerConfig.js';

import dotenv from 'dotenv';

dotenv.config({ path: './env/.env.app' });
dotenv.config({ path: './env/.env.mysql' });

import router from '../api/v1/route.js';
import userRoutes from '../api/v1/users.js';
import healthRoute from '../api/v1/health.js';
import sessionRoute from '../api/v1/session.js';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

// Create MySQL session store
const sessionStore = new MySQLStore({
  createDatabaseTable: true,
  clearExpired: true,
  schema: {
    tableName: 'session',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
}, createConnectPool()); // Pass the connection pool to the session store

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // Use the MySQL session store for storing session data
  store: sessionStore,
  cookie: { secure: false, maxAge: 60000 },
}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use('/', router);
app.use('/api/v1/health', healthRoute);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/session', sessionRoute);


app.listen(PORT, HOST, () => {
    console.log('TO INFINITY AND BEYOND!!!!🚀🧑‍🚀👨‍🚀👩‍🚀🚀')
    logger.info(`Server up and running! Listening on http://${HOST}:${PORT}`);
});
