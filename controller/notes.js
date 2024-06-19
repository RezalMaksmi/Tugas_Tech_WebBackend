import { query } from "../database/db.js";

const getNotes = async (req, res) => {
  try {
    const notes = await query(`SELECT * FROM notes`);
    return res.status(200).json({ data: { notes } });
  } catch (error) {
    console.error(error);
    return res.json({ message: "server error" });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(`SELECT * FROM notes WHERE notes.id = ?`, [id]);
    if (result.length === 0)
      return res.status(404).json({ message: "note not found" });
    const note = result[0];
    return res.status(200).json({ data: { note } });
  } catch (error) {
    console.error(error);
    return res.json({ message: "server error" });
  }
};

const createNote = async (req, res) => {
  const { title, datetime, note } = req.body;
  try {
    const result = await query(
      `INSERT INTO notes(title, datetime, note) VALUES(?,?,?)`,
      [title, datetime, note]
    );
    return res.status(200).json({ data: { note: { id: result.insertId } } });
  } catch (error) {
    console.error(error);
    return res.json({ message: "server error" });
  }
};

const updateNoteById = async (req, res) => {
  const { title, datetime, note } = req.body;
  const { id } = req.params;
  try {
    const result = await query(
      `UPDATE notes SET title=?, datetime=?, note=? WHERE notes.id = ?`,
      [title, datetime, note, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "note tidak ditemukan" });

    return res.status(200).json({ messsage: "success update note" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "server error" });
  }
};

const deleteNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(`DELETE FROM notes WHERE notes.id = ?`, [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "note tidak ditemukan" });
    return res.status(200).json({ message: "sucess delete note" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "server error" });
  }
};

export { getNotes, getNoteById, createNote, updateNoteById, deleteNoteById };
