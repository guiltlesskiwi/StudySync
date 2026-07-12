const Note = require("../models/Note");

// Create Note
const createNote = async (req, res) => {
  try {
    const { title, content, topic } = req.body;

    const note = await Note.create({
      title,
      content,
      topic,
      user: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    }).populate("topic", "name");

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    note.topic = req.body.topic || note.topic;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};