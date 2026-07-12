import "../styles/AnalyticsCards.css";

function AnalyticsCards({
  analytics,
  tasks,
  habits,
}) {
  // ---------- Total Study Hours ----------
  const totalHours = tasks.reduce((sum, task) => {
    const duration = parseFloat(task.duration) || 0;
    return sum + duration;
  }, 0);

  // ---------- Average Daily Hours ----------
  const uniqueDates = [
    ...new Set(tasks.map((task) => task.date)),
  ];

  const avgDailyHours =
    uniqueDates.length > 0
      ? (totalHours / uniqueDates.length).toFixed(1)
      : "0.0";

  // ---------- Best Focus Day ----------
  const hoursPerDay = {};

  tasks.forEach((task) => {
    const duration =
      parseFloat(task.duration) || 0;

    if (!hoursPerDay[task.date]) {
      hoursPerDay[task.date] = 0;
    }

    hoursPerDay[task.date] += duration;
  });

  let bestDay = "--";
  let bestHours = 0;

  Object.entries(hoursPerDay).forEach(
    ([date, hours]) => {
      if (hours > bestHours) {
        bestHours = hours;

        bestDay = new Date(
          date
        ).toLocaleDateString("en-US", {
          weekday: "long",
        });
      }
    }
  );

  // ---------- Habit Completion ----------
  const completedHabits = habits.filter(
    (habit) => habit.completedToday
  ).length;

  const habitRate =
    habits.length > 0
      ? Math.round(
          (completedHabits / habits.length) * 100
        )
      : 0;

  return (
    <div className="analytics-cards">
      <div className="analytics-card">
        <p>Total Tasks</p>

        <h2>{analytics.totalTasks}</h2>

        <span>
          {analytics.completedTasks} Completed •{" "}
          {analytics.pendingTasks} Pending
        </span>
      </div>

      <div className="analytics-card">
        <p>Total Habits</p>

        <h2>{analytics.totalHabits}</h2>

        <span>
          🔥 Best Streak{" "}
          {analytics.bestStreak} days
        </span>
      </div>

      <div className="analytics-card">
        <p>Calendar Events</p>

        <h2>{analytics.totalEvents}</h2>

        <span>Upcoming Events</span>
      </div>

      <div className="analytics-card">
        <p>Avg Daily Hours</p>

        <h2>{avgDailyHours}h</h2>

        <span>
          Weekly Total {totalHours.toFixed(1)}h
        </span>
      </div>

      <div className="analytics-card">
        <p>Best Focus Day</p>

        <h2>{bestDay}</h2>

        <span>
          {bestHours.toFixed(1)}h logged
        </span>
      </div>

      <div className="analytics-card">
        <p>Habit Completion</p>

        <h2>{habitRate}%</h2>

        <span>
          {completedHabits}/{habits.length} today
        </span>
      </div>
    </div>
  );
}

export default AnalyticsCards;