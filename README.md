# BootNode - Enterprise Backend Framework

<p align="center">
  <img src="https://raw.githubusercontent.com/bootnode/bootnode/main/banner.png" alt="BootNode Banner" width="100%">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/bootnode">
    <img src="https://img.shields.io/npm/v/bootnode.svg" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/bootnode">
    <img src="https://img.shields.io/npm/dm/bootnode.svg" alt="npm downloads">
  </a>
  <a href="https://github.com/bootnode/bootnode/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/bootnode/bootnode.svg" alt="license">
  </a>
  <a href="https://github.com/bootnode/bootnode/actions">
    <img src="https://github.com/bootnode/bootnode/workflows/CI/badge.svg" alt="build">
  </a>
</p>

---

## Introduction

BootNode is an enterprise-grade backend framework for Node.js — similar to Laravel for PHP or Rails for Ruby. It provides a convention-based structure for building production-ready APIs in minutes, not hours.

Whether you're building a simple REST API or a complex fintech system, BootNode gives you a solid foundation with industry best practices built-in.

### Why BootNode?

| Feature | Description |
|---------|-------------|
| 🚀 **Instant Setup** | Generate a complete backend in seconds |
| 📦 **8 Ready Templates** | Blog, CMS, LMS, FinTech, E-Commerce, SaaS, API, Blank |
| 🔐 **Complete Auth** | JWT, email verification, password reset |
| 🛡️ **Enterprise Features** | Rate limiting, validation, error handling, logging |
| 📊 **Database Support** | MongoDB & PostgreSQL |
| 📝 **Auto API Docs** | Interactive Swagger UI |
| 🐳 **Docker Ready** | Dockerfile & docker-compose |
| 🧪 **Testing Built-in** | Jest with in-memory MongoDB |

---

## Quick Start

### Installation

No installation required! Use `npx` to run directly:

```bash
npx bootnode --help
```

Or install globally:

```bash
npm install -g bootnode
bootnode --help
```

### Create Your First Project

#### Interactive Mode (Recommended)

```bash
npx bootnode
```

This will prompt you through the setup:

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ██████╗ ███████╗████████╗██████╗  ██████╗                  ║
║  ██╔════╝ ██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗                 ║
║  ██║  ███╗█████╗    ██║   ██████╔╝██║   ██║                 ║
║  ██║   ██║██╔══╝    ██║   ██╔══██╗██║   ██║                 ║
║  ╚██████╔╝███████╗   ██║   ██║  ██║╚██████╔╝                 ║
║   ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝                  ║
║           Backend Framework for Modern Developers             ║
╚══════════════════════════════════════════════════════════════╝

? Project name: my-api
? Choose a template:
  > API Server - REST API with authentication, CRUD, and validation
    Blank - Minimal Express.js server
    Blog API - Blog with posts, categories, comments
    CMS - Content Management System
    LMS - Learning Management System
    FinTech - Financial technology backend
    E-Commerce - Online store backend
    SaaS Starter - Multi-tenant SaaS
? Choose a database: MongoDB (Mongoose)
? Choose package manager: npm
? Initialize Git repository? Yes
? Install dependencies? Yes

🚀 Creating API Server project...

📦 Installing dependencies...
```

#### Command Line Mode

```bash
# Basic usage
npx bootnode my-api

# Specify template
npx bootnode my-blog --template blog

# Full options
npx bootnode my-fintech --template fintech --database mongodb --pm npm
```

---

## Available Templates

BootNode comes with 8 production-ready templates:

### 1. Blank (`--template blank`)

Minimal Express.js server for simple projects.

```bash
npx bootnode my-app --template blank
```

**Perfect for:**
- Simple APIs
- Microservices
- Learning Express.js

**Includes:**
- Express.js setup
- CORS & dotenv
- Health check endpoint

---

### 2. API (`--template api`)

Full-featured REST API with authentication.

```bash
npx bootnode my-api --template api
```

**Perfect for:**
- Mobile app backends
- SPA backends
- General REST APIs

**Features:**
- ✅ JWT Authentication
- ✅ User CRUD
- ✅ Input Validation
- ✅ Rate Limiting
- ✅ Error Handling
- ✅ Swagger Documentation

**Endpoints:**
```bash
# Auth
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
POST /api/v1/auth/refresh-token
GET  /api/v1/auth/verify-email/:token

# Users
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

---

### 3. Blog (`--template blog`)

Complete blog with posts, categories, and comments.

```bash
npx bootnode my-blog --template blog
```

**Perfect for:**
- Blog websites
- Content platforms
- News sites

**Features:**
- ✅ Posts with markdown support
- ✅ Categories & Tags
- ✅ Comments with threading
- ✅ Featured posts
- ✅ Search functionality
- ✅ View counting
- ✅ SEO metadata

**Endpoints:**
```bash
# Posts
GET    /api/v1/posts
GET    /api/v1/posts/:slug
POST   /api/v1/posts
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id
GET    /api/v1/posts/featured

# Categories
GET  /api/v1/categories
POST /api/v1/categories

# Comments
GET    /api/v1/posts/:id/comments
POST   /api/v1/posts/:id/comments
DELETE /api/v1/comments/:id
```

