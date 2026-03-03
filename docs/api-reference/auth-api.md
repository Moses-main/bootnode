# Authentication API

Complete reference for authentication endpoints.

## Base URL

```
POST /api/v1/auth/register
```

## Register User

Create a new user account.

### Request

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Validation Rules

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| name | string | Yes | 2-50 characters |
| email | string | Yes | Valid email format |
| password | string | Yes | Min 8 chars, must contain: number, lowercase, uppercase, special char |

### Response (201 Created)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Registration successful. Please check your email to verify your account."
}
```

### Errors

| Status | Message |
|--------|---------|
| 400 | User already exists |
| 400 | Validation error with details |

---

## Login

Authenticate a user and receive tokens.

### Request

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

A `refreshToken` cookie is also set (HttpOnly, 30 days).

### Errors

| Status | Message |
|--------|---------|
| 401 | Invalid email or password |
| 401 | Account is deactivated |

---

## Logout

Log out the current user and clear the refresh token.

### Request

```http
POST /api/v1/auth/logout
Authorization: Bearer <access_token>
```

### Response (200 OK)

```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

The refresh token cookie is cleared.

---

## Get Current User

Get the authenticated user's profile.

### Request

```http
GET /api/v1/auth/me
Authorization: Bearer <access_token>
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isEmailVerified": false,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-10T08:00:00.000Z"
  }
}
```

---

## Refresh Token

Refresh the access token using the refresh token cookie.

### Request

```http
POST /api/v1/auth/refresh-token
Cookie: refreshToken=<refresh_token>
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

A new refresh token is also rotated and set in the cookie.

### Errors

| Status | Message |
|--------|---------|
| 401 | No refresh token provided |
| 401 | Invalid refresh token |

---

## Verify Email

Verify a user's email address using a token.

### Request

```http
GET /api/v1/auth/verify-email/<verification_token>
```

### Response (200 OK)

```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": true
  }
}
```

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid or expired verification token |

---

## Password Reset (TODO)

Future endpoint for password reset functionality.
