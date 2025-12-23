import "./ViewDetail.css";
import MeeraImg from "../../assets/Chyura.png"; // use your real image
import RajImg from "../../assets/Chyura.png";    // duplicate for now
import Dashboard from "../../assets/Dashboard.png";
import React, { useState } from "react";


export default function ViewDetail() {
  const [openMenuId, setOpenMenuId] = useState(null);

   const reviews = [
    {
      id: 1,
      name: "Meera",
      profile: MeeraImg,
      contributions: 7,
      title: "Authentic Himalayan Flavors",
      date: "Nov 2025 • Family",
      text: `
        Himalayan Bistro serves some of the most comforting Himalayan dishes in the city.
        The momo platter was juicy and flavorful, and the thakali set tasted truly homemade.
        The ambience is warm and cozy, perfect for a quiet meal with friends. 
        Service was polite and quick.
      `,
      images: []
    },
    {
      id: 2,
      name: "Raj",
      profile: RajImg,
      contributions: 5,
      title: "Great Food, Relaxed Setting",
      date: "Nov 2025 • Friends",
      text: `
        A lovely spot for anyone craving Nepali and Tibetan comfort food.
        The jhol momo was excellent, and the butter tea surprisingly soothing.
        The atmosphere is relaxed with warm lighting and clean seating. 
        Staff members were attentive throughout the visit.
      `,
      images: [Dashboard, Dashboard, Dashboard]
    }
  ];


  return (
    <div className="reviews-page">

      <h2 className="section-title">Reviews</h2>

      <div className="rating-summary">
        <div className="rating-left">
          <h1>4.6</h1>
          <p className="excellent">Excellent</p>
          <p className="sub">(110 reviews)</p>
        </div>

        <div className="rating-bars">
          <div className="bar-row"><span>Excellent</span><div className="bar"></div><span>4.9</span></div>
          <div className="bar-row"><span>Good</span><div className="bar"></div><span>4.6</span></div>
          <div className="bar-row"><span>Average</span><div className="bar"></div><span>4.7</span></div>
          <div className="bar-row"><span>Poor</span><div className="bar"></div><span>4.5</span></div>
          <div className="bar-row"><span>Terrible</span><div className="bar"></div><span>4.7</span></div>
        </div>

        <div className="rating-bars">
          <div className="bar-row"><span>Service</span><div className="bar"></div><span>4.9</span></div>
          <div className="bar-row"><span>Food</span><div className="bar"></div><span>4.6</span></div>
          <div className="bar-row"><span>Value</span><div className="bar"></div><span>4.7</span></div>
          <div className="bar-row"><span>Ambience</span><div className="bar"></div><span>4.5</span></div>
          <div className="bar-row"><span>Hygiene</span><div className="bar"></div><span>4.7</span></div>
        </div>
      </div>

      <input type="text" className="search-box" placeholder="Search reviews..." />

      <div className="filters">
        <button className="filter-btn">Traveller ▼</button>
        <button className="filter-btn">Ratings ▼</button>
        <button className="filter-btn">Time ▼</button>
        <button className="write-btn">✎ Write a Review</button>
      </div>

      {reviews.map((review) => (
        <div className="review-card" key={review.id}>

          <div className="review-header">
           <div className="review-user">
    <img src={review.profile} className="profile-img" alt={review.name} />

    <div className="user-info">
      <strong>{review.name}</strong>
      <p className="sub">{review.contributions} contributions</p>
    </div>
  </div>

  {/* RIGHT SIDE */}
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
          <button onClick={() => alert("Edit Review")}>✏️ Edit</button>
          <button onClick={() => alert("Delete Review")}>🗑 Delete</button>
          <button onClick={() => alert("Report Review")}>🚩 Report</button>
        </div>
      )}
         </div>
         </div>
          </div>

          <p className="review-title">{review.title}</p>
          <p className="sub">{review.date}</p>

          <p className="review-text">{review.text}</p>

          {review.images.length > 0 && (
            <div className="review-images">
              {review.images.map((img, i) => (
                <img key={i} src={img} alt="review" />
              ))}
            </div>
          )}

        </div>
      ))}

    </div>
  );
}