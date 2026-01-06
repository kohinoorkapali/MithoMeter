import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { Header } from "../Header";

export default function ProfilePage({ setToken }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // delete token
    setToken(null);                           // update App state
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
              <p className="registered-date">Registered on: 2025-12-08</p>
              <button className="edit-image-btn">Edit Image</button>

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
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="editable-input"
              />

              <label>Full Name</label>
              <input type="text" value="" readOnly className="readonly-input" />

              <label>Email</label>
              <input type="email" value="" readOnly className="readonly-input" />

              <button className="delete-btn">Delete Account</button>
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
