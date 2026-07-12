const Topic = require("../models/Topic");

// Create Topic
const createTopic = async (req, res) => {
  try {
    const { name, chapter } = req.body;

    const topic = await Topic.create({
      name,
      chapter,
      user: req.user.id,
    });

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({
      user: req.user.id,
    }).populate("chapter", "name");

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Topic
const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Topic
const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    res.status(200).json({
      message: "Topic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTopic,
  getTopics,
  updateTopic,
  deleteTopic,
};