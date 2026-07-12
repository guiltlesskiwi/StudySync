import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

import "../styles/habits.css";

function HabitCard({ habit }) {
  const { toggleHabit } = useContext(HabitContext);

  const {
    _id,
    icon,
    title,
    category,
    streak,
    history = [],
    completedToday,
  } = habit;

  const completedDays = history.filter(Boolean).length;

  const progress =
    history.length > 0
      ? Math.round((completedDays / history.length) * 100)
      : 0;

  return (
    <div className="habit-card">
      <div className="habit-top">
        <div className="habit-left">
          <div className="habit-icon">{icon}</div>

          <div>
            <h3>{title}</h3>

            <p>
              🔥 {streak} day streak • {category}
            </p>
          </div>
        </div>

        <button
          className="mark-btn"
          onClick={() => toggleHabit(_id)}
          disabled={completedToday}
        >
          {completedToday ? "Completed Today" : "Mark Done"}
        </button>
      </div>

      <div className="habit-progress-info">
        <span>{completedDays}/21 days</span>

        <span>{progress}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <p className="history-title">
        21-Day History
      </p>

      <div className="history-grid">
        {history.map((done, index) => (
          <div
            key={index}
            className={`history-box ${done ? "done" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HabitCard;