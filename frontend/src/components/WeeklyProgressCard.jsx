import { useTasks } from "../context/TaskContext";

function WeeklyProgressCard() {
  const { tasks } = useTasks();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Initialize all days with 0 hours
  const weeklyData = days.map((day) => ({
    day,
    hours: 0,
  }));

  // Calculate study hours from tasks
  tasks.forEach((task) => {
    if (!task.date || !task.duration) return;

    const date = new Date(task.date);
    const dayIndex = date.getDay();

    // Extract first number from duration
    const hour = parseFloat(task.duration);

    if (!isNaN(hour)) {
      weeklyData[dayIndex].hours += hour;
    }
  });

  // Highest hours (avoid division by zero)
  const maxHours = Math.max(...weeklyData.map((d) => d.hours), 1);

  return (
    <div className="progress-card">
      <div className="card-title">
        <h2>Weekly Progress</h2>
        <p>Study Hours</p>
      </div>

      <div className="chart">
        {weeklyData.map((item) => (
          <div className="bar-box" key={item.day}>
            <div
              className="bar"
              style={{
                height: `${(item.hours / maxHours) * 100}%`,
              }}
            ></div>

            <span>{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyProgressCard;