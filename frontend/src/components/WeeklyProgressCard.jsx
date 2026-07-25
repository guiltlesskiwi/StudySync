import { useTasks } from "../context/TaskContext";
import "../styles/WeeklyProgressCard.css";

function WeeklyProgressCard() {
  const { tasks } = useTasks();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyData = days.map((day) => ({
    day,
    hours: 0,
  }));

  tasks.forEach((task) => {
    if (!task.date || !task.duration) return;

    const date = new Date(task.date);
    const dayIndex = date.getDay();

    const hour = parseFloat(task.duration);

    if (!isNaN(hour)) {
      weeklyData[dayIndex].hours += hour;
    }
  });

  const maxHours = Math.max(...weeklyData.map((d) => d.hours), 1);

  return (
    <div className="weekly-progress-card">
      <div className="weekly-card-title">
        <h2>Weekly Progress</h2>
        <p>Study Hours</p>
      </div>

      <div className="weekly-chart">
        {weeklyData.map((item) => (
          <div className="weekly-bar-box" key={item.day}>
            <div
              className="weekly-bar"
              style={{
                height: `${(item.hours / maxHours) * 100}%`,
              }}
            />

            <span>{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyProgressCard;