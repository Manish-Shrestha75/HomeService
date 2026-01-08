import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

 const setupSwagger = (app: Express) => {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Home Service Platform API',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
        components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT token in the format: Bearer <token>'
          }
        }
      },
    },
    apis: ['./src/docs/*.ts'],
  };

  const swaggerSpec = swaggerJsdoc(options);
  

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true, 
    },
  }));
};

export default setupSwagger;