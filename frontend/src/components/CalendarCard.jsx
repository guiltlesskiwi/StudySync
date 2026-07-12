import { useContext, useState } from "react";
import { CalendarContext } from "../context/CalendarContext";

import "../styles/planner.css";

function CalendarCard() {
  const { events, addEvent, deleteEvent } =
    useContext(CalendarContext);

  const [selectedDate, setSelectedDate] = useState(11);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Today's Date
  const today = new Date();
  const todayDate = today.getDate();

  // Days having events
  const eventDays = events.map((event) =>
    new Date(event.date).getDate()
  );

  // Events of selected day
  const selectedEvents = events.filter(
    (event) =>
      new Date(event.date).getDate() === selectedDate
  );

  const handleSave = async () => {
    if (title.trim() === "" || time.trim() === "") {
      alert("Please enter event title and time.");
      return;
    }

    await addEvent({
      title,
      subject: "General",
      description,
      date: `2026-07-${String(selectedDate).padStart(2, "0")}`,
      startTime: time,
      endTime: time,
      color: "#6366F1",
    });

    setTitle("");
    setTime("");
    setDescription("");
    setShowModal(false);
  };

  return (
    <div className="calendar-card">
      <h2>July 2026</h2>

      <div className="calendar-grid">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>

        {days.map((day) => (
          <button
            key={day}
            className={`day
              ${selectedDate === day ? "active-day" : ""}
              ${eventDays.includes(day) ? "event-day" : ""}
              ${todayDate === day ? "today-day" : ""}
            `}
            onClick={() => setSelectedDate(day)}
          >
            {day}

            {eventDays.includes(day) && (
              <span className="event-dot"></span>
            )}
          </button>
        ))}
      </div>

      <div className="selected-date">
        <button
          className="add-event-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Event
        </button>

        <h3>📅 July {selectedDate}</h3>

        {selectedEvents.length > 0 ? (
          selectedEvents.map((event) => (
            <div
              className="event-item"
              key={event._id}
            >
              <h4>{event.title}</h4>

              <p>
                {event.startTime} - {event.endTime}
              </p>

              {event.description && (
                <small>{event.description}</small>
              )}

              <button
                className="delete-event-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      "Delete this event?"
                    )
                  ) {
                    deleteEvent(event._id);
                  }
                }}
              >
                🗑 Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-events">
            No events for this day.
          </p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="event-modal">
            <h2>Add Event</h2>

            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <input
              type="time"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarCard;