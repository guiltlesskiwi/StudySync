import "../styles/planner.css";

function TaskCard({
  title,
  time,
  priority,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div className={`task-card ${completed ? "completed" : ""}`}>

      <div className="task-left">

        <button
          className="task-status"
          onClick={onToggle}
        >
          {completed ? "✔" : "○"}
        </button>

        <div className="task-info">

          <h3>{title}</h3>

          <p>{time}</p>

        </div>

      </div>

      <div className="task-right">

        <span
          className={`priority ${priority.toLowerCase()}`}
        >
          {priority}
        </span>

        <div className="task-actions">

          <button
            className="edit-task-btn"
            onClick={onEdit}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-task-btn"
            onClick={onDelete}
          >
            🗑 Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskCard;