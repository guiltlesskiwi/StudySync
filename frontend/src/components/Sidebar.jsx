import {
  FiGrid,
  FiBookOpen,
  FiActivity,
  FiCalendar,
  FiBarChart2,
  FiUser,
} from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";

import { HabitContext } from "../context/HabitContext";

import "../styles/sidebar.css";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid />,
  },
  {
    name: "Study Planner",
    path: "/planner",
    icon: <FiBookOpen />,
  },
  {
    name: "Habits",
    path: "/habits",
    icon: <FiActivity />,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: <FiCalendar />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <FiBarChart2 />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FiUser />,
  },
];

export default function Sidebar() {

  const location = useLocation();

  const { habits } = useContext(HabitContext);

  // Highest streak among all habits
  const currentStreak =
    habits.length === 0
      ? 0
      : Math.max(...habits.map((habit) => habit.streak));

  return (
    <aside className="sidebar">

      <div>

        <div className="logo">

          <div className="logo-box">S</div>

          <h2>StudySync</h2>

        </div>

        <p className="menu-title">MAIN MENU</p>

        <nav className="menu">

          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${
                location.pathname === item.path
                  ? "active"
                  : ""
              }`}
            >

              <span className="icon">
                {item.icon}
              </span>

              <span>{item.name}</span>

            </Link>

          ))}

        </nav>

      </div>

      <div className="streak-card">

        <p className="streak-label">
          Current Streak
        </p>

        <h2>🔥 {currentStreak} days</h2>

      </div>

    </aside>
  );
}