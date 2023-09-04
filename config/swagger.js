const swaggerJsdoc = require('swagger-jsdoc');
const yaml = require('yamljs');


// const options = {
//   swaggerDefinition: {
//     openapi: '3.0.0', 
//     info: {
//       title: 'API Documentation', 
//       version: '1.0.0', 
//       description: 'API documentation for your Express.js application',
//     },
//   },
//   apis: ['./routes/*.js'], 
// };


// const specs = swaggerJsdoc(options);

// module.exports = specs;

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', 
    info: {
      title: 'Your API Documentation', 
      version: '1.0.0', 
      description: 'API documentation for your Express.js application',
    },
  },
  apis: ['./routes/*.js'], 
};


const specs = swaggerJsdoc(options);

module.exports = specs;
