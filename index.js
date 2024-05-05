require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/config/database");
const User = require("./src/models/user");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importar las rutas de routes.js
const routes = require("./src/routes/routes");

// Usar las rutas de routes.js sin un prefijo
app.use(routes);

// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
sequelize.sync();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
