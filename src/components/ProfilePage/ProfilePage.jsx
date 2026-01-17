import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Header } from "../Header";
import toast from "react-hot-toast";
import { apiRequest } from "../../utils/api";

export default function ProfilePage({ setToken }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [registeredAt, setRegisteredAt] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

   const handleLogout = () => {
    setToken(null); // clears token, redirects to login
  };

  const handleDelete = async () => {
    if (!userId) {
      toast.error("User not found");
      return;
    }
  
    const confirmed = window.confirm(
      "Are you sure? This action cannot be undone."
    );
  
    if (!confirmed) return;
  
    toast.promise(
      apiRequest("DELETE", `/users/${userId}`),
      {
        loading: "Deleting account...",
        success: "Account deleted successfully",
        error: "Failed to delete account",
      }
    ).then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
  
      setTimeout(() => {
        setToken(null);
      }, 1500);
    });
  };

  //FETCH AND EDIT
  useEffect(() => {
    if (!userId) return;
  
    const fetchProfile = async () => {
      try {
        const res = await apiRequest("GET", `/users/${userId}`);
        const data = res.data;
  
        setUsername(data.username);
        setFullName(data.fullname);
        setEmail(data.email);
        setRegisteredAt(data.createdAt);
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
  
    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    toast.promise(
      apiRequest("PUT", `/users/${userId}`, {
        data: {
          username,
          fullname: fullName,
        },
      }),
      {
        loading: "Updating profile...",
        success: "Profile updated",
        error: "Update failed",
      }
    ).then(() => {
      setIsEditing(false);
    });
  };
  
  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-card">
          <h1 className="profile-title">My Profile</h1>

          <div className="card-content">
            <div className="left-box">
              <div className="photo-placeholder">Profile Photo</div>
              <h3>Username: {username}</h3>
              <p className="registered-date">
                Registered on: {new Date(registeredAt).toLocaleDateString()}
              </p>

              {isEditing ? (
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              ) : (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}

              <div className="info-box">
                <p>Reviews: ⭐</p>
              </div>
              <div className="info-box">
                <p>Favorites: ❤️</p>
              </div>
            </div>

            <div className="right-box">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isEditing}
                className={isEditing ? "editable-input" : "readonly-input"}
              />

              <label>Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing}
                className={isEditing ? "editable-input" : "readonly-input"}
              />

              <label>Email</label>
              <input value={email} readOnly className="readonly-input" />

              <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
