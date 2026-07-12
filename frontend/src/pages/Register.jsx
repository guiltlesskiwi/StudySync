import { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);

    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-page">

      {/* Left Section */}

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
          Study smarter,
          <br />
          not harder.
        </h1>

        <p className="register-description">
          Plan your sessions, build daily habits, and visualize your
          academic progress—all in one beautiful workspace.
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

      {/* Right Section */}

      <div className="register-right">

        <div className="register-form-container">

          <h2>Create Account</h2>

          <p>
            Start your study journey today.
          </p>

          <form
            className="register-form"
            onSubmit={handleCreateAccount}
          >

            <input
              className="register-input"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              className="register-input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className="register-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              className="register-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              className="register-button"
              type="submit"
            >
              Create Account
            </button>

          </form>

          <p className="register-footer">
            Already have an account?{" "}
            <span
              className="register-link"
              onClick={handleLogin}
              style={{ cursor: "pointer" }}
            >
              Login
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;