// src/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwtSecret = process.env.JWT_SECRET || "jwtsecret"; // Utilizando "jwtsecret" como valor predeterminado

// Función para generar un token JWT
function generateToken(user) {
  const token = jwt.sign({ user }, jwtSecret, { expiresIn: "1h" });
  console.log("Token generado:", token); // Agregar este registro para verificar el token generado
  return token;
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
    console.error("Token de autenticación no proporcionado");
    return res.status(401).json({ error: "Token de autenticación no proporcionado" });
  }

  // Verificar el token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      return res.status(401).json({ error: "Token de autenticación inválido" });
    }
    console.log("Usuario autenticado:", decoded.user); // Agregar este registro para verificar el usuario decodificado
    req.user = decoded.user; // Corregir la asignación del usuario
    next();
  });
}

// Función para invalidar el token JWT
function invalidateToken(req, res) {
  // No es necesario realizar ninguna acción especial aquí, ya que el token se invalidará en el cliente al borrarlo o caducar
  res.status(200).json({ message: "Token invalidado exitosamente" });
}

module.exports = { authenticateUser, verifyToken, invalidateToken };
