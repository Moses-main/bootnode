---
layout: home

hero:
  name: bootnode
  text: Express + MongoDB Backend Generator
  tagline: A CLI tool that scaffolds production-ready Express.js + MongoDB backends in seconds
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/Moses-main/bootnode

features:
  - title: ⚡ Instant Setup
    details: Scaffold a complete backend in seconds with a single command
  - title: 🔐 Complete Auth System
    details: JWT authentication, email verification, password reset out of the box
  - title: 📊 User Management
    details: Full CRUD operations with soft delete, search, and pagination
  - title: 📝 Auto API Docs
    details: Interactive Swagger UI documentation generated automatically
  - title: 🛡️ Rate Limiting
    details: Built-in protection against abuse with configurable limits
  - title: ✅ Input Validation
    details: Request validation using express-validator
  - title: 🧪 Testing Ready
    details: Jest setup with in-memory MongoDB for unit tests
  - title: 🎨 Code Quality
    details: ESLint and Prettier configured for consistent code style
---

## Why bootnode?

Building a backend from scratch takes time. bootnode gives you a production-ready foundation so you can focus on your business logic, not boilerplate.

### Traditional Approach

```bash
# 1. Create project folder
mkdir my-backend && cd my-backend

# 2. Initialize npm
npm init -y

# 3. Install dependencies
npm install express mongoose cors dotenv ...

# 4. Create file structure
mkdir src/models src/controllers src/routes src/middleware

# 5. Write boilerplate code...
# (hours later) Finally ready to start building features
```

### With bootnode

```bash
npx bootnode my-backend
cd my-backend
npm run dev
```

That's it! Your backend is ready with:
- ✅ User authentication (register/login/logout)
- ✅ JWT tokens with refresh mechanism
- ✅ Email verification
- ✅ Password reset
- ✅ Full CRUD API
- ✅ Swagger documentation
- ✅ Rate limiting
- ✅ Input validation

## Quick Start

```bash
# Create a new project
npx bootnode my-backend

# Navigate to project
cd my-backend

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI

# Start development server
npm run dev
```

Your API is now live at `http://localhost:5000` with:
- REST API: `http://localhost:5000/api`
- Swagger Docs: `http://localhost:5000/api-docs`
