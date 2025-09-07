import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Common response schemas
const commonResponses = {
  400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        }
      },
      'application/xml': {
        schema: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                errors: {
                  type: 'array',
                  items: {
                    type: 'object'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  401: {
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        }
      }
    }
  },
  404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        }
      }
    }
  },
  500: {
    description: 'Server Error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        }
      }
    }
  }
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bootnode API',
      version: '1.0.0',
      description: 'API documentation for Bootnode backend service',
      contact: {
        name: 'API Support',
        url: 'https://github.com/Moses-main/bootnode',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the user',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
              example: 'john@example.com',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the user was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time the user was last updated',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Error message',
              example: 'User not found',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    description: 'The field that caused the error',
                    example: 'email',
                  },
                  message: {
                    type: 'string',
                    description: 'Error message for the field',
                    example: 'Invalid email format',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  // Swagger page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  // Docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log(`📚 API Documentation available at http://localhost:${port}/api-docs`);
};

export default swaggerDocs;
