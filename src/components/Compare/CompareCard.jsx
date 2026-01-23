import "./CompareCard.css";

import locationIcon from "../../assets/location.png";
import priceIcon from "../../assets/tag.png";
import cuisineIcon from "../../assets/dish.png";
import menuIcon from "../../assets/menu.png";
import openIcon from "../../assets/open.png";
import closedIcon from "../../assets/closed.png";

import { Link } from "react-router-dom";
import { useState } from "react";

export function CompareCard({ item }) {
  if (!item) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const isOpen = item.isOpen;

  /* Images */
  const images =
    Array.isArray(item.photos) && item.photos.length > 0
      ? item.photos
      : ["/placeholder.png"];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const restaurantImage = images[currentIndex].startsWith("http")
    ? images[currentIndex]
    : `http://localhost:5000${images[currentIndex]}`;

  /* Cuisines */
  const cuisines = Array.isArray(item.cuisines)
    ? item.cuisines.join(", ")
    : item.cuisines || "N/A";

  /* Price */
  const priceRange = Array.isArray(item.priceRange)
    ? item.priceRange.join(", ")
    : item.priceRange || "N/A";

  /* Features */
  const features =
    Array.isArray(item.features) && item.features.length > 0
      ? item.features
      : ["No features"];

  /* Moods */
  const moods =
    Array.isArray(item.moods) && item.moods.length > 0
      ? item.moods
      : ["N/A"];

  return (
    <div className="compare-card">

      {/* Image Carousel */}
      <div className="compare-image">

        {images.length > 1 && (
          <button className="nav-btn left" onClick={prevImage}>
            ‹
          </button>
        )}

        <img src={restaurantImage} alt={item.name} />

        {images.length > 1 && (
          <button className="nav-btn right" onClick={nextImage}>
            ›
          </button>
        )}
      </div>

      {/* Name */}
      <h2>{item.name}</h2>
      {/* Open / Closed Status */}
      <div className="compare-status">
        <img
          src={isOpen ? openIcon : closedIcon}
          alt={isOpen ? "Open" : "Closed"}
          className="status-icon"
        />
        <span className={isOpen ? "open-text" : "closed-text"}>
          {isOpen ? "Open Now" : "Closed"}
        </span>
      </div>

      {/* Rating */}
      <p className="rating">⭐ {item.rating || "N/A"}</p>

      {/* Location */}
      <p className="text">
        <img src={locationIcon} className="icon" alt="" />
        {item.location || "Unknown"}
      </p>

      {/* Cuisine */}
      <p className="text">
        <img src={cuisineIcon} className="icon" alt="" />
        {cuisines}
      </p>

      {/* Price */}
      <p className="text">
        <img src={priceIcon} className="icon" alt="" />
        {priceRange}
      </p>

      {/* Features */}
      <div className="section">
        <h4>Features</h4>
        <ul>
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      {/* Moods */}
      <div className="section">
        <h4>Moods</h4>
        <ul>
          {moods.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="compare-actions">

        {item.menuLink && (
          <button
            className="menu-btn"
            onClick={() => window.open(item.menuLink, "_blank")}
          >
            <img src={menuIcon} className="icon" alt="" />
            Menu
          </button>
        )}

        <Link
          to={`/restaurant/${item.restaurantId}`}
          className="visit-btn"
        >
          Visit Page
        </Link>

      </div>

    </div>
  );
}
