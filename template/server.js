// Import the Express app configuration from app.js
import app from "../template/src/app.js";

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
