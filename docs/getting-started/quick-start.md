# Quick Start

Get a production-ready Express + MongoDB backend up and running in under 2 minutes.

## Step 1: Create Your Project

```bash
npx bootnode my-backend
```

This command will:
1. Create a new directory `my-backend`
2. Copy the template files
3. Install all dependencies

## Step 2: Configure Environment

```bash
cd my-backend
cp .env.example .env
```

Edit `.env` with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bootnode
NODE_ENV=development

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRE=30d
```

For MongoDB Atlas, use your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bootnode?retryWrites=true&w=majority
```

## Step 3: Start the
npm run dev Server

```bash
```

You should see:
```
Server running on port 5000
MongoDB connected...
Swagger UI available at http://localhost:5000/api-docs
```

## Step 4: Test Your API

### OpenAPI Documentation

Visit: **http://localhost:5000/api-docs`

This interactive documentation lets you test all endpoints directly from your browser.

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Get all users (protected):**
```bash
curl http://localhost:5000/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm test` | Run tests |

## What's Next?

- [Project Structure](./project-structure.md) - Understand the generated code
- [API Reference](../api-reference/overview.md) - Explore all endpoints
- [Authentication Guide](../guides/authentication.md) - Learn about JWT auth
