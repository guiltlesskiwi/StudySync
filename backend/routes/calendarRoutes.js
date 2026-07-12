const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/calendarController");

const protect = require("../middleware/authMiddleware");

// All Calendar Routes are Protected
router.post("/", protect, createEvent);
router.get("/", protect, getEvents);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;