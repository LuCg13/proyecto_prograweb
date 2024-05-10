const Note = require("../models/notes");
const { verifyToken } = require("./authController");

// Obtener todas las notas del usuario autenticado
async function getNotes(req, res) {
  try {
    // Obtener el usuario autenticado desde req.user
    const user = req.user.user; // Acceder correctamente al usuario autenticado

    // Lógica para obtener las notas del usuario
    const userNotes = await Note.findAll({ where: { userId: user.id } });

    res.status(200).json(userNotes);
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    res.status(500).json({ error: "Error al obtener las notas del usuario" });
  }
}

// Crear una nueva nota
async function createNote(req, res) {
  try {
    // Obtener el usuario autenticado desde req.user
    const user = req.user.id; // Acceder correctamente al usuario autenticado
    // Lógica para crear una nueva nota
    const { title, content } = req.body;
    const newNote = await Note.create({ title, content, userId: user.id });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).json({ error: "Error al crear la nota" });
  }
}

// Eliminar una nota existente
async function deleteNote(req, res) {
  try {
    // Lógica para eliminar una nota
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    res.status(500).json({ error: "Error al eliminar la nota" });
  }
}

module.exports = { getNotes, createNote, deleteNote };
