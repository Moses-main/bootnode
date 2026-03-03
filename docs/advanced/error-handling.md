# Error Handling

bootnode implements consistent error handling across all API endpoints.

## Error Response Format

All errors follow a consistent JSON format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detail 1", "Detail 2"]
}
```

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Duplicate resource |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Error Types

### 400 - Validation Error

Returned when input validation fails.

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Email is required",
    "Name must be at least 3 characters"
  ]
}
```

### 404 - Not Found

Returned when a requested resource doesn't exist.

```json
{
  "success": false,
  "message": "User not found"
}
```

### 409 - Conflict

Returned when trying to create a duplicate resource.

```json
{
  "success": false,
  "message": "Email already exists"
}
```

### 429 - Too Many Requests

Returned when rate limit is exceeded.

```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### 500 - Internal Server Error

Returned when an unexpected error occurs.

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Custom Error Handling

To add custom error handling in your controllers:

```javascript
const handleError = (res, message, errors = []) => {
  return res.status(400).json({
    success: false,
    message,
    errors
  });
};

// Usage
if (!email) {
  return handleError(res, 'Validation error', ['Email is required']);
}
```

## Next Steps

- [Rate Limiting](rate-limiting.md) - Configure rate limits
