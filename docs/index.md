---
layout: home

hero:
  name: "bootnode"
  text: "Express + MongoDB CLI Generator"
  tagline: "A simple CLI tool to bootstrap Express + MongoDB backend projects with sensible defaults"
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/Moses-main/bootnode

features:
  - title: 🚀 Quick Setup
    details: Generate a production-ready backend in seconds with sensible defaults
  - title: 🛡 Built-in Validation
    details: Input validation using express-validator out of the box
  - title: 📝 API Documentation
    details: Interactive Swagger UI for testing your endpoints
  - title: ⚡ Rate Limiting
    details: Protect your API from abuse with configurable rate limits
  - title: 🔄 Soft Delete
    details: Built-in soft delete functionality for data safety
  - title: 🧪 Production Ready
    details: Error handling, pagination, and search all included
---

## Quick Start

```bash
# Create a new project
npx bootnode my-backend

# Navigate to project
cd my-backend

# Start the server
npm run dev
```

Your API will be available at `http://localhost:5000` with Swagger docs at `http://localhost:5000/api-docs`
