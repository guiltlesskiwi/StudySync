import "../styles/Analytics.css";

import AnalyticsCards from "../components/AnalyticsCards";
import DailyStudyChart from "../components/DailyStudyChart";
import MonthlyChart from "../components/MonthlyChart";
import PerformanceRadar from "../components/PerformanceRadar";
import SubjectBreakdown from "../components/SubjectBreakdown";

import { useTasks } from "../context/TaskContext";
import { useHabits } from "../context/HabitContext";
import { useAnalytics } from "../context/AnalyticsContext";

function Analytics() {
  const { tasks } = useTasks();
  const { habits } = useHabits();

  // Analytics from backend
  const { analytics } = useAnalytics();

  return (
    <div className="analytics">
      {/* Header */}
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Understand your study patterns and improve</p>
      </div>

      {/* Statistics Cards */}
      <AnalyticsCards
        analytics={analytics}
        tasks={tasks}
        habits={habits}
      />

      {/* Charts */}
      <div className="analytics-row">
        <DailyStudyChart tasks={tasks} />

        <MonthlyChart tasks={tasks} />
      </div>

      <div className="analytics-row">
        <PerformanceRadar
          tasks={tasks}
          habits={habits}
        />

        <SubjectBreakdown tasks={tasks} />
      </div>
    </div>
  );
}

export default Analytics;