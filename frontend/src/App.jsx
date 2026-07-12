import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Habits from "./pages/Habits";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/analytics";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      {/* Redirect Root */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/planner"
        element={
          <ProtectedRoute>
            <Layout>
              <Planner />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/habits"
        element={
          <ProtectedRoute>
            <Layout>
              <Habits />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Layout>
              <Calendar />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Layout>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Invalid Route */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;