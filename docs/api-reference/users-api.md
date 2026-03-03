# Users API

Complete reference for user management endpoints.

## Base URL

```
/api/v1/users
```

> **Note:** These endpoints require authentication except for admin-only creation.

---

## List Users

Get all users with pagination and optional filtering.

### Request

```http
GET /api/v1/users?page=1&limit=10&sortBy=createdAt&sortOrder=desc
Authorization: Bearer <access_token>
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page (max 100) |
| sortBy | string | createdAt | Field to sort by |
| sortOrder | string | desc | Sort direction (asc/desc) |
| search | string | - | Search by name or email |
| isActive | boolean | - | Filter by active status |

### Response (200 OK)

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isEmailVerified": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-10T08:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "sortBy": "createdAt",
    "sortOrder": "desc",
    "filters": {
      "search": null,
      "isActive": null
    }
  }
}
```

---

## Get User by ID

Get a single user by their ID.

### Request

```http
GET /api/v1/users/:id
Authorization: Bearer <access_token>
```

### Response (200 OK)

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "isEmailVerified": true,
  "lastLogin": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-10T08:00:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid user ID format |
| 404 | User not found |

---

## Create User

Create a new user. (Admin endpoint - no auth shown for simplicity)

### Request

```http
POST /api/v1/users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

### Response (201 Created)

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "user",
  "isEmailVerified": false,
  "createdAt": "2024-01-15T12:00:00.000Z"
}
```

### Errors

| Status | Message |
|--------|---------|
| 400 | Email already in use |
| 400 | Validation error with details |

---

## Update User

Update a user's details.

### Request

```http
PATCH /api/v1/users/:id
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "name": "John Updated",
  "email": "newemail@example.com"
}
```

### Response (200 OK)

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Updated",
  "email": "newemail@example.com",
  "role": "user",
  "isEmailVerified": true,
  "updatedAt": "2024-01-15T14:00:00.000Z"
}
```

### Errors

| Status | Message |
|--------|---------|
| 400 | Invalid user ID format |
| 400 | Email already in use |
| 404 | User not found |

---

## Soft Delete User

Deactivate a user account (soft delete).

### Request

```http
DELETE /api/v1/users/:id
Authorization: Bearer <access_token>
```

### Response (200 OK)

```json
{
  "message": "User deactivated successfully"
}
```

The user's `isActive` field is set to `false` and `deactivatedAt` is set.

---

## Permanently Delete User

Permanently delete a user from the database.

### Request

```http
DELETE /api/v1/users/:id/permanent
Authorization: Bearer <access_token>
```

### Response (200 OK)

```json
{
  "message": "User deleted successfully"
}
```

> ⚠️ **Warning:** This action cannot be undone!

---

## Search Users

Search users by name or email.

### Request

```http
GET /api/v1/users/search?q=john&page=1&limit=10
Authorization: Bearer <access_token>
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Search query |
| page | number | No | Page number |
| limit | number | No | Items per page |
| isActive | boolean | No | Filter by active status |

### Response (200 OK)

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isEmailVerified": true,
      "createdAt": "2024-01-10T08:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "query": "john",
    "filters": {
      "isActive": null
    }
  }
}
```

### Errors

| Status | Message |
|--------|---------|
| 400 | Search query is required |
