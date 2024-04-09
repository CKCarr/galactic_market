// src/redis.js
// create a Redis Client and connect to the server
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config({ path: '../env/.env.redis' });

console.log(process.env.REDIS_HOST); // Check if HOST is set correctly
console.log(process.env.REDIS_PORT); // Check if PORT is set correctly

// Redis client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

// Test Redis connection
async function testRedisConnection() {
    try {
        const result_response = await redisClient.ping();
        console.log("Redis Connection Test Result: ", result_response);
    } catch (error) {
        console.error("Error connecting to Redis: ", error);
    }
}

// Initialize Redis connection
async function initializeRedis() {
    try {
        await redisClient.connect();
        console.log('Connected to Redis successfully!');

        // Test the connection to Redis
        await testRedisConnection();
    } catch (err) {
        console.error('Error connecting to Redis:', err);

        // Exit the process if the connection to Redis fails
        process.exit(1);
    }
}

export { redisClient, initializeRedis };
