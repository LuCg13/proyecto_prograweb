const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController");

// Ruta para registrar un nuevo usuario
router.post("/register", createUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

module.exports = router;
