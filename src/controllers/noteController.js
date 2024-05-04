const { Note } = require("../models");

async function getNotes(req, res) {
  try {
    // Recuperar las notas del usuario autenticado
    const notes = await Note.findAll({ where: { userId: req.user.id }, order: [["createdAt", "DESC"]] });
    res.json({ notes });
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    res.status(500).json({ error: "Error al obtener las notas del usuario" });
  }
}

async function createNote(req, res) {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    // Crear una nueva nota en la base de datos
    const newNote = await Note.create({ title, content, userId });
    res.status(201).json({ note: newNote });
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).json({ error: "Error al crear la nota" });
  }
}

async function deleteNote(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Buscar la nota por su ID y el ID del usuario
    const note = await Note.findOne({ where: { id, userId } });

    // Verificar si la nota existe
    if (!note) {
      return res.status(404).json({ error: "La nota no existe" });
    }

    // Eliminar la nota de la base de datos
    await note.destroy();

    res.status(200).json({ message: "Nota eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    res.status(500).json({ error: "Error al eliminar la nota" });
  }
}

module.exports = { getNotes, createNote, deleteNote };
