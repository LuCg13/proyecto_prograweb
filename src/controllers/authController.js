// src/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models"); // Importamos el modelo de usuario

// Clave secreta para firmar el token JWT
const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

// Función para generar un token JWT
function generateToken(user) {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" }); // Expira en 1 hora
}

// Middleware para autenticar al usuario
async function authenticateUser(req, res, next) {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { username } });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar el token JWT
    const token = generateToken({ id: user.id, username: user.username });

    // Almacenar el token en la información del usuario
    req.user = { id: user.id, username: user.username, token };

    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    res.status(500).json({ error: "Error de autenticación del usuario" });
  }
}

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  // Obtener el token del encabezado de autorización
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token de autenticación no proporcionado" });
  }

  // Verificar el token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token de autenticación inválido" });
    }
    req.user = decoded.user;
    next();
  });
}

module.exports = { authenticateUser, verifyToken };
