const Subject = require("../models/Subject");

// Create Subject
const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    const subject = await Subject.create({
      name,
      user: req.user.id,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      user: req.user.id,
    });

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Subject
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    subject.name = req.body.name || subject.name;

    const updatedSubject = await subject.save();

    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    await subject.deleteOne();

    res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
};