import "../styles/RecentNotesCard.css";

function RecentNotesCard() {
  return (
    <div className="recent-card">

      <div className="card-title">
        <h2>Recent Notes</h2>
        <button>View All</button>
      </div>

      <div className="note-item">
        <div>
          <h3>DBMS Transactions</h3>
          <p>Edited 2 hours ago</p>
        </div>

        <span>📄</span>
      </div>

      <div className="note-item">
        <div>
          <h3>Operating System Scheduling</h3>
          <p>Yesterday</p>
        </div>

        <span>📄</span>
      </div>

      <div className="note-item">
        <div>
          <h3>React Hooks</h3>
          <p>2 days ago</p>
        </div>

        <span>📄</span>
      </div>

    </div>
  );
}

export default RecentNotesCard;