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