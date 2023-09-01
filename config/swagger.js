const swaggerJsdoc = require('swagger-jsdoc');
const yaml = require('yamljs');

// Define Swagger options
const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the API version
    info: {
      title: 'Your API Documentation', // Title of your API
      version: '1.0.0', // Version of your API
      description: 'API documentation for your Express.js application',
    },
  },
  apis: ['./routes/*.js'], // Path to your route files
};

// Generate Swagger specification
const specs = swaggerJsdoc(options);

module.exports = specs;
