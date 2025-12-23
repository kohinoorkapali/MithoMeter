import React, { useState } from "react";
import "./ViewUser.css";

const initialUsers = [
  { id: 1, name: "Meera", date: "2025/01/03", image: "/images/user.png" },
  { id: 2, name: "Meera", date: "2025/01/03", image: "/images/user.png" },
  { id: 3, name: "Meera", date: "2025/01/03", image: "/images/user.png" },
  { id: 4, name: "Meera", date: "2025/01/03", image: "/images/user.png" },
  { id: 5, name: "Meera", date: "2025/01/03", image: "/images/user.png" },
  { id: 6, name: "Meera", date: "2025/01/03", image: "/images/user.png" },
];

export default function ViewUser() {
  const [bannedUsers, setBannedUsers] = useState([]);

  const toggleBan = (id) => {
    setBannedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((uid) => uid !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="user-page">

      <div className="user-header">
        <div>
          <h2>Users</h2>
          <p>5 of 200</p>
        </div>

        <div className="status-dropdown">
          <button className="dropdown-btn">Status ▼</button>
        </div>
      </div>

      <div className="user-list">
        {initialUsers.map((u) => {
          const isBanned = bannedUsers.includes(u.id);

          return (
            <div key={u.id} className="user-card">
              <div className="user-info">
                <img src={u.image} alt="user" className="profile-img" />
                <div>
                  <h3>{u.name}</h3>
                  <p>Joined: {u.date}</p>
                </div>
              </div>

              <button
                className="ban-btn"
                onClick={() => toggleBan(u.id)}
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
