const Task = require("../models/Task");
const Habit = require("../models/Habit");
const Calendar = require("../models/Calendar");

// ======================
// Dashboard Analytics
// ======================
const getAnalytics = async (req, res) => {
  try {
    // Tasks
    const totalTasks = await Task.countDocuments({
      user: req.user.id,
    });

    const completedTasks = await Task.countDocuments({
      user: req.user.id,
      completed: true,
    });

    const pendingTasks = totalTasks - completedTasks;

    // Habits
    const habits = await Habit.find({
      user: req.user.id,
    });

    const totalHabits = habits.length;

    const bestStreak =
      habits.length > 0
        ? Math.max(...habits.map((h) => h.streak))
        : 0;

    // Calendar
    const totalEvents = await Calendar.countDocuments({
      user: req.user.id,
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,

      totalHabits,
      bestStreak,

      totalEvents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};