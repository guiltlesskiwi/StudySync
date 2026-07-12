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

function Dashboard() {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  // Total Tasks
  const totalTasks = tasks.length;

  // Completed Tasks
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  // Focus Score
  const focusScore =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Current Streak
  const streak = completedTasks;

  // Subjects (temporary)
  const subjects = new Set(tasks.map((task) => task.title)).size;

  // Total Study Hours
  let totalHours = 0;

  tasks.forEach((task) => {
    if (!task.duration) return;

    const num = parseFloat(task.duration);

    if (isNaN(num)) return;

    if (task.duration.toLowerCase().includes("min"))
      totalHours += num / 60;
    else totalHours += num;
  });

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <p className="greeting">👋 Good Morning</p>
          <h1>Your Study Dashboard</h1>
        </div>

        <div className="header-right">

          <button
            className="add-btn"
            onClick={() => navigate("/planner")}
          >
            + Add Session
          </button>

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="avatar"
          />

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

        <StudyPlanCard tasks={tasks} />

        <div className="bottom-grid">

          <WeeklyProgressCard tasks={tasks} />

          <UpcomingCard tasks={tasks} />

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