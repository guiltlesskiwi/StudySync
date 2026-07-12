import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import "../styles/planner.css";
import TaskCard from "../components/TaskCard";

function Planner() {
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
  } = useTasks();

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    priority: "Medium",
  });

  const today = new Date().toISOString().split("T")[0];

  const todaysTasks = tasks.filter(
    (task) => task.date === today
  );

  const upcomingTasks = tasks.filter(
    (task) => task.date > today
  );

  const resetForm = () => {
    setNewTask({
      title: "",
      subject: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      priority: "Medium",
    });

    setEditingTask(null);
  };

  // ==========================
  // Save Task
  // ==========================
  const handleSaveTask = async () => {
    if (
      !newTask.title ||
      !newTask.subject ||
      !newTask.date ||
      !newTask.time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (editingTask) {
        await editTask({
          ...editingTask,
          ...newTask,
        });

        alert("Task Updated Successfully");
      } else {
        await addTask({
          ...newTask,
          completed: false,
        });

        alert("Task Added Successfully");
      }

      resetForm();
      setShowModal(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // ==========================
  // Edit Task
  // ==========================
  const handleEdit = (task) => {
    setEditingTask(task);

    setNewTask({
      title: task.title,
      subject: task.subject,
      description: task.description,
      date: task.date,
      time: task.time,
      duration: task.duration,
      priority: task.priority,
    });

    setShowModal(true);
  };

  return (
    <div className="planner">
      <div className="planner-header">
        <div>
          <p className="planner-subtitle">
            Organize your day
          </p>

          <h1>Study Planner</h1>
        </div>

        <button
          className="planner-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Task
        </button>
      </div>

      <div className="planner-grid">
        <div>

          {/* Today's Tasks */}

          <div className="planner-section">
            <h2>Today's Tasks</h2>

            {todaysTasks.length === 0 ? (
              <p>No tasks for today.</p>
            ) : (
              todaysTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  title={task.title}
                  time={`${task.time} • ${task.duration} hrs`}
                  priority={task.priority}
                  completed={task.completed}
                  onToggle={() => toggleTask(task._id)}
                  onDelete={() => deleteTask(task._id)}
                  onEdit={() => handleEdit(task)}
                />
              ))
            )}
          </div>

          {/* Upcoming Tasks */}

          <div className="planner-section">
            <h2>Upcoming Tasks</h2>

            {upcomingTasks.length === 0 ? (
              <p>No upcoming tasks.</p>
            ) : (
              upcomingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  title={task.title}
                  time={`${task.date} • ${task.time}`}
                  priority={task.priority}
                  completed={task.completed}
                  onToggle={() => toggleTask(task._id)}
                  onDelete={() => deleteTask(task._id)}
                  onEdit={() => handleEdit(task)}
                />
              ))
            )}
          </div>

        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="modal-overlay">
          <div className="event-modal">

            <h2>
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>

            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  title: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Subject"
              value={newTask.subject}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  subject: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  description: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={newTask.date}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  date: e.target.value,
                })
              }
            />

            <input
              type="time"
              value={newTask.time}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  time: e.target.value,
                })
              }
            />

            <input
              type="number"
              min="0.5"
              step="0.5"
              placeholder="Study Hours"
              value={newTask.duration}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  duration: e.target.value,
                })
              }
            />

            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  priority: e.target.value,
                })
              }
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSaveTask}
              >
                {editingTask
                  ? "Update Task"
                  : "Save Task"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Planner;