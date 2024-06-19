import { Router } from "express";
import {
  createNote,
  deleteNoteById,
  getNoteById,
  getNotes,
  updateNoteById,
} from "../controller/notes.js";

const router = Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNoteById);
router.delete("/:id", deleteNoteById);

export default router;
