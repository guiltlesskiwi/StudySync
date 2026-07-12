const Habit = require("../models/Habit");

// ======================
// Create Habit
// ======================
const createHabit = async (req, res) => {
  try {
    const { title, icon, category } = req.body;

    const habit = await Habit.create({
      title,
      icon,
      category,
      streak: 0,
      history: Array(21).fill(false),
      completedToday: false,
      user: req.user.id,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Get Habits
// ======================
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(habits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Update Habit
// ======================
const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    Object.assign(habit, req.body);

    const updatedHabit = await habit.save();

    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Delete Habit
// ======================
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    await habit.deleteOne();

    res.json({
      message: "Habit Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
};