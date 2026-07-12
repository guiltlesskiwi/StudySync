import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";
import { useAuth } from "./AuthContext";

// Context
export const AnalyticsContext = createContext();

// Custom Hook
export const useAnalytics = () =>
  useContext(AnalyticsContext);

export const AnalyticsProvider = ({
  children,
}) => {
  const { currentUser } = useAuth();

  const [analytics, setAnalytics] =
    useState({
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      totalHabits: 0,
      bestStreak: 0,
      totalEvents: 0,
    });

  // ==========================
  // Fetch Analytics
  // ==========================
  const fetchAnalytics = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        return;
      }

      const { data } =
        await API.get("/analytics");

      setAnalytics(data);
    } catch (error) {
      console.log(
        "Fetch Analytics Error:",
        error.response?.data ||
          error.message
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchAnalytics();
    }
  }, [currentUser]);

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        fetchAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};