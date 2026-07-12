import { useState, useEffect } from "react";
import "../styles/ReminderCard.css";

function ReminderCard() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("studyReminders");
    return saved ? JSON.parse(saved) : [];
  });

  // Save reminders
  useEffect(() => {
    localStorage.setItem(
      "studyReminders",
      JSON.stringify(reminders)
    );
  }, [reminders]);

  // Reminder checker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      reminders.forEach((reminder) => {
        // Skip if already announced
        if (reminder.notified) return;

        const reminderDateTime = new Date(
          `${reminder.date}T${reminder.time}`
        );

        if (now >= reminderDateTime) {
          // Speak reminder
          const speech = new SpeechSynthesisUtterance(
            `Reminder! ${reminder.title}`
          );

          speech.rate = 1;
          speech.pitch = 1;
          speech.volume = 1;

          window.speechSynthesis.speak(speech);

          alert(`🔔 Reminder: ${reminder.title}`);

          // Mark as notified
          setReminders((prev) =>
            prev.map((item) =>
              item.id === reminder.id
                ? { ...item, notified: true }
                : item
            )
          );
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = () => {
    if (!title || !date || !time) {
      alert("Please fill all fields.");
      return;
    }

    const newReminder = {
      id: Date.now(),
      title,
      date,
      time,
      notified: false,
    };

    setReminders([...reminders, newReminder]);

    setTitle("");
    setDate("");
    setTime("");
  };

  const deleteReminder = (id) => {
    setReminders(
      reminders.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="reminder-card">
      <h2>Study Reminders</h2>

      <input
        type="text"
        placeholder="Reminder title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={addReminder}>
        Add Reminder
      </button>

      <div className="reminder-list">
        {reminders.length === 0 ? (
          <p className="empty">
            No reminders yet.
          </p>
        ) : (
          reminders.map((item) => (
            <div
              className="reminder-item"
              key={item.id}
            >
              <div>
                <h4>{item.title}</h4>

                <p>📅 {item.date}</p>

                <p>🕒 {item.time}</p>

                {item.notified && (
                  <p style={{ color: "#7CFC90" }}>
                    ✅ Completed
                  </p>
                )}
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteReminder(item.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReminderCard;