# Project Structure

Understanding the structure of your bootnode-generated project.

## Directory Structure

```
my-backend/
├── src/
│   ├── config/
│   │   ├── db.js           # Database connection
│   │   └── swagger.js      # Swagger configuration
│   ├── controllers/
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── rateLimiter.js
│   │   └── validators/
│   │       └── user.validator.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── user.routes.js
│   └── app.js              # Express application setup
├── .env.example            # Environment variables template
├── package.json
└── server.js               # Entry point
```

## Key Files Explained

### `src/app.js`

The main Express application configuration. Sets up middleware, routes, and error handling.

### `src/config/db.js`

Database connection logic using Mongoose. Connects to MongoDB based on `MONGODB_URI`.

### `src/models/user.model.js`

Mongoose model for User entity with schema definitions and soft delete support.

### `src/controllers/user.controller.js`

Request handlers for user endpoints. Contains business logic.

### `src/routes/user.routes.js`

Route definitions mapping HTTP methods to controller functions.

### `src/middleware/`

- `rateLimiter.js` - Rate limiting configuration
- `validators/` - Input validation using express-validator

### `server.js`

Entry point that starts the HTTP server.

## Configuration Files

| File | Description |
|------|-------------|
| `.env` | Environment variables (create from `.env.example`) |
| `.env.example` | Template for required environment variables |

## Next Steps

- [API Reference](api-reference/users.md) - Explore endpoints
- [Configuration](configuration/environment-variables.md) - Environment variables
