import { Header } from '../Header.jsx';
import './ViewDetail.css';
import React from "react";
import "./ViewDetail.css";


import website from "../../assets/website.png";
import location from "../../assets/location.png";
import menu from "../../assets/menu.png";
import price from "../../assets/tag.png";
import cuisine from "../../assets/dish.png";
import open from "../../assets/open.png";
import Img from "../../assets/Chyura.png";

export function ViewDetail() {
  return (
    <>
      <Header />

      <div className="ViewDetail-container">
        {/* Title */}
        <h1 className="ViewDetail-title">Himalayan Spice House</h1>

        {/* Overview line */}
        <div className="overview-line">
          <div className="item rating">
            <span>4.6 (110 reviews)</span>
          </div>

          <div className="item rank">
            <span>#1 among 109 Nepalese Cuisine Restaurants</span>
          </div>

          <div className="item dish">
            <img src={cuisine} alt="Dish" className="icon" />
            <span>Nepali, Tibetan</span>
          </div>

          <div className="item price">
            <img src={price} alt="Price" className="icon" />
            <span>₹₹ - Moderate</span>
          </div>
        </div>

        {/* Image */}
        <div className="image-wrapper">
          <img src={Img} alt="" />
          <img src={Img} alt="" />
          <img src={Img} alt="" />
          <img src={Img} alt="" />
          
        </div>

        {/* Overview */}
            <section className="overview-left">
        <h2>Overview</h2>

        <p className="overview-text">
          Himalayan Spice House offers delicious traditional and modern cuisine
          prepared with fresh ingredients.
        </p>

          <ul className="overview-list">
            <li className="overview-item">
              <img src={open} alt="Time" className="icon--original" />
              <strong>Time:</strong> 9:00 AM – 10:00 PM
            </li>

            <li className="overview-item">
              <img src={location} alt="Location" className="icon" />
              <strong>Location:</strong> Baneshwor, Kathmandu
            </li>

            <li className="overview-link">
              <img src={menu} alt="Menu" className="icon" />
              <strong>Menu</strong>
            </li>

            <li className="overview-link">
              <img src={website} alt="Website" className="icon" />
              <strong>Website</strong>
            </li>
          </ul>
        </section>

        {/* About */}
       <section className="left-section">
  <h2>About</h2>
  <p>
    We focus on quality, hygiene, and authentic flavors. Our experienced
    chefs and friendly staff ensure a comfortable dining experience.
  </p>

  <h2>Features</h2>
  <ul className="features-list">
    <li>Fresh & Hygienic Food</li>
    <li>Experienced Chefs</li>
    <li>Comfortable Seating</li>
    <li>Online Menu Available</li>
    <li>Dine-in & Takeaway</li>
  </ul>
</section>

      </div>
    </>
  );
}
// import "./ViewDetail.css";
// import MeeraImg from "../../assets/Chyura.png"; // use your real image
// import RajImg from "../../assets/Chyura.png";    // duplicate for now
// import Dashboard from "../../assets/Dashboard.png";
// import React, { useState } from "react";


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