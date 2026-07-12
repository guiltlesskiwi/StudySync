import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";
import { useAuth } from "./AuthContext";

// Context
export const CalendarContext = createContext();

// Custom Hook
export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [events, setEvents] = useState([]);

  // ==========================
  // Fetch Events
  // ==========================
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setEvents([]);
        return;
      }

      const { data } = await API.get("/calendar");

      setEvents(data);
    } catch (error) {
      console.log(
        "Fetch Events Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [currentUser]);

  // ==========================
  // Add Event
  // ==========================
  const addEvent = async (event) => {
    try {
      const { data } = await API.post(
        "/calendar",
        event
      );

      setEvents((prev) => [data, ...prev]);
    } catch (error) {
      console.log(
        "Add Event Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Delete Event
  // ==========================
  const deleteEvent = async (id) => {
    try {
      await API.delete(`/calendar/${id}`);

      setEvents((prev) =>
        prev.filter((event) => event._id !== id)
      );
    } catch (error) {
      console.log(
        "Delete Event Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Edit Event
  // ==========================
  const editEvent = async (updatedEvent) => {
    try {
      const { data } = await API.put(
        `/calendar/${updatedEvent._id}`,
        updatedEvent
      );

      setEvents((prev) =>
        prev.map((event) =>
          event._id === updatedEvent._id
            ? data
            : event
        )
      );
    } catch (error) {
      console.log(
        "Edit Event Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        fetchEvents,
        addEvent,
        deleteEvent,
        editEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};