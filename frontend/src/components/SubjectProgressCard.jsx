import "../styles/SubjectProgressCard.css";
import { useTasks } from "../context/TaskContext";

function SubjectProgressCard() {
  const { tasks } = useTasks();

  // Group tasks by subject
  const subjectStats = {};

  tasks.forEach((task) => {
    if (!task.subject) return;

    if (!subjectStats[task.subject]) {
      subjectStats[task.subject] = {
        total: 0,
        completed: 0,
      };
    }

    subjectStats[task.subject].total++;

    if (task.completed) {
      subjectStats[task.subject].completed++;
    }
  });

  const subjects = Object.entries(subjectStats);

  return (
    <div className="subject-progress">

      <h2>Subject Progress</h2>

      {subjects.length === 0 ? (
        <p>No subjects available.</p>
      ) : (
        subjects.map(([subject, stats]) => {

          const percentage =
            stats.total === 0
              ? 0
              : Math.round(
                  (stats.completed / stats.total) * 100
                );

          return (
            <div
              className="subject"
              key={subject}
            >

              <span>{subject}</span>

              <div className="bar">

                <div
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>

              </div>

              <span>{percentage}%</span>

            </div>
          );
        })
      )}

    </div>
  );
}

export default SubjectProgressCard;