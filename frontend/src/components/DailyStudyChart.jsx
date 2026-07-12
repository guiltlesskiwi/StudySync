import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "../styles/DailyStudyChart.css";

function DailyStudyChart({ tasks }) {

  // Days of the week
  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  // Initialize data with 0 hours
  const chartData = weekDays.map((day) => ({
    day,
    hours: 0,
    target: 5,
  }));

  // Add study hours from tasks
tasks.forEach((task) => {
  if (!task.date || !task.duration) return;

  const date = new Date(task.date);
  const dayIndex = date.getDay();

  let duration = String(task.duration).toLowerCase();
  let hours = parseFloat(duration);

  if (isNaN(hours)) return;

  // Convert minutes to hours
  if (duration.includes("min")) {
    hours = hours / 60;
  }

  chartData[dayIndex].hours += hours;
});

  return (
    <div className="daily-chart-card">

      <h3>Daily Study Hours</h3>

      <ResponsiveContainer width="100%" height={280}>

        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#3a4265"
          />

          <XAxis
            dataKey="day"
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

          {/* Daily Goal */}

          <Line
            type="monotone"
            dataKey="target"
            stroke="#8b90a9"
            strokeDasharray="6 6"
            dot={false}
          />

          {/* Actual Study Hours */}

          <Line
            type="monotone"
            dataKey="hours"
            stroke="#d88cff"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#ffffff",
              stroke: "#d88cff",
              strokeWidth: 3,
            }}
            activeDot={{
              r: 7,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default DailyStudyChart;