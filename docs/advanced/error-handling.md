# Error Handling

How bootnode handles errors and how to customize error responses.

## Default Error Responses

All API errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

## HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | Normal responses |
| 201 | Created | User created |
| 400 | Bad Request | Validation failed |
| 401 | Unauthorized | Invalid/missing token |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Unexpected error |

## Error Types

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Email is required",
    "Password must be at least 8 characters"
  ]
}
```

### Authentication Error (401)

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Not Found Error (404)

```json
{
  "success": false,
  "message": "User not found"
}
```

### Rate Limit Error (429)

```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

## Custom Error Handling

Add custom error handlers in `src/app.js`:

```javascript
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

## Validation Errors

Validation is handled by `express-validator`. Custom validators can be added in route files:

```javascript
import { body } from 'express-validator';

const customRules = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number')
];
```

## Next Steps

- [Rate Limiting](./rate-limiting.md) - Configure rate limits
