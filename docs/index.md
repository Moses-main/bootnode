---
layout: home

hero:
  name: BootNode
  text: Enterprise-Grade Backend Framework
  tagline: Build production-ready backend APIs in minutes with ready-to-use templates
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: Browse Templates
      link: /templates/overview

features:
  - title: ⚡ Instant Setup
    details: Generate a complete backend in seconds with a single command
  - title: 📦 Ready Templates
    details: Choose from 8 pre-built templates - Blog, CMS, LMS, FinTech, E-Commerce, SaaS
  - title: 🔐 Complete Auth
    details: JWT authentication, email verification, password reset out of the box
  - title: 🛡️ Enterprise Features
    details: Rate limiting, input validation, error handling, logging
  - title: 📊 MongoDB & PostgreSQL
    details: Support for both databases with clean ORM patterns
  - title: 📝 Auto API Docs
    details: Interactive Swagger UI documentation
  - title: 🐳 Docker Ready
    details: Dockerfile and docker-compose included
  - title: 🧪 Testing Built-in
    details: Jest setup with in-memory MongoDB
---

## Why BootNode?

Just like Laravel for PHP or Rails for Ruby, BootNode gives you a powerful, convention-based backend framework for Node.js.

### Traditional Approach

```bash
# 1. Create project
mkdir my-backend && cd my-backend

# 2. Initialize npm
npm init -y

# 3. Install dependencies
npm install express mongoose cors dotenv ...

# 4. Create folder structure
mkdir src/models src/controllers src/routes src/middleware

# 5. Write boilerplate...
# (hours later) Finally ready
```

### With BootNode

```bash
npx bootnode my-api --template blog
```

Done! Your Blog API is ready with:
- ✅ User authentication (JWT)
- ✅ Posts, Categories, Comments
- ✅ Pagination & Search
- ✅ Swagger documentation
- ✅ Rate limiting
- ✅ Input validation

## Available Templates

| Template | Use Case | Features |
|----------|----------|----------|
| `blank` | Minimal server | Basic Express setup |
| `api` | REST API | Full CRUD, Auth, Validation |
| `blog` | Blog API | Posts, Categories, Comments |
| `cms` | Content Management | Articles, Media, Categories |
| `lms` | Learning System | Courses, Lessons, Quizzes |
| `fintech` | Finance App | Accounts, Transactions, Cards |
| `ecommerce` | Online Store | Products, Orders, Cart |
| `saas` | SaaS Platform | Multi-tenant, Teams, Subscriptions |

## Quick Start

```bash
# Create a new project with specific template
npx bootnode my-blog --template blog

# Or use interactive mode
npx bootnode

# Start development
cd my-blog
npm run dev
```

Your API is now live at `http://localhost:3000`
