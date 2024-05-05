// src/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
