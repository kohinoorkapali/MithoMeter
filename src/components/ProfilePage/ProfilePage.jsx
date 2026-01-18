import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Header } from "../Header";
import toast from "react-hot-toast";
import { apiRequest, apiUpload } from "../../utils/api.js";

export default function ProfilePage({ setToken, currentUser, setUser }) {

  if (!currentUser) {
    return <p>Loading profile...</p>; // wait until user is available
  }

  const userId = currentUser.id;

  const [username, setUsername] = useState(currentUser.username);
  const [fullName, setFullName] = useState(currentUser.fullname);
  const [email, setEmail] = useState(currentUser.email);
  const [registeredAt, setRegisteredAt] = useState(currentUser.createdAt);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(
    currentUser.profile_image 
      ? `http://localhost:5000/uploads/profile/${currentUser.profile_image}`
      : ""
  );
  const [isEditing, setIsEditing] = useState(false);

  // Fetch latest profile info on load
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
        setProfileImageUrl(
          data.profile_image
            ? `http://localhost:5000/uploads/profile/${data.profile_image}`
            : ""
        );

        // update global user state
        setUser(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [userId, setUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  const handleDelete = async () => {
    if (!userId) return toast.error("User not found");

    const confirmed = window.confirm("Are you sure? This action cannot be undone.");
    if (!confirmed) return;

    toast.promise(apiRequest("DELETE", `/users/${userId}`), {
      loading: "Deleting account...",
      success: "Account deleted successfully",
      error: "Failed to delete account",
    }).then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setTimeout(() => setToken(null), 1500);
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (username && username.trim() !== "") formData.append("username", username);
      if (profileImageFile) formData.append("profile", profileImageFile);

      if (formData.has("username") || formData.has("profile")) {
        await apiUpload(`/users/upload/${userId}`, formData);
      }

      toast.success("Profile updated successfully");
      setIsEditing(false);

      // Refresh latest user data
      const res = await apiRequest("GET", `/users/${userId}`);
      const updated = res.data;

      setUsername(updated.username);
      setFullName(updated.fullname);
      setEmail(updated.email);
      setProfileImageUrl(
        updated.profile_image
          ? `http://localhost:5000/uploads/profile/${updated.profile_image}`
          : ""
      );
      setProfileImageFile(null);

      // Update global user state
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));

    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-card">
          <h1 className="profile-title">My Profile</h1>

          <div className="card-content">
            {/* Left section */}
            <div className="left-box">
              <div className="photo-placeholder">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  "Profile Photo"
                )}
              </div>

              {isEditing && (
                <div className="file-buttons">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                    id="profileFile"
                  />
                  <label htmlFor="profileFile" className="file-label">
                    Choose File
                  </label>
                </div>
              )}

              <div className="username-display">Username: {username}</div>
              <p className="registered-date">
                Registered on: {new Date(registeredAt).toLocaleDateString()}
              </p>

              {/* Save + Cancel buttons side by side */}
              {isEditing && (
                <div className="save-cancel-buttons">
                  <button className="save-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditing(false); 
                      setProfileImageFile(null); // remove selected file
                      setProfileImageUrl(user.profile_image || ""); // reset to original
                      setUsername(user.username); // reset username as well if changed
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {!isEditing && (
                <button
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}

              <div className="info-box">Reviews: ⭐</div>
              <div className="info-box">Favorites: ❤️</div>
            </div>

            {/* Right section */}
            <div className="right-box">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isEditing}
                className={isEditing ? "editable-input" : "readonly-input"}
              />

              <label>Full Name</label>
              <input value={fullName} disabled className="readonly-input" />

              <label>Email</label>
              <input value={email} readOnly className="readonly-input" />

              <button className="delete-btn" onClick={handleDelete}>
                Delete Account
              </button>
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
