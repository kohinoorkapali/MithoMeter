import React, { useState } from "react";
import "./ViewDetail_Bottom.css";

export default function ViewDetail_Bottom() {
  const [openMenuId, setOpenMenuId] = useState(null);

  const reviews = [
    {
      id: 1,
      name: "Meera",
      profile: "https://i.pravatar.cc/40?img=5",
      contributions: 7,
      title: "Authentic Himalayan Flavors",
      date: "Nov 2025 · Family",
      text:
        "Himalayan Bistro serves some of the most comforting Himalayan dishes in the city. The momo platter was juicy and flavorful, and the thakali set tasted truly homemade. The ambience is warm and cozy, perfect for a quiet meal with friends. Service was polite and quick.",
      images: []
    },
    {
      id: 2,
      name: "Raj",
      profile: "https://i.pravatar.cc/40?img=12",
      contributions: 5,
      title: "Great Food, Relaxed Setting",
      date: "Nov 2025 · Friends",
      text:
        "A lovely spot for anyone craving Nepali and Tibetan comfort food. The jhol momo was excellent, and the butter tea was surprisingly soothing. Staff members were friendly and attentive.",
      images: [
        "https://picsum.photos/120/80?1",
        "https://picsum.photos/120/80?2"
      ]
    }
  ];

  return (
    <div className="review-page">
          <h3>Reviews</h3>

      {/* TOP SUMMARY */}
      <div className="review-summary">
        <div className="rating-left">
          <h1>4.6</h1>
          <p className="excellent">Excellent</p>
          <p className="count">★★★★★ (110 reviews)</p>
        </div>

        <div className="rating-bars">
          {[
            ["Excellent", 4.9],
            ["Good", 4.6],
            ["Average", 4.7],
            ["Poor", 4.5],
            ["Terrible", 4.7],
          ].map((item, i) => (
            <div key={i} className="bar-row">
              <span>{item[0]}</span>
              <div className="bar">
                <div className="fill" style={{ width: `${item[1] * 20}%` }} />
              </div>
              <span>{item[1]}</span>
            </div>
          ))}
        </div>

        <div className="rating-bars">
          {[
            ["Service", 4.9],
            ["Food", 4.6],
            ["Value", 4.7],
            ["Ambience", 4.5],
            ["Hygiene", 4.7],
          ].map((item, i) => (
            <div key={i} className="bar-row">
              <span>{item[0]}</span>
              <div className="bar">
                <div className="fill" style={{ width: `${item[1] * 20}%` }} />
              </div>
              <span>{item[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <input className="search" placeholder="Search reviews" />

      {/* FILTERS */}
      <div className="filters">
        <div className="filter-group">
          <button>Traveller ▼</button>
          <button>Ratings ▼</button>
          <button>Time ▼</button>
        </div>
        <button className="write-review">✏️ Write a Review</button>
      </div>

      {/* REVIEWS LIST */}
      {reviews.map((review) => (
        <div className="review-card" key={review.id}>
          <div className="review-header">
            <div className="user">
              <img src={review.profile} alt={review.name} />
              <div>
                <strong>{review.name}</strong>
                <small>{review.contributions} contributions</small>
              </div>
            </div>

            <div className="review-actions">
              <span className="like">👍 0</span>

              <div className="menu-wrapper">
                <button
                  className="menu-btn"
                  onClick={() =>
                    setOpenMenuId(openMenuId === review.id ? null : review.id)
                  }
                >
                  ⋯
                </button>

                {openMenuId === review.id && (
                  <div className="menu-dropdown">
                    <button>✏️ Edit</button>
                    <button>🗑 Delete</button>
                    <button>🚩 Report</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="review-body">
            <span className="stars">★★★★★</span>
            <h4>{review.title}</h4>
            <small>{review.date}</small>
            <p>{review.text}</p>

            {review.images.length > 0 && (
              <div className="review-images">
                {review.images.map((img, i) => (
                  <img key={i} src={img} alt="review" />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

    </div>
  );
}
