import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }) {

  const { currentUser } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    university: "",
    year: "",
    bio: "",
    goal: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || "",
        university:
          currentUser.university ||
          "State University",
        year:
          currentUser.year ||
          "Student",
        bio:
          currentUser.bio ||
          "Welcome to StudySync.",
        goal:
          currentUser.goal ||
          "Become a Better Student",
        avatar:
          currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  const updateProfile = (updatedProfile) => {

    setProfile(updatedProfile);

    const updatedUser = {
      ...currentUser,
      ...updatedProfile,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email
        ? updatedUser
        : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}