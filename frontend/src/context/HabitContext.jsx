import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";
import { useAuth } from "./AuthContext";

// Context
export const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [habits, setHabits] = useState([]);

  // ==========================
  // Fetch Habits
  // ==========================
  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setHabits([]);
        return;
      }

      const { data } = await API.get("/habits");

      setHabits(data);
    } catch (error) {
      console.log(
        "Fetch Habits Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchHabits();
    } else {
      setHabits([]);
    }
  }, [currentUser]);

  // ==========================
  // Add Habit
  // ==========================
  const addHabit = async (habit) => {
    try {
      const { data } = await API.post("/habits", habit);

      setHabits((prev) => [data, ...prev]);
    } catch (error) {
      console.log(
        "Add Habit Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Delete Habit
  // ==========================
  const deleteHabit = async (id) => {
    try {
      await API.delete(`/habits/${id}`);

      setHabits((prev) =>
        prev.filter((habit) => habit._id !== id)
      );
    } catch (error) {
      console.log(
        "Delete Habit Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Mark Habit Done
  // ==========================
  const toggleHabit = async (id) => {
    try {
      const habit = habits.find((h) => h._id === id);

      if (!habit) return;

      if (habit.completedToday) return;

      const updatedHistory = [...habit.history];

      updatedHistory.shift();
      updatedHistory.push(true);

      const updatedHabit = {
        ...habit,
        completedToday: true,
        streak: habit.streak + 1,
        history: updatedHistory,
      };

      const { data } = await API.put(
        `/habits/${id}`,
        updatedHabit
      );

      setHabits((prev) =>
        prev.map((h) =>
          h._id === id ? data : h
        )
      );
    } catch (error) {
      console.log(
        "Toggle Habit Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Edit Habit
  // ==========================
  const editHabit = async (updatedHabit) => {
    try {
      const { data } = await API.put(
        `/habits/${updatedHabit._id}`,
        updatedHabit
      );

      setHabits((prev) =>
        prev.map((habit) =>
          habit._id === updatedHabit._id
            ? data
            : habit
        )
      );
    } catch (error) {
      console.log(
        "Edit Habit Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        fetchHabits,
        addHabit,
        deleteHabit,
        toggleHabit,
        editHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};