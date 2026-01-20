import React, { useEffect, useState } from "react";
import "./ViewReview.css";
import { apiRequest } from "../../../utils/api"; 

export default function ViewReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReportedReviews();
  }, []);

  const fetchReportedReviews = async () => {
    try {
      const res = await apiRequest("GET", "/admin/reported-reviews");
      setReviews(res); 
    } catch (err) {
      console.error("Failed to fetch reported reviews", err);
    }
  };
  

  return (
    <div className="reviews-page">
      {/* Header */}
      <div className="reviews-header">
        <div className="header-left">
          <div>
            <h2>Reported Reviews</h2>
            <p>{reviews.length} reported</p>
          </div>

          <div className="status-dropdown">
            <button className="dropdown-btn">Reported ▼</button>
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 && <p>No reported reviews</p>}

        {reviews.map((item) => (
          <div className="review-card" key={item.reviewId}>
            <div className="review-info">
              <img
                src="/images/user.png"
                alt="profile"
                className="profile-img"
              />
              <div>
                <h3>{item.username}</h3>
                <p>{item.title}</p>
                <small>
                  Reported on:{" "}
                  {new Date(item.reportedAt).toLocaleString()}
                </small>
              </div>
            </div>

            <div className="review-actions">
              <button
                className="accept-btn"
              >
                Accept
              </button>

              <button
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
