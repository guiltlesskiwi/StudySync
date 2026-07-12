import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/Register.css";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await login(
    form.email,
    form.password
  );

  if (!result.success) {
    alert(result.message);
    return;
  }

  alert("Login Successful");

  navigate("/dashboard");
};

  return (
    <div className="register-page">

      {/* Left */}

      <div className="register-left">

        <div className="register-brand">

          <div className="register-logo-box">
            📚
          </div>

          <h2 className="register-brand-name">
            StudySync
          </h2>

        </div>

        <h1 className="register-title">
          Welcome
          <br />
          Back.
        </h1>

        <p className="register-description">
          Continue your study journey,
          track your progress,
          and achieve your goals.
        </p>

        <div className="register-stats">

          <div className="register-stat-card">
            <h2>24K+</h2>
            <p>Students</p>
          </div>

          <div className="register-stat-card">
            <h2>3.2h</h2>
            <p>Avg Focus</p>
          </div>

          <div className="register-stat-card">
            <h2>89%</h2>
            <p>Habit Success</p>
          </div>

        </div>

      </div>

      {/* Right */}

      <div className="register-right">

        <div className="register-form-container">

          <h2>Login</h2>

          <p>
            Sign in to your account.
          </p>

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            <input
              className="register-input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              className="register-input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              className="register-button"
              type="submit"
            >
              Login
            </button>

          </form>

          <p className="register-footer">
            Don't have an account?{" "}
            <span
              className="register-link"
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer" }}
            >
              Create Account
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;