require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importar las rutas de routes.js
const routes = require("./src/routes/routes");

// Usar las rutas de routes.js sin un prefijo
app.use(routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
