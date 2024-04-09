// src/server.js
// Create an instance of Express and use the imported routes
// Use redis as middleware for caching routes
// Start the server
import express from 'express';
import apiRoutes from '../api/routes/routes.js';
import { redisClient, initializeRedis } from './redis.js';
import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from '../config/swaggerConfig.js';
// Swagger definition in a separate file for better organization
// '/api-docs' is the endpoint where Swagger UI will be available. 
//API documentation by visiting http://localhost:3000/api-docs in your browser after starting your server.

// create an instance of express
const app = express();

// Define the port and host
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
// Check if HOST is set correctly
console.log(process.env.HOST);
// Check if port is set correctly
console.log(process.env.PORT);

// Swagger definition in a separate file for better organization
// '/api-docs' is the endpoint where Swagger UI will be available. 
//API documentation by visiting http://localhost:3000/api-docs in your browser after starting your server.

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

// Use the imported routes with Express app
app.use('/', apiRoutes);

// Middleware for caching with Redis
app.use((req, res, next) => {
    const key = req.originalUrl;

    redisClient.get(key, (err, data) => {
        if (err) {
            console.error(err);
            return next(); // Go to the next middleware if there is an error without sending a response
        }
        if (data) {
            // If the data is found in Redis, send it as a response
            console.log('Data from Redis: ');
            res.setHeader('Content-Type', 'application/json');
            return res.send(data);
        } else {
            // If the data is not found in Redis, go to the next middleware
            next();
        }
    });
});

// Initialize Redis connection
initializeRedis();

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server up and running! Listening on http://${HOST}:${PORT}`);
});
// The server is now running on http://localhost:3000/. You can test the API endpoints using Postman or any other API testing tool.
