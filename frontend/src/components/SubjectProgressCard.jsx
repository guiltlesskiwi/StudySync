import "../styles/SubjectProgressCard.css";

function SubjectProgressCard() {
  return (
    <div className="subject-progress">

      <h2>Subject Progress</h2>

      <div className="subject">

        <span>DSA</span>

        <div className="bar">
          <div style={{ width: "85%" }}></div>
        </div>

        <span>85%</span>

      </div>

      <div className="subject">

        <span>DBMS</span>

        <div className="bar">
          <div style={{ width: "60%" }}></div>
        </div>

        <span>60%</span>

      </div>

      <div className="subject">

        <span>React</span>

        <div className="bar">
          <div style={{ width: "75%" }}></div>
        </div>

        <span>75%</span>

      </div>

    </div>
  );
}

export default SubjectProgressCard;