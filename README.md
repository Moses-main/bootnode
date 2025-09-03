# Bootnode 🚀

A simple CLI tool to bootstrap Express + MongoDB backend projects with sensible defaults, just like create-react-app but for backend.

## Features

- 🚀 Quick setup of a production-ready Express.js backend
- 🍃 MongoDB integration with Mongoose
- 🔐 JWT Authentication ready
- 🛣️ RESTful API structure
- 🔄 Environment variables support
- 📦 Dependency management with npm

## Quick Start

### Prerequisites

- Node.js 14.x or later
- npm 6.x or later
- MongoDB (local or cloud instance)

### Installation

You can use bootnode directly with npx:

```bash
npx bootnode my-backend
```

This will create a new directory called `my-backend` with a complete backend structure.

### Getting Started

1. Navigate to your project directory:

   ```bash
   cd my-backend
   ```

2. Copy the example environment file and update with your configuration:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:3000` by default.

## Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm start` - Start the production server
- `npm test` - Run tests (coming soon)
- `npm run lint` - Lint your code

## Project Structure

- `src/config` - Configuration files (database, auth, etc.)
- `src/controllers` - Route controllers
- `src/models` - Database models
- `src/routes` - API route definitions


## Environment Variables

The following environment variables can be set in the `.env` file:

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `NODE_ENV` - Application environment (development/production)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
