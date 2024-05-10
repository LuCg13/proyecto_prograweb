// index.js

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./models/index");
const routes = require("./src/routes/routes");

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar solicitudes con cuerpo JSON
app.use(bodyParser.json());

// Usar las rutas definidas en routes.js
app.use("/", routes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Sincronizar la base de datos y luego iniciar el servidor
db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synced");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to the database:", err));
