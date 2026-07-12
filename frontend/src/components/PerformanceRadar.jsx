import "../styles/PerformanceRadar.css";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function PerformanceRadar({ tasks, habits }) {

  // --------------------------
  // Task Statistics
  // --------------------------

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const focus =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // --------------------------
  // Total Study Hours
  // --------------------------

const totalHours = tasks.reduce((sum, task) => {
  if (!task.duration) return sum;

  let duration = String(task.duration).toLowerCase();
  let hrs = parseFloat(duration);

  if (isNaN(hrs)) return sum;

  if (duration.includes("min")) {
    hrs /= 60;
  }

  return sum + hrs;
}, 0);

  // --------------------------
  // Habit Statistics
  // --------------------------

  const completedHabits = habits.filter(
    habit => habit.completedToday
  ).length;

  const habitRate =
    habits.length === 0
      ? 0
      : Math.round(
          (completedHabits / habits.length) * 100
        );

  const bestStreak =
    habits.length === 0
      ? 0
      : Math.max(
          ...habits.map(habit => habit.streak)
        );

  // --------------------------
  // Productivity Scores
  // --------------------------

  const productivity = Math.min(
    totalTasks * 10,
    100
  );

  const speed = Math.min(
    completedTasks * 10,
    100
  );

  const revision = Math.min(
    totalHours * 10,
    100
  );

  const consistency = Math.min(
    bestStreak * 5,
    100
  );

  // --------------------------
  // Radar Data
  // --------------------------

  const data = [
    {
      subject: "Focus",
      score: focus,
    },
    {
      subject: "Speed",
      score: speed,
    },
    {
      subject: "Accuracy",
      score: habitRate,
    },
    {
      subject: "Consistency",
      score: consistency,
    },
    {
      subject: "Revision",
      score: revision,
    },
    {
      subject: "Productivity",
      score: productivity,
    },
  ];

  return (
    <div className="performance-radar-card">

      <h3>Performance Radar</h3>

      <div className="radar-container">

        <ResponsiveContainer width="100%" height={320}>

          <RadarChart data={data}>

            <PolarGrid stroke="#5b5f8f" />

            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "#d7d7f8",
                fontSize: 13,
              }}
            />

            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{
                fill: "#8d92c4",
                fontSize: 11,
              }}
            />

            <Radar
              dataKey="score"
              stroke="#c77dff"
              fill="#c77dff"
              fillOpacity={0.55}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PerformanceRadar;