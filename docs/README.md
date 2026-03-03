# bootnode

> A simple CLI tool to bootstrap Express + MongoDB backend projects with sensible defaults.

[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-14+-blue)](https://nodejs.org)

bootnode is a CLI tool that generates production-ready Express.js + MongoDB backend projects with built-in user management, validation, and API documentation.

## ⚡ Features

- 🚀 RESTful API with proper HTTP methods and status codes
- 🛡 Input Validation using express-validator
- ⚡ Rate Limiting to prevent abuse
- 📝 API Documentation with Swagger UI
- 🧪 Error Handling with proper error messages
- 🔍 Search & Pagination for user listings
- 🔄 Soft Delete functionality
- 🛠 Environment-based configuration

## 🚀 Quick Start

```bash
# Create a new project
npx bootnode my-backend

# Navigate to project
cd my-backend

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Your API will be available at `http://localhost:5000` with Swagger docs at `http://localhost:5000/api-docs`

## 📖 Documentation

- [Getting Started](getting-started/installation.md) - Installation and setup
- [Quick Start](getting-started/quick-start.md) - Create your first project
- [Project Structure](getting-started/project-structure.md) - Understanding the codebase
- [API Reference](api-reference/users.md) - API endpoints
- [Configuration](configuration/environment-variables.md) - Environment variables
- [Error Handling](advanced/error-handling.md) - Error handling guide
- [Rate Limiting](advanced/rate-limiting.md) - Rate limiting configuration

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm start` | Start production server |
| `npm test` | Run tests |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.
