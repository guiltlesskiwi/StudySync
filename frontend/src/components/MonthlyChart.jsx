import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "../styles/MonthlyChart.css";

function MonthlyChart({ tasks }) {

  const data = [
    { week: "W1", focus: 0, completed: 0 },
    { week: "W2", focus: 0, completed: 0 },
    { week: "W3", focus: 0, completed: 0 },
    { week: "W4", focus: 0, completed: 0 },
    { week: "W5", focus: 0, completed: 0 },
  ];

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

tasks.forEach((task) => {
  if (!task.date || !task.duration) return;

  const date = new Date(task.date);

  // Current month only
  if (
    date.getMonth() !== currentMonth ||
    date.getFullYear() !== currentYear
  ) {
    return;
  }

  // Week of month (0-4)
  const weekIndex = Math.min(
    Math.floor((date.getDate() - 1) / 7),
    4
  );

  let duration = String(task.duration).toLowerCase();
  let hours = parseFloat(duration);

  if (isNaN(hours)) hours = 0;

  if (duration.includes("min")) {
    hours /= 60;
  }

  data[weekIndex].focus += hours;

  if (task.completed) {
    data[weekIndex].completed += 1;
  }
});

  return (
    <div className="monthly-chart-card">

      <h3>Monthly Breakdown</h3>

      <ResponsiveContainer width="100%" height={280}>

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#3a4265"
          />

          <XAxis
            dataKey="week"
            stroke="#8f95b2"
          />

          <YAxis
            stroke="#8f95b2"
          />

          <Tooltip
            contentStyle={{
              background: "#252b49",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Bar
            dataKey="focus"
            fill="#d88cff"
            radius={[6, 6, 0, 0]}
            name="Study Hours"
          />

          <Bar
            dataKey="completed"
            fill="#8ab4ff"
            radius={[6, 6, 0, 0]}
            name="Completed Tasks"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default MonthlyChart;