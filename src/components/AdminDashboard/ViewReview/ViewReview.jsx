import React from "react";
import "./ViewReview.css";

const reviews = [
  { id: 1, name: "Meera", role: "Review", image: "/images/user.png" },
  { id: 2, name: "Meera", role: "Review", image: "/images/user.png" },
  { id: 3, name: "Meera", role: "Review", image: "/images/user.png" },
  { id: 4, name: "Meera", role: "Review", image: "/images/user.png" },
];

export default function ViewReview() {
  return (
    <div className="reviews-page">
      {/* Header */}
      <div className="reviews-header">
        <div>
          <h2>Reviews</h2>
          <p>5 of 200</p>

           <div className="status-dropdown">
          <button className="dropdown-btn">Status ▼</button>
        </div>

        </div>

        <div className="nav-buttons">
          <button className="circle-btn">←</button>
          <button className="circle-btn">→</button>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((item) => (
          <div className="review-card" key={item.id}>
            <div className="review-info">
              <img src={item.image} alt="profile" className="profile-img" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.role}</p>
              </div>
            </div>

            <div className="review-actions">
              <button className="accept-btn">Accept</button>
              <button className="remove-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
