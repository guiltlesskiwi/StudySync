import "../styles/StudyPlanCard.css";

function StudyPlanCard({ tasks }) {
  const today = new Date().toISOString().split("T")[0];

  // Today's Tasks
  const todaysTasks = tasks.filter(
    (task) => task.date === today
  );

  const completedTasks = todaysTasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="study-card">
      <div className="study-header">
        <h2>Today's Study Plan</h2>

        <p>
          {completedTasks} / {todaysTasks.length} Completed
        </p>
      </div>

      {todaysTasks.length === 0 ? (
        <p className="empty-text">
          No study sessions scheduled for today.
        </p>
      ) : (
        todaysTasks.map((task) => (
          <div
            key={task._id}
            className={`study-item ${
              task.completed ? "completed" : ""
            }`}
          >
            <div>
              <h3>{task.title}</h3>

              <span>
                {task.time} • {task.duration}
              </span>
            </div>

            <div className="study-status">
              {task.completed ? "✔" : "○"}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default StudyPlanCard;