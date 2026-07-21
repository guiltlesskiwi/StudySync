import "../styles/dashboard.css";
import StatCard from "../components/StatCard";
import StudyPlanCard from "../components/StudyPlanCard";
import WeeklyProgressCard from "../components/WeeklyProgressCard";
import UpcomingCard from "../components/UpcomingCard";
import RecentNotesCard from "../components/RecentNotesCard";
import PomodoroCard from "../components/PomodoroCard";
import SubjectProgressCard from "../components/SubjectProgressCard";
import ReminderCard from "../components/ReminderCard";

import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();

  const { tasks } = useTasks();
  const { currentUser } = useAuth();

  // ==========================
  // Today's Date
  // ==========================

  const today = new Date().toISOString().split("T")[0];

  // ==========================
  // Today's Tasks
  // ==========================

  const todaysTasks = tasks.filter(
    (task) => task.date === today
  );

  // ==========================
  // Upcoming Tasks
  // ==========================

  const upcomingTasks = tasks.filter(
    (task) => task.date > today
  );

  // ==========================
  // Dashboard Stats
  // ==========================

  const totalTasks = todaysTasks.length;

  const completedTasks = todaysTasks.filter(
    (task) => task.completed
  ).length;

  const focusScore =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Temporary Streak
  const streak = completedTasks;

  // Today's Subjects
  const subjects = new Set(
    todaysTasks.map((task) => task.subject)
  ).size;

  // ==========================
  // Total Study Hours
  // ==========================

  let totalHours = 0;

  todaysTasks.forEach((task) => {
    if (!task.duration) return;

    const num = parseFloat(task.duration);

    if (isNaN(num)) return;

    if (
      String(task.duration)
        .toLowerCase()
        .includes("min")
    ) {
      totalHours += num / 60;
    } else {
      totalHours += num;
    }
  });

  // ==========================
  // Dynamic Greeting
  // ==========================

  const hour = new Date().getHours();

  let greeting = "🌙 Good Evening";

  if (hour >= 5 && hour < 12) {
    greeting = "🌅 Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "☀️ Good Afternoon";
  }

  // ==========================
  // User Initials
  // ==========================

  const initials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <p className="greeting">{greeting}</p>
          <h1>Your Study Dashboard</h1>
        </div>

        <div className="header-right">

          <button
            className="add-btn"
            onClick={() => navigate("/planner")}
          >
            + Add Session
          </button>

          <div className="avatar">
            {initials}
          </div>

        </div>

      </div>

      <div className="stats-grid">

        <StatCard
          icon="📚"
          title="Subjects"
          value={subjects}
        />

        <StatCard
          icon="⏰"
          title="Study Hours"
          value={`${totalHours.toFixed(1)}h`}
        />

        <StatCard
          icon="🔥"
          title="Current Streak"
          value={streak}
        />

        <StatCard
          icon="🎯"
          title="Focus Score"
          value={`${focusScore}%`}
        />

      </div>

      <div className="dashboard-body">

        <StudyPlanCard tasks={todaysTasks} />

        <div className="bottom-grid">

          <WeeklyProgressCard />

          <UpcomingCard tasks={upcomingTasks} />

        </div>

        <div className="bottom-grid">

          <RecentNotesCard />

          <PomodoroCard />

        </div>

        <SubjectProgressCard />

      </div>

      <ReminderCard />

    </div>
  );
}

export default Dashboard;