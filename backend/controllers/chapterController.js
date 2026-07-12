const Chapter = require("../models/Chapter");

// Create Chapter
const createChapter = async (req, res) => {
  try {
    const { name, subject } = req.body;

    const chapter = await Chapter.create({
      name,
      subject,
      user: req.user.id,
    });

    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Chapters
const getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({
      user: req.user.id,
    }).populate("subject", "name");

    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Chapter
const updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!chapter) {
      return res.status(404).json({
        message: "Chapter not found",
      });
    }

    chapter.name = req.body.name || chapter.name;

    const updatedChapter = await chapter.save();

    res.status(200).json(updatedChapter);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Chapter
const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!chapter) {
      return res.status(404).json({
        message: "Chapter not found",
      });
    }

    await chapter.deleteOne();

    res.status(200).json({
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createChapter,
  getChapters,
  updateChapter,
  deleteChapter,
};