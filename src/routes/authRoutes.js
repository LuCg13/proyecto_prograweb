const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController");
const { authenticateUser } = require("../controllers/authController");

// Ruta para crear un nuevo usuario
router.post("/register", createUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta protegida para obtener información del usuario autenticado
router.get("/me", authenticateUser, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
