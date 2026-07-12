const Calendar = require("../models/Calendar");

// ==========================
// Create Event
// ==========================
const createEvent = async (req, res) => {
  try {
    const {
      title,
      subject,
      description,
      date,
      startTime,
      endTime,
      color,
    } = req.body;

    const event = await Calendar.create({
      title,
      subject,
      description,
      date,
      startTime,
      endTime,
      color,
      user: req.user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Events
// ==========================
const getEvents = async (req, res) => {
  try {
    const events = await Calendar.find({
      user: req.user.id,
    }).sort({
      date: 1,
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Event
// ==========================
const updateEvent = async (req, res) => {
  try {
    const event = await Calendar.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.title = req.body.title ?? event.title;
    event.subject = req.body.subject ?? event.subject;
    event.description = req.body.description ?? event.description;
    event.date = req.body.date ?? event.date;
    event.startTime = req.body.startTime ?? event.startTime;
    event.endTime = req.body.endTime ?? event.endTime;
    event.color = req.body.color ?? event.color;

    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Event
// ==========================
const deleteEvent = async (req, res) => {
  try {
    const event = await Calendar.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};