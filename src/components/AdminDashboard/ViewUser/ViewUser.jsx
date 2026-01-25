import React, { useEffect, useState } from "react";
import "./ViewUser.css";
import toast from "react-hot-toast";
import { apiRequest } from "../../../utils/api.js";
import { DropdownFilter } from "../../../common/DropdownFilter.jsx";

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Banned", value: "banned" },
  ];
  

  // GET all users (local to this page)
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("GET", "/users");
      setUsers(res.data);
    } catch (err) {
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE ban / unban 
  const handleToggleBan = async (id) => {
    const toastId = toast.loading("Updating user status...");
  
    try {
      const res = await apiRequest("PATCH", `/users/${id}/status`);
      // res === { message, status }
  
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: res.status } : u
        )
      );
  
      toast.success(
        `User ${res.status === "banned" ? "banned" : "unbanned"} successfully`,
        { id: toastId }
      );
    } catch (err) {
      toast.error(err.message || "Action failed", { id: toastId });
    }
  };
  

  // 🔥 Load users ONCE when page opens
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="user-page">
      <div className="user-header">
        <div>
          <h2>Users</h2>
          <p>{users.length} users</p>
        </div>

        <DropdownFilter
          title="Status"
          options={statusOptions}
          selectedValues={selectedStatuses}
          onChange={setSelectedStatuses}
        />
      </div>

      <div className="user-list">
        {loading && <p>Loading users...</p>}

        {!loading &&
          users
          .filter((u) => {
            // If nothing selected → show all
            if (selectedStatuses.length === 0) return true;
        
            return selectedStatuses.includes(u.status);
          })
          .map((u) => {
        
            const isBanned = u.status === "banned";

            return (
              <div
                key={u.id}
                className={`user-card ${isBanned ? "banned" : ""}`}
              >
                <div className="user-info">
                  <img
                  src={
                    u.profile_image
                      ? `http://localhost:5000/uploads/profile/${u.profile_image}`
                      : "/images/user.png"
                  }
                  alt="user"
                  className="profile-img"
                />
                  <div>
                    <h3>{u.username}</h3>
                    <p>
                      Joined:{" "}
                      {new Date(u.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  className="ban-btn"
                  onClick={() => handleToggleBan(u.id)}
                >
                  {isBanned ? "Unban" : "Ban"}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
