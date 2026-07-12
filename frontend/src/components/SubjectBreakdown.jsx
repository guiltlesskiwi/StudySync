import "../styles/SubjectBreakdown.css";

function SubjectBreakdown({ tasks }) {
  const subjectHours = {};

  let totalHours = 0;

  tasks.forEach((task) => {
    const subject = task.subject || "General";

    if (!task.duration) return;

    let duration = String(task.duration).toLowerCase();
    let hours = parseFloat(duration);

    if (isNaN(hours)) hours = 0;

    if (duration.includes("min")) {
      hours /= 60;
    }

    totalHours += hours;

    if (!subjectHours[subject]) {
      subjectHours[subject] = 0;
    }

    subjectHours[subject] += hours;
  });

  const subjects = Object.entries(subjectHours).map(
    ([name, hours]) => ({
      name,
      percent:
        totalHours === 0
          ? 0
          : Math.round((hours / totalHours) * 100),
    })
  );

  return (
    <div className="subject-breakdown-card">
      <h3>Subject Breakdown</h3>

      <div className="subject-list">
        {subjects.length === 0 ? (
          <p>No study sessions yet.</p>
        ) : (
          subjects.map((subject) => (
            <div key={subject.name}>
              <div className="subject-item">
                <span>{subject.name}</span>

                <span>{subject.percent}%</span>
              </div>

              <div className="progress">
                <div
                  className="fill"
                  style={{
                    width: `${subject.percent}%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SubjectBreakdown;