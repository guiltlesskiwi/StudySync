import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [tasks, setTasks] = useState([]);

  // ==========================
  // Fetch Tasks
  // ==========================
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("====== FETCH TASKS ======");
      console.log("TOKEN:", token);

      if (!token) return;

      const { data } = await API.get("/tasks");

      setTasks(data);
    } catch (error) {
      console.log(
        "Fetch Tasks Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [currentUser]);

  // ==========================
  // Add Task
  // ==========================
  const addTask = async (task) => {
    try {
      const { data } = await API.post("/tasks", task);

      setTasks((prev) => [data, ...prev]);
    } catch (error) {
      console.log(
        "Add Task Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Delete Task
  // ==========================
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.log(
        "Delete Task Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Toggle Complete
  // ==========================
  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);

      if (!task) return;

      const { data } = await API.put(`/tasks/${id}`, {
        completed: !task.completed,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? data : t
        )
      );
    } catch (error) {
      console.log(
        "Toggle Task Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Edit Task
  // ==========================
  const editTask = async (updatedTask) => {
    try {
      const { data } = await API.put(
        `/tasks/${updatedTask._id}`,
        updatedTask
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id
            ? data
            : task
        )
      );
    } catch (error) {
      console.log(
        "Edit Task Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};