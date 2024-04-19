// backend/config/swaggerConfig.js
// This file defines your Swagger setup, including API information, paths, parameters, responses, etc.
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Galactic Destinations Market Management API',
            version: '1.0.0',
            description: 'API documentation for cart management',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./api/v1/views/*.js']  // Update this path if your path structure is different
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpec };

// Path: backend/config/swagger/swaggerConfig.js
