// backend/config/swaggerConfig.js
// This file defines your Swagger setup, including API information, paths, parameters, responses, etc.
import swaggerJsdoc from 'swagger-jsdoc'

// Swagger definition
const swaggerDefinition = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Galactic Destination custom API',
            version: '1.0.0',
            description: 'A custom API for Galactic Destination project',
        },
    },
    apis: ['api/routes/*.js'], // PAth to the API route files
};

// Options for the swagger docs - create a new instance of swaggerJsdoc
const swaggerSpec = swaggerJsdoc(swaggerDefinition);

export default swaggerSpec;
