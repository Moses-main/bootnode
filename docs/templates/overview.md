# Templates Overview

BootNode comes with 8 production-ready templates to jumpstart your project.

## Template Comparison

| Template | Database | Auth | Best For |
|----------|----------|------|----------|
| `blank` | - | ❌ | Minimal Express server |
| `api` | MongoDB | ✅ | REST APIs, mobile backends |
| `blog` | MongoDB | ✅ | Blogs, content sites |
| `cms` | MongoDB | ✅ | Content management systems |
| `lms` | MongoDB | ✅ | Online learning platforms |
| `fintech` | MongoDB | ✅ | Financial applications |
| `ecommerce` | MongoDB | ✅ | Online stores, marketplaces |
| `saas` | MongoDB | ✅ | Multi-tenant SaaS apps |

## Usage

### Interactive Mode

```bash
npx bootnode
```

You'll be prompted to:
1. Enter project name
2. Choose a template
3. Select database (MongoDB/PostgreSQL)
4. Choose package manager
5. Initialize Git

### Command Line Mode

```bash
# Blog API with MongoDB
npx bootnode my-blog --template blog

# E-commerce with PostgreSQL
npx bootnode my-store --template ecommerce --database postgresql

# SaaS with custom options
npx bootnode my-saas --template saas --pm yarn
```

### Available Options

| Option | Description | Values |
|--------|-------------|--------|
| `--template` | Template to use | `blank`, `api`, `blog`, `cms`, `lms`, `fintech`, `ecommerce`, `saas` |
| `--database` | Database driver | `mongodb`, `postgresql` |
| `--pm` | Package manager | `npm`, `yarn`, `pnpm` |
| `--no-git` | Skip Git initialization | - |
| `--no-install` | Skip npm install | - |

## Template Details

### Blank Template

Minimal Express.js server with basic setup.

```bash
npx bootnode my-app --template blank
```

**Features:**
- Basic Express setup
- CORS enabled
- Environment configuration
- Health check endpoint

---

### API Template

Full-featured REST API with authentication.

```bash
npx bootnode my-api --template api
```

**Features:**
- JWT authentication
- User CRUD operations
- Input validation (express-validator)
- Rate limiting
- Error handling
- Swagger documentation

**Endpoints:**
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `POST /api/v1/users`
- `PATCH /api/v1/users/:id`
- `DELETE /api/v1/users/:id`

---

### Blog Template

Complete blog with posts, categories, and comments.

```bash
npx bootnode my-blog --template blog
```

**Features:**
- JWT authentication
- Posts management
- Categories
- Comments with threading
- Search functionality
- Featured posts
- View counting

**Endpoints:**
- `GET /api/v1/posts`
- `GET /api/v1/posts/:slug`
- `POST /api/v1/posts`
- `GET /api/v1/categories`
- `POST /api/v1/posts/:id/comments`

---

### CMS Template

Content Management System with media handling.

```bash
npx bootnode my-cms --template cms
```

**Features:**
- Articles with rich content
- Media library (images, files)
- Categories & tags
- Content scheduling
- SEO optimization
- Draft/Published workflow

---

### LMS Template

Learning Management System.

```bash
npx bootnode my-lms --template lms
```

**Features:**
- Courses & lessons
- Quizzes & assessments
- Student progress tracking
- Certificates
- Enrollments
- Instructor profiles

---

### FinTech Template

Financial technology backend.

```bash
npx bootnode my-fintech --template fintech
```

**Features:**
- Multiple account types (checking, savings, wallet)
- Transactions (deposit, withdrawal, transfer)
- Virtual & physical cards
- Account limits
- Transaction history
- Balance management

---

### E-Commerce Template

Online store backend.

```bash
npx bootnode my-store --template ecommerce
```

**Features:**
- Products & categories
- Shopping cart
- Orders & order items
- Payment integration ready
- Inventory management
- Shipping options

---

### SaaS Template

Multi-tenant SaaS starter.

```bash
npx bootnode my-saas --template saas
```

**Features:**
- Multi-tenancy
- Teams & memberships
- Roles & permissions
- Subscriptions (stripe-ready)
- API keys for developers
- Webhooks

---

## Creating Custom Templates

To create your own template:

1. Copy an existing template:
   ```bash
   cp -r templates/api templates/my-custom
   ```

2. Customize the code

3. Update `package.json` description

4. Test your template:
   ```bash
   npx bootnode test-project --template my-custom
   ```
