import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";
import { useAuth } from "./AuthContext";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(null);

  // ==========================
  // Fetch Profile
  // ==========================
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setProfile(null);
        return;
      }

      const { data } = await API.get("/users/profile");

      setProfile(data);
    } catch (error) {
      console.log(
        "Fetch Profile Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [currentUser]);

  // ==========================
  // Update Profile
  // ==========================
  const updateProfile = async (updatedProfile) => {
    try {
      const { data } = await API.put(
        "/users/profile",
        updatedProfile
      );

      setProfile(data);

      return data;
    } catch (error) {
      console.log(
        "Update Profile Error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================
  // Change Password
  // ==========================
  const changePassword = async (
    currentPassword,
    newPassword
  ) => {
    try {
      const { data } = await API.put(
        "/users/password",
        {
          currentPassword,
          newPassword,
        }
      );

      return data;
    } catch (error) {
      console.log(
        "Change Password Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        fetchProfile,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};