import { useContext, useState } from "react";
import "../styles/habits.css";

import HabitCard from "../components/HabitCard";
import { HabitContext } from "../context/HabitContext";

function Habits() {
  const { habits, addHabit } = useContext(HabitContext);

  const [showModal, setShowModal] = useState(false);

  const [newHabit, setNewHabit] = useState({
    title: "",
    category: "Study",
    icon: "📚",
  });

  // ======================
  // Statistics
  // ======================

  const bestStreak =
    habits.length > 0
      ? Math.max(...habits.map((habit) => Number(habit.streak)))
      : 0;

  const totalCompleted = habits.reduce(
    (total, habit) =>
      total + (habit.history || []).filter(Boolean).length,
    0
  );

  const totalBoxes = habits.length * 21;

  const completionRate =
    totalBoxes === 0
      ? 0
      : Math.round((totalCompleted / totalBoxes) * 100);

  // ======================
  // Save Habit
  // ======================

  const handleSaveHabit = async () => {
    if (newHabit.title.trim() === "") {
      alert("Please enter a habit name.");
      return;
    }

    await addHabit(newHabit);

    setNewHabit({
      title: "",
      category: "Study",
      icon: "📚",
    });

    setShowModal(false);
  };

  return (
    <div className="habits">
      {/* Header */}

      <div className="habits-header">
        <div>
          <p className="habits-subtitle">
            Build consistency every day
          </p>

          <h1>Habit Tracker</h1>
        </div>

        <button
          className="habit-btn"
          onClick={() => setShowModal(true)}
        >
          + New Habit
        </button>
      </div>

      {/* Statistics */}

      <div className="habit-stats">
        <div className="habit-stat-card">
          <h2>🔥 {bestStreak}</h2>
          <p>Best Streak</p>
        </div>

        <div className="habit-stat-card">
          <h2>{completionRate}%</h2>
          <p>Completion Rate</p>
        </div>

        <div className="habit-stat-card">
          <h2>{habits.length}</h2>
          <p>Active Habits</p>
        </div>
      </div>

      {/* Filters */}

      <div className="habit-filters">
        <button className="active-filter">
          All
        </button>

        <button>Study</button>

        <button>Health</button>

        <button>Learning</button>

        <button>Mindset</button>
      </div>

      {/* Habit Cards */}

      <div className="habits-list">
        {habits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
          />
        ))}
      </div>

      {/* Modal */}

      {showModal && (
        <div className="modal-overlay">
          <div className="event-modal">
            <h2>Add New Habit</h2>

            <input
              type="text"
              placeholder="Habit Name"
              value={newHabit.title}
              onChange={(e) =>
                setNewHabit({
                  ...newHabit,
                  title: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Emoji (📚 🏃 💧)"
              value={newHabit.icon}
              onChange={(e) =>
                setNewHabit({
                  ...newHabit,
                  icon: e.target.value,
                })
              }
            />

            <select
              value={newHabit.category}
              onChange={(e) =>
                setNewHabit({
                  ...newHabit,
                  category: e.target.value,
                })
              }
            >
              <option>Study</option>
              <option>Learning</option>
              <option>Health</option>
              <option>Mindset</option>
            </select>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSaveHabit}
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

export default Habits;