const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "📚",
    },

    category: {
      type: String,
      enum: ["Study", "Learning", "Health", "Mindset"],
      default: "Study",
    },

    streak: {
      type: Number,
      default: 0,
    },

    history: {
      type: [Boolean],
      default: () => Array(21).fill(false),
    },

    completedToday: {
      type: Boolean,
      default: false,
    },

    // NEW
    lastCompletedDate: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);