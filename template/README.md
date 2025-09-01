

# Backstrap

This project was generated using **Backstrap** 🚀 — a CLI tool to quickly scaffold an Express + MongoDB backend, just like `create-react-app` but for backend projects.

---

## 📂 Project Structure

```
src/
├── config/         # Database connection setup
│   └── db.js
├── controllers/    # Business logic for each route
│   └── user.controller.js
├── models/         # MongoDB models (Mongoose schemas)
│   └── user.model.js
├── routes/         # API routes
│   └── user.routes.js
├── app.js          # Express app configuration
└── server.js       # Application entry point
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
```

### 3. Run the development server

```bash
npm run dev
```

The server will start at [http://localhost:5000](http://localhost:5000).

---

## 📌 Example API Endpoints

### Get all users

```http
GET /api/users
```

### Create a user

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 🛠 Available Scripts

* **`npm run dev`** → Run the server in development mode (with nodemon).
* **`npm start`** → Run the server in production mode.

---

## ✅ Features

* Express.js (REST API boilerplate)
* MongoDB with Mongoose
* Example User CRUD routes
* Environment configuration with `.env`
* Project structure ready for scaling

---

## 📜 License

This project is licensed under the MIT License.

---

> ℹ️ This project was generated using [Backstrap](https://github.com/yourusername/backstrap)
