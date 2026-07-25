import "../styles/Analytics.css";

import AnalyticsCards from "../components/AnalyticsCards";
import DailyStudyChart from "../components/DailyStudyChart";
import MonthlyChart from "../components/MonthlyChart";
import PerformanceRadar from "../components/PerformanceRadar";
import SubjectBreakdown from "../components/SubjectBreakdown";

import { useTasks } from "../context/TaskContext";
import { useHabits } from "../context/HabitContext";
import { useCalendar } from "../context/CalendarContext";

function Analytics() {

  const { tasks } = useTasks();

  const { habits } = useHabits();

  const { events } = useCalendar();

  const analytics = {

    totalTasks: tasks.length,

    completedTasks: tasks.filter(
      task => task.completed
    ).length,

    pendingTasks: tasks.filter(
      task => !task.completed
    ).length,

    totalHabits: habits.length,

    bestStreak:
      habits.length === 0
        ? 0
        : Math.max(...habits.map(h => h.streak)),

    totalEvents: events.length,

  };

  return (

    <div className="analytics">

      <div className="analytics-header">

        <h1>Analytics</h1>

        <p>Understand your study patterns and improve</p>

      </div>

      <AnalyticsCards
        analytics={analytics}
        tasks={tasks}
        habits={habits}
      />

      <div className="analytics-row">

        <DailyStudyChart tasks={tasks} />

        <MonthlyChart tasks={tasks} />

      </div>

      <div className="analytics-row">

        <PerformanceRadar
          tasks={tasks}
          habits={habits}
        />

        <SubjectBreakdown
          tasks={tasks}
        />

      </div>

    </div>

  );

}

export default Analytics;