# Environment Variables

Complete reference for all environment variables used in bootnode.

## Required Variables

### `PORT`

```env
PORT=5000
```

The port number for the server to listen on.

| Default | Required |
|---------|----------|
| 5000 | No |

### `MONGODB_URI`

```env
MONGODB_URI=mongodb://localhost:27017/bootnode
```

MongoDB connection string.

**Local:**
```
mongodb://localhost:27017/bootnode
```

**MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/bootnode?retryWrites=true&w=majority
```

| Default | Required |
|---------|----------|
| - | Yes |

### `NODE_ENV`

```env
NODE_ENV=development
```

Application environment.

| Values | Description |
|--------|-------------|
| development | Development mode with detailed errors |
| production | Production mode with optimized settings |

---

## JWT Configuration

### `JWT_SECRET`

```env
JWT_SECRET=your-super-secret-key
```

Secret key for signing JWT access tokens.

**Generate a secure key:**
```bash
openssl rand -base64 32
```

| Default | Required |
|---------|----------|
| - | Yes |

### `JWT_EXPIRE`

```env
JWT_EXPIRE=30d
```

Access token expiration time.

| Default | Required |
|---------|----------|
| 30d | No |

### `REFRESH_TOKEN_SECRET`

```env
REFRESH_TOKEN_SECRET=your-refresh-secret-key
```

Secret key for signing refresh tokens.

### `REFRESH_TOKEN_EXPIRE`

```env
REFRESH_TOKEN_EXPIRE=30d
```

Refresh token expiration time.

---

## Rate Limiting

### `RATE_LIMIT_WINDOW_MS`

```env
RATE_LIMIT_WINDOW_MS=900000
```

Rate limiting window in milliseconds.

| Default | Required |
|---------|----------|
| 900000 (15 min) | No |

### `RATE_LIMIT_MAX`

```env
RATE_LIMIT_MAX=100
```

Maximum requests per rate limit window.

---

## Optional Variables

### `API_URL`

```env
API_URL=http://localhost:5000
```

Base URL for API (used in emails, etc.)

### `FRONTEND_URL`

```env
FRONTEND_URL=http://localhost:5173
```

Frontend URL for CORS and redirects.

---

## Complete Example

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bootnode

# JWT
JWT_SECRET=your-super-secret-key-generate-with-openssl
JWT_EXPIRE=30d
REFRESH_TOKEN_SECRET=your-refresh-secret-key
REFRESH_TOKEN_EXPIRE=30d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# URLs
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

## Security Notes

1. **Never commit** `.env` to version control
2. Add `.env` to `.gitignore`
3. Use different secrets for production
4. Use environment-specific values (dev vs prod)