---

### 4. CMS (`--template cms`)

Content Management System with media handling.

```bash
npx bootnode my-cms --template cms
```

**Perfect for:**
- Enterprise CMS
- News platforms
- Content publishers

**Features:**
- ✅ Articles with rich content
- ✅ Media library (images, files)
- ✅ Categories & tags
- ✅ Content scheduling
- ✅ Draft/Published workflow
- ✅ SEO optimization

---

### 5. LMS (`--template lms`)

Learning Management System.

```bash
npx bootnode my-lms --template lms
```

**Perfect for:**
- Online courses
- Training platforms
- Educational apps

**Features:**
- ✅ Courses & Lessons
- ✅ Quizzes & Assessments
- ✅ Student Progress
- ✅ Certificates
- ✅ Enrollments
- ✅ Instructor Profiles

---

### 6. FinTech (`--template fintech`)

Financial technology backend.

```bash
npx bootnode my-fintech --template fintech
```

**Perfect for:**
- Banking apps
- Payment platforms
- Wallet systems

**Features:**
- ✅ Multiple account types (checking, savings, wallet)
- ✅ Transactions (deposit, withdrawal, transfer)
- ✅ Virtual & Physical Cards
- ✅ Card Controls (limits, freeze)
- ✅ Transaction History
- ✅ Balance Management
- ✅ Account Limits

**Models:**
```javascript
Account     // Bank accounts, wallets
Transaction // All financial transactions
Card       // Debit/credit cards
```

---

### 7. E-Commerce (`--template ecommerce`)

Online store backend.

```bash
npx bootnode my-store --template ecommerce
```

**Perfect for:**
- Online stores
- Marketplaces
- Inventory systems

**Features:**
- ✅ Products & Categories
- ✅ Shopping Cart
- ✅ Orders & Order Items
- ✅ Inventory Management
- ✅ Shipping Options
- ✅ Payment Ready

---

### 8. SaaS (`--template saas`)

Multi-tenant SaaS starter.

```bash
npx bootnode my-saas --template saas
```

**Perfect for:**
- SaaS products
- Multi-tenant apps
- API platforms

**Features:**
- ✅ Multi-tenancy
- ✅ Teams & Memberships
- ✅ Roles & Permissions
- ✅ API Keys
- ✅ Webhooks
- ✅ Subscriptions (Stripe-ready)

---

## CLI Options

| Option | Description | Values |
|--------|-------------|--------|
| `--template` | Project template | `blank`, `api`, `blog`, `cms`, `lms`, `fintech`, `ecommerce`, `saas` |
| `--database` | Database driver | `mongodb`, `postgresql` |
| `--pm` | Package manager | `npm`, `yarn`, `pnpm` |
| `--no-git` | Skip Git initialization | - |
| `--no-install` | Skip npm install | - |

### Examples

```bash
# Blog with MongoDB
npx bootnode blog-api --template blog --database mongodb

# E-commerce with PostgreSQL  
npx bootnode store-api --template ecommerce --database postgresql

# SaaS with yarn, no git
npx bootnode saas-api --template saas --pm yarn --no-git

# Skip installation (faster cloning)
npx bootnode quick-api --template api --no-install
```

---

## Project Structure

After generating a project, you'll get this structure:

```
my-api/
├── src/
│   ├── config/
│   │   ├── db.js           # Database connection
│   │   ├── env.js          # Environment config
│   │   └── swagger.js      # Swagger setup
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── rateLimiter.js
│   │   └── validators/
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   └── email.service.js
│   ├── utils/
│   │   └── jwt.js
│   └── app.js              # Express app
├── tests/
│   ├── auth.controller.test.js
│   ├── user.controller.test.js
│   └── setup.js
├── .env.example
├── package.json
├── server.js
└── README.md
```

---

## Available Commands

Once your project is created:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm test` | Run tests |

---

## Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Configure your variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/myapi

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRE=30d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

---

## API Documentation

All templates include interactive Swagger documentation.

Start your server:

```bash
npm run dev
```

Visit: **http://localhost:3000/api-docs**

---

## Database Support

### MongoDB (Default)

Uses Mongoose ODM:

```javascript
import mongoose from 'mongoose';

// Connection
mongoose.connect(process.env.MONGODB_URI);

// Define model
const User = mongoose.model('User', userSchema);
```

### PostgreSQL (Coming Soon)

Using Prisma ORM:

```bash
npx bootnode my-api --template api --database postgresql
```

---

## Docker Support

Each template includes Docker files:

```bash
# Build image
docker build -t my-api .

# Run container
docker run -p 3000:3000 my-api
```

Or use docker-compose:

```bash
docker-compose up -d
```

---

## Testing

Each template includes Jest tests:

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

---

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.MD).

---

## License

BootNode is open-source software licensed under the [MIT license](LICENSE).

---

## Support

- 📖 [Documentation](https://bootnode.dev/docs)
- 💬 [Discord](https://discord.gg/bootnode)
- 🐛 [Issue Tracker](https://github.com/bootnode/bootnode/issues)

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://github.com/Moses-main">Moses Sunday</a></strong>
</p>
