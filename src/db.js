const mysql = require("mysql");

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: "192.168.1.96",
  user: "lgomez",
  password: "MySQL2024*",
  database: "PPW",
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión establecida correctamente con la base de datos");
});

module.exports = connection;
