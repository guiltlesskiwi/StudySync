const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

// Create & Get
router.post("/", protect, createNote);
router.get("/", protect, getNotes);

// Update & Delete
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;