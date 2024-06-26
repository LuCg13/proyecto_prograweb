// routes/noteRoutes.js

const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Ruta para obtener las notas del usuario autenticado
router.get("/notes", verifyToken, getNotes);

// Ruta para crear una nueva nota
router.post("/notes/new", verifyToken, createNote);

// Ruta para eliminar una nota
router.delete("/notes/:id", verifyToken, deleteNote);
