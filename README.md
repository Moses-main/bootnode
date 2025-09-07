# Bootnode API Documentation

A production-ready Express.js + MongoDB backend template with built-in user management, validation, and API documentation.

## Table of Contents
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Setup & Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [API Documentation](#api-documentation)

## Features

- 🚀 **RESTful API** with proper HTTP methods and status codes
- 🛡 **Input Validation** using express-validator
- ⚡ **Rate Limiting** to prevent abuse
- 📝 **API Documentation** with Swagger UI
- 🧪 **Error Handling** with proper error messages
- 🔍 **Search & Pagination** for user listings
- 🔄 **Soft Delete** functionality
- 🛠 **Environment-based** configuration

## API Endpoints

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/users` | Get all users (paginated) |
| `GET`  | `/api/users/:id` | Get a single user by ID |
| `POST` | `/api/users` | Create a new user |
| `PATCH` | `/api/users/:id` | Update a user's details |
| `DELETE` | `/api/users/:id` | Deactivate a user (soft delete) |
| `DELETE` | `/api/users/:id/permanent` | Permanently delete a user |
| `GET` | `/api/users/search?q=` | Search users by name or email |

## Request/Response Examples

### 1. Get All Users
**Request:**
```http
GET /api/users?page=1&limit=10
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "_id": "5f8d0d55b54764421b7156c8",
      "name": "John Doe",
      "email": "john@example.com",
      "isActive": true,
      "createdAt": "2023-10-15T08:00:00.000Z",
      "updatedAt": "2023-10-15T08:30:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 2. Create a New User
**Request:**
```http
POST /api/users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

**Response (201 Created):**
```json
{
  "_id": "5f8d0d55b54764421b7156c9",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "isActive": true,
  "createdAt": "2023-10-15T09:00:00.000Z",
  "updatedAt": "2023-10-15T09:00:00.000Z"
}
```

### 3. Update User
**Request:**
```http
PATCH /api/users/5f8d0d55b54764421b7156c9
Content-Type: application/json

{
  "name": "Jane Doe"
}
```

**Response (200 OK):**
```json
{
  "_id": "5f8d0d55b54764421b7156c9",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "isActive": true,
  "createdAt": "2023-10-15T09:00:00.000Z",
  "updatedAt": "2023-10-15T10:00:00.000Z"
}
```

## Setup & Installation

### Prerequisites
- Node.js 14.x or later
- npm 6.x or later
- MongoDB (local or cloud instance)

### Quick Start

1. Create a new project using npx:
   ```bash
   npx bootnode my-backend
   ```
   This will:
   - Create a new directory called `my-backend`
   - Set up all necessary files and folders
   - Install all required dependencies

2. Navigate to your project directory:
   ```bash
   cd my-backend
   ```

3. Configure your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other settings
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000` by default.

5. Access the API documentation at `http://localhost:5000/api-docs`

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── db.js        # Database connection
│   └── swagger.js   # API documentation
├── controllers/      # Route controllers
│   └── user.controller.js
├── middleware/       # Custom middleware
│   ├── rateLimiter.js
│   └── validators/
│       └── user.validator.js
├── models/           # Database models
│   └── user.model.js
├── routes/           # Route definitions
│   └── user.routes.js
└── app.js            # Express application setup
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/bootnode` |
| `NODE_ENV` | Application environment | `development` |
| `RATE_LIMIT_WINDOW_MS` | Rate limiting window in ms | `15 * 60 * 1000` (15 minutes) |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

## Error Handling

The API returns consistent error responses with appropriate HTTP status codes:

- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource (e.g., email already exists)
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

Example error response:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Email is required", "Name must be at least 3 characters"]
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address
- Headers included in responses:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests in window
  - `X-RateLimit-Reset`: Timestamp when window resets

## API Documentation

Interactive API documentation is available at `/api-docs` when the server is running. This provides:
- Full endpoint documentation
- Request/response schemas
- The ability to test endpoints directly from the browser

To access the API documentation:
1. Start the server
2. Open `http://localhost:5000/api-docs` in your browser

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
