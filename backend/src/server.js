// src/server.js
// Create an instance of Express and use the imported routes
// Use redis as middleware for caching routes
// Start the server
import express from 'express';
// import { redisClient } from './redis.js'
import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from '../config/swagger/swaggerConfig.js';
import dotenv from 'dotenv';
// import routes for the application
import router from '../api/routes/routes.js';
import loginRoute from '../api/routes/login.js';
import registerRoute from '../api/routes/register.js';
import userRoute from '../api/routes/users.js';
import marketRoute from '../api/routes/marketItems.js';
import cartRoute from '../api/routes/cart.js';
import destRoute from '../api/routes/destinations.js';

dotenv.config({ path: '../env/.env.app' });
// create an instance of express
const app = express();

// Define the port and host
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
// Check if HOST is set correctly
console.log(process.env.HOST);
// Check if port is set correctly
console.log(process.env.PORT);

// // Middleware for caching with Redis
// app.use((req, res, next) => {
//     const key = req.originalUrl;

//     redisClient.get(key, (err, data) => {
//         if (err) {
//             console.error(err);
//             return next();
//         }
//         if (data) {
//             // If the data is found in Redis, send it as a response
//             console.log('Data from Redis: ');
//             res.setHeader('Content-Type', 'application/json');
//             return res.send(data);
//         } else {
//             // If the data is not found in Redis, call the next middleware
//             return next();
//         }
//     });
// });

// swagger route for application
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

app.use(express.json());

// use the route created in routes.js
app.use('/', router);

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/session', userRoute);

//destinations
app.use('/destinations', destRoute);

//users
app.use('/users', userRoute);

// market items
app.use('/market-items', marketRoute); 

//cart
app.use('/cart/:userId', cartRoute);
app.use('/cart-items', cartRoute);

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server up and running! Listening on http://${HOST}:${PORT}`);
});
// The server is now running on http://localhost:3000/. You can test the API endpoints using Postman or any other API testing tool.
// Swagger definition in a separate file for better organization
// '/api-docs' is the endpoint where Swagger UI will be available. 
//API documentation by visiting http://localhost:3000/api-docs in your browser after starting your server.
