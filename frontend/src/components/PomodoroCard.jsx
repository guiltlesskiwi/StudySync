import { useState, useEffect } from "react";
import "../styles/PomodoroCard.css";

function PomodoroCard() {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
      alert("🎉 Pomodoro Session Completed!");
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(focusMinutes * 60);
  };

  const handleTimeChange = (e) => {
    const minutes = Number(e.target.value);

    setFocusMinutes(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  return (
    <div className="pomodoro-card">

      <h2>Pomodoro Timer</h2>

      <div className="time-selector">

        <label>Focus Time</label>

        <select
          value={focusMinutes}
          onChange={handleTimeChange}
          disabled={isRunning}
        >
          <option value={15}>15 Minutes</option>
          <option value={25}>25 Minutes</option>
          <option value={30}>30 Minutes</option>
          <option value={45}>45 Minutes</option>
          <option value={50}>50 Minutes</option>
          <option value={60}>60 Minutes</option>
          <option value={90}>90 Minutes</option>
          <option value={120}>120 Minutes</option>
        </select>

      </div>

      <div className="timer">

        <h1>{formatTime()}</h1>

        <p>Focus Time</p>

      </div>

      <button
        className="pomodoro-btn"
        onClick={handleStartPause}
      >
        {isRunning ? "Pause Session" : "Start Session"}
      </button>

      <button
        className="reset-btn"
        onClick={handleReset}
      >
        Reset
      </button>

    </div>
  );
}

export default PomodoroCard;