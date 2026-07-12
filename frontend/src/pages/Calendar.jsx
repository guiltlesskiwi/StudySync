import CalendarCard from "../components/CalendarCard";
import "../styles/planner.css";

function Calendar() {
  return (
    <div className="planner">
      <div className="planner-header">
        <div>
          <p className="planner-subtitle">
            Manage your schedule
          </p>

          <h1>Calendar</h1>
        </div>
      </div>

      <CalendarCard />
    </div>
  );
}

export default Calendar;