const Task = require("../models/Task");

// ==========================
// Create Task
// ==========================
const createTask = async (req, res) => {
  try {
    const {
      title,
      subject,
      description,
      date,
      time,
      duration,
      priority,
    } = req.body;

    const task = await Task.create({
      title,
      subject,
      description,
      date,
      time,
      duration,
      priority,
      completed: false,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Tasks
// ==========================
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Task
// ==========================
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = req.body.title ?? task.title;
    task.subject = req.body.subject ?? task.subject;
    task.description = req.body.description ?? task.description;
    task.date = req.body.date ?? task.date;
    task.time = req.body.time ?? task.time;
    task.duration = req.body.duration ?? task.duration;
    task.priority = req.body.priority ?? task.priority;

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Task
// ==========================
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};