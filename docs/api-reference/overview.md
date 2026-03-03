# API Overview

The bootnode template provides a complete RESTful API with the following endpoints:

## Base URL

```
http://localhost:5000/api/v1
```

## Endpoints Summary

| Category | Endpoint | Description |
|----------|----------|-------------|
| **Auth** | `/auth/register` | Register a new user |
| **Auth** | `/auth/login` | Login and get tokens |
| **Auth** | `/auth/logout` | Logout and clear tokens |
| **Auth** | `/auth/me` | Get current user profile |
| **Auth** | `/auth/refresh-token` | Refresh access token |
| **Auth** | `/auth/verify-email` | Verify user email |
| **Users** | `/users` | List all users (paginated) |
| **Users** | `/users/:id` | Get user by ID |
| **Users** | `/users/search` | Search users |
| **Users** | `POST /users` | Create a new user |
| **Users** | `PATCH /users/:id` | Update a user |
| **Users** | `DELETE /users/:id` | Soft delete a user |
| **Users** | `DELETE /users/:id/permanent` | Permanently delete |

## Authentication

Most endpoints require authentication using JWT Bearer tokens.

### Getting a Token

1. **Register**: `POST /auth/register` - Returns access token
2. **Login**: `POST /auth/login` - Returns access token

### Using the Token

Include the token in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  http://localhost:5000/api/v1/users
```

### Token Refresh

Access tokens expire. Use the refresh token endpoint:

```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh-token \
  -H "Cookie: refreshToken=YOUR_REFRESH_TOKEN"
```

## Response Format

All responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

### Paginated Response

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 10 requests per 15 minutes

Rate limit headers are included in responses:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

## Next Steps

- [Authentication API](./auth-api.md) - Full auth endpoints
- [Users API](./users-api.md) - Full user CRUD endpoints
- [Interactive Docs](http://localhost:5000/api-docs) - Swagger UI
