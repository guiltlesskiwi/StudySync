import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useUser } from "../context/UserContext";
import { useTasks } from "../context/TaskContext";
import { useHabits } from "../context/HabitContext";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const {
    profile,
    updateProfile,
    changePassword,
  } = useUser();

  const { tasks } = useTasks();
  const { habits } = useHabits();

  const [showEdit, setShowEdit] = useState(false);
  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [editedProfile, setEditedProfile] =
    useState(null);

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  if (!profile || !editedProfile) {
    return <h2>Loading...</h2>;
  }

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  // ==========================
  // Statistics
  // ==========================

  const totalHours = tasks.reduce((sum, task) => {
    return sum + (parseFloat(task.duration) || 0);
  }, 0);

  const completedHabits = habits.reduce(
    (sum, habit) =>
      sum + habit.history.filter(Boolean).length,
    0
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const currentStreak =
    habits.length > 0
      ? Math.max(...habits.map((h) => h.streak))
      : 0;

  // ==========================
  // Save Profile
  // ==========================

  const saveProfile = async () => {
    await updateProfile(editedProfile);

    alert("Profile Updated!");

    setShowEdit(false);
  };

  // ==========================
  // Change Password
  // ==========================

  const handleChangePassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    const response = await changePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );

    if (response) {
      alert("Password Updated Successfully!");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordModal(false);
    }
  };

  return (
    <div className="profile-page">

      {/* Header */}

      <div className="profile-header">

        <div className="profile-left">

          <div className="profile-avatar">

            {profile.name
              ? profile.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
              : "U"}

            <span className="online-dot"></span>

          </div>

          <div className="profile-info">

            <h1>{profile.name}</h1>

            <h3>
              {profile.college || "No College"} •{" "}
              {profile.course || "No Course"}
            </h3>

            <p>
              {profile.bio || "No bio added."}
            </p>

            <small>{profile.email}</small>

          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >

          <button
            className="edit-btn"
            onClick={() => {
              setEditedProfile(profile);
              setShowEdit(true);
            }}
          >
            Edit Profile
          </button>

          <button
            className="edit-btn"
            onClick={() =>
              setShowPasswordModal(true)
            }
          >
            Change Password
          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="profile-stats">

        <div className="profile-stat">
          <h2>{totalHours.toFixed(1)}h</h2>
          <p>Total Study Hours</p>
        </div>

        <div className="profile-stat">
          <h2>{completedHabits}</h2>
          <p>Habits Completed</p>
        </div>

        <div className="profile-stat">
          <h2>{completedTasks}</h2>
          <p>Tasks Done</p>
        </div>

        <div className="profile-stat">
          <h2>{currentStreak} Days</h2>
          <p>Current Streak</p>
        </div>

      </div>

      {/* Sign Out */}

      <div className="profile-signout">

        <button
          className="signout-btn"
          onClick={handleSignOut}
        >
          Sign Out
        </button>

      </div>

      {/* Edit Profile */}

      {showEdit && (

        <div className="modal-overlay">

          <div className="event-modal">

            <h2>Edit Profile</h2>

            <input
              type="text"
              placeholder="Name"
              value={editedProfile.name}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="College"
              value={editedProfile.college}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  college: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Course"
              value={editedProfile.course}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  course: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Bio"
              value={editedProfile.bio}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  bio: e.target.value,
                })
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowEdit(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={saveProfile}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Change Password */}

      {showPasswordModal && (

        <div className="modal-overlay">

          <div className="event-modal">

            <h2>Change Password</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={
                passwordData.currentPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword:
                    e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword:
                    e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                passwordData.confirmPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword:
                    e.target.value,
                })
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowPasswordModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={
                  handleChangePassword
                }
              >
                Update Password
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}