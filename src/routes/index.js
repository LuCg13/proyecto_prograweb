const express = require("express");
const router = express.Router();
const { verifyToken, invalidateToken } = require("../controllers/authController");
const { getNotes, createNote, deleteNote } = require("../controllers/noteController");
const { createUser, loginUser } = require("../controllers/userController");

// Ruta para crear una nueva cuenta de usuario
router.post("/signup", createUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta para obtener las notas del usuario autenticado
router.get("/notes", verifyToken, getNotes);

// Ruta para crear una nueva nota
router.post("/notes/new", verifyToken, createNote);

// Ruta para eliminar una nota
router.delete("/notes/:id", verifyToken, deleteNote);

// Ruta para cerrar sesión
router.post("/logout", verifyToken, invalidateToken);

module.exports = router;
