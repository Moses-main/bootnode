# Users API

Complete reference for User API endpoints.

## Base URL

```
/api/users
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (paginated) |
| GET | `/api/users/:id` | Get a single user by ID |
| POST | `/api/users` | Create a new user |
| PATCH | `/api/users/:id` | Update a user's details |
| DELETE | `/api/users/:id` | Deactivate a user (soft delete) |
| DELETE | `/api/users/:id/permanent` | Permanently delete a user |
| GET | `/api/users/search?q=` | Search users by name or email |

---

## Get All Users

```
GET /api/users
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |
| sort | string | -createdAt | Sort field (prefix with - for descending) |

### Example Request

```bash
GET /api/users?page=1&limit=10&sort=-createdAt
```

### Example Response

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

---

## Get User by ID

```
GET /api/users/:id
```

### Example Request

```bash
GET /api/users/5f8d0d55b54764421b7156c8
```

### Example Response

```json
{
  "data": {
    "_id": "5f8d0d55b54764421b7156c8",
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "createdAt": "2023-10-15T08:00:00.000Z",
    "updatedAt": "2023-10-15T08:30:00.000Z"
  }
}
```

---

## Create User

```
POST /api/users
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | User's full name |
| email | string | Yes | User's email address |

### Example Request

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Smith", "email": "jane@example.com"}'
```

### Example Response

```json
{
  "data": {
    "_id": "5f8d0d55b54764421b7156c9",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "isActive": true,
    "createdAt": "2023-10-15T09:00:00.000Z",
    "updatedAt": "2023-10-15T09:00:00.000Z"
  }
}
```

---

## Update User

```
PATCH /api/users/:id
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | User's full name |
| email | string | No | User's email address |

### Example Request

```bash
curl -X PATCH http://localhost:5000/api/users/5f8d0d55b54764421b7156c9 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe"}'
```

### Example Response

```json
{
  "data": {
    "_id": "5f8d0d55b54764421b7156c9",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "isActive": true,
    "createdAt": "2023-10-15T09:00:00.000Z",
    "updatedAt": "2023-10-15T10:00:00.000Z"
  }
}
```

---

## Delete User (Soft Delete)

```
DELETE /api/users/:id
```

Soft deletes a user by setting `isActive` to `false`.

### Example Request

```bash
curl -X DELETE http://localhost:5000/api/users/5f8d0d55b54764421b7156c9
```

### Example Response

```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

---

## Permanent Delete

```
DELETE /api/users/:id/permanent
```

Permanently deletes a user from the database.

### Example Request

```bash
curl -X DELETE http://localhost:5000/api/users/5f8d0d55b54764421b7156c9/permanent
```

### Example Response

```json
{
  "success": true,
  "message": "User deleted permanently"
}
```

---

## Search Users

```
GET /api/users/search?q=
```

Searches users by name or email.

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search query (matches name or email) |

### Example Request

```bash
GET /api/users/search?q=john
```

### Example Response

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
