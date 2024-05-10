// src/controllers/userController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "jwtsecret"; // Utilizando "jwtsecret" como valor predeterminado

// Función para registrar un nuevo usuario
async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos con la contraseña hasheada
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generar el token JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, jwtSecret, { expiresIn: "1h" });

    res.status(201).json({ message: "Usuario registrado exitosamente", token });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
}

// Función para iniciar sesión
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    console.log("Usuario encontrado:", user); // Agregar este mensaje de registro

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Contraseña ingresada:", password); // Agregar este mensaje de registro
    console.log("Contraseña almacenada:", user.password); // Agregar este mensaje de registro
    console.log("Coinciden las contraseñas:", passwordMatch); // Agregar este mensaje de registro

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
}

module.exports = { createUser, loginUser };
