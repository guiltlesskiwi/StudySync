import { useTasks } from "../context/TaskContext";

function UpcomingCard() {
  const { tasks } = useTasks();

  const today = new Date().toISOString().split("T")[0];

  // Only future tasks
  const upcomingTasks = tasks
    .filter((task) => task.date > today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Convert date into "Tomorrow", "3 Days Left", etc.
  const getRemainingDays = (date) => {
    const todayDate = new Date(today);
    const taskDate = new Date(date);

    const diff = Math.ceil(
      (taskDate - todayDate) / (1000 * 60 * 60 * 24)
    );

    if (diff === 1) return "Tomorrow";
    if (diff === 0) return "Today";
    return `${diff} Days Left`;
  };

  // Badge colors
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <div className="upcoming-card">

      <h2>Upcoming Deadlines</h2>

      {upcomingTasks.length === 0 ? (

        <p className="empty-text">
          No upcoming deadlines.
        </p>

      ) : (

        upcomingTasks.map((task) => (

          <div
            className="deadline"
            key={task.id}
          >

            <div>

              <h4>{task.title}</h4>

              <p>{getRemainingDays(task.date)}</p>

            </div>

            <span
              className={getPriorityClass(task.priority)}
            >
              {task.priority}
            </span>

          </div>

        ))

      )}

    </div>
  );
}

export default UpcomingCard;