import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // =====================
  // Register User
  // =====================
  const register = async (name, email, password) => {
    try {
      setLoading(true);

      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration Failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // Login User
  // =====================
  const login = async (email, password) => {
    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      setCurrentUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login Failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // Logout
  // =====================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        register,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}