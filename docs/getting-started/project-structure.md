# Project Structure

Understanding the structure of your bootnode-generated project.

## Generated Files

```
my-backend/
├── src/
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   └── swagger.js      # Swagger/OpenAPI config
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   └── user.controller.js    # User CRUD logic
│   ├── middleware/
│   │   ├── rateLimiter.js        # Rate limiting config
│   │   └── validators/
│   │       └── validation.middleware.js
│   ├── models/
│   │   └── user.model.js   # User Mongoose schema
│   ├── routes/
│   │   ├── auth.routes.js  # Auth API routes
│   │   └── user.routes.js  # User API routes
│   ├── utils/
│   │   ├── jwt.js          # JWT utilities
│   │   └── ...
│   └── app.js              # Express app setup
├── tests/                  # Jest test files
├── .env.example            # Environment template
├── server.js               # Entry point
└── package.json
```

## Key Files Explained

### `server.js` (Entry Point)

The main entry point that starts the HTTP server:

```javascript
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
await connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### `src/app.js` (Express Setup)

Configures the Express application with all middleware and routes:

```javascript
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import swaggerSetup from './config/swagger.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rate limiting
app.use('/api', rateLimit({ windowMs: 15*60*1000, max: 100 }));

// Swagger documentation
swaggerSetup(app);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

export default app;
```

### `src/models/user.model.js` (Database Schema)

The User model with:
- Password hashing (bcrypt)
- Email validation
- Soft delete support
- JWT methods

### `src/controllers/` (Business Logic)

- `auth.controller.js` - Register, login, logout, refresh token, email verification
- `user.controller.js` - CRUD operations, search, pagination

### `src/routes/` (API Endpoints)

- `auth.routes.js` - `/api/v1/auth/*`
- `user.routes.js` - `/api/v1/users/*`

### `src/middleware/`

- `rateLimiter.js` - API rate limiting configuration

## Environment Files

### `.env.example`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bootnode
NODE_ENV=development

# JWT
JWT_SECRET=your-secret
JWT_EXPIRE=30d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRE=30d
```

## Next Steps

- [API Reference](../api-reference/overview.md) - Full API documentation
- [Configuration](../configuration/environment-variables.md) - All environment variables
