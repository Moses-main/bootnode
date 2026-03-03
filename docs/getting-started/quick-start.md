# Quick Start

Get your Express + MongoDB backend up and running in under 2 minutes!

## Create Your First Project

```bash
npx bootnode my-backend
```

This command will:

1. ✅ Create a new directory called `my-backend`
2. ✅ Set up all necessary files and folders
3. ✅ Install all required dependencies

## Navigate to Your Project

```bash
cd my-backend
```

## Configure Environment Variables

```bash
cp .env.example .env
```

Edit `. MongoDB connection string:

```envenv` with your
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bootnode
NODE_ENV=development
```

## Start the Server

```bash
npm run dev
```

## Access Your API

| Service | URL |
|---------|-----|
| API | http://localhost:5000 |
| Swagger Docs | http://localhost:5000/api-docs |

## Test Your API

### Get All Users

```bash
curl http://localhost:5000/api/users
```

### Create a User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## Next Steps

- [Project Structure](project-structure.md) - Understand the generated code
- [API Reference](api-reference/users.md) - Explore all endpoints
- [Configuration](configuration/environment-variables.md) - Customize settings
