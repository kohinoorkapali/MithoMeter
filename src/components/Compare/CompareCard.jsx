import "./CompareCard.css";

import locationIcon from "../../assets/location.png";
import priceIcon from "../../assets/tag.png";
import cuisineIcon from "../../assets/dish.png";
import menuIcon from "../../assets/menu.png";

import { Link } from "react-router-dom";

export function CompareCard({ item }) {
  if (!item) return null;

  // Image
  const restaurantImage =
    item.photos && item.photos.length > 0
      ? `http://localhost:5000${item.photos[0]}`
      : "/placeholder.png";

  // Cuisines
  const cuisines = Array.isArray(item.cuisines)
    ? item.cuisines.join(", ")
    : item.cuisines || "No Cuisines";

  // Price
  const priceRange = Array.isArray(item.priceRange)
    ? item.priceRange.join(", ")
    : item.priceRange || "Price N/A";

  return (
    <div className="compare-card">

      {/* Image */}
      <div className="compare-image">
        <img src={restaurantImage} alt={item.name} />
      </div>

      {/* Name */}
      <h2>{item.name}</h2>

      {/* Rating */}
      <p className="rating">
        ⭐ {item.rating || "N/A"}
      </p>

      {/* Location */}
      <p className="line">
        <img src={locationIcon} className="icon" alt="" />
        {item.location || "Unknown"}
      </p>

      {/* Cuisine */}
      <p className="line">
        <img src={cuisineIcon} className="icon" alt="" />
        {cuisines}
      </p>

      {/* Price */}
      <p className="line">
        <img src={priceIcon} className="icon" alt="" />
        {priceRange}
      </p>

      {/* Menu */}
      {item.menuLink && (
        <button
          className="menu-btn"
          onClick={() => window.open(item.menuLink, "_blank")}
        >
          <img src={menuIcon} className="icon" alt="" />
          Menu
        </button>
      )}

      {/* Visit Page */}
      <Link
        to={`/restaurant/${item.restaurantId}`}
        className="visit-btn"
      >
        Visit Page
      </Link>

    </div>
  );
}
