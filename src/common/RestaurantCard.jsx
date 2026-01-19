import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";

import locationIcon from "../assets/location.png";
import menuIcon from "../assets/menu.png";
import priceIcon from "../assets/tag.png";
import cuisineIcon from "../assets/dish.png";
import heartIcon from "../assets/heart.png";

export function RestaurantCard({ item, currentUser, role }) {

  // ✅ HOOKS MUST BE FIRST - BEFORE ANY CONDITIONALS
  const [isSaved, setIsSaved] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  // ✅ useEffect BEFORE any return statements
  useEffect(() => {
    if (item?.restaurantId) {
      checkIfSaved();
    }
  }, [item?.restaurantId]);

  // ✅ ITEM SAFETY CHECK - AFTER ALL HOOKS
  if (!item) {
    return null;
  }

  const checkIfSaved = () => {
    if (!item?.restaurantId) return;
    
    try {
      const saved = localStorage.getItem(`restaurant:${item.restaurantId}`);
      if (saved) {
        setIsSaved(true);
      }
    } catch (error) {
      console.log('Not saved yet');
      setIsSaved(false);
    }
  };

  const isOpen = item?.isOpen ?? false;

  const toggleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    
    if (!item?.restaurantId) return;

    try {
      const restaurantData = {
        id: item.restaurantId,
        restaurantId: item.restaurantId,
        name: item.name,
        location: item.location,
        cuisines: item.cuisines,
        priceRange: item.priceRange,
        rating: item.rating,
        photos: item.photos,
        isOpen: item.isOpen,
        menuLink: item.menuLink
      };

      if (newSavedState) {
        localStorage.setItem(`restaurant:${item.restaurantId}`, JSON.stringify(restaurantData));
        console.log('✅ Saved to favorites!');
      } else {
        localStorage.removeItem(`restaurant:${item.restaurantId}`);
        console.log('❌ Removed from favorites!');
      }
    } catch (error) {
      console.error('Storage error:', error);
    }
  };

  const toggleAdminMenu = () => setShowAdminMenu(prev => !prev);

  const restaurantImage =
    item?.photos && item.photos.length > 0
      ? `http://localhost:5000${item.photos[0]}`
      : "/placeholder.png";

  const rating =
    typeof item?.rating === "number" || typeof item?.rating === "string"
      ? item.rating
      : "N/A";

  const cuisines = Array.isArray(item?.cuisines)
    ? item.cuisines.join(", ")
    : item?.cuisines || "No Cuisines";

  const priceRange = Array.isArray(item?.priceRange)
    ? item.priceRange.join(", ")
    : item?.priceRange || "Price N/A";

  return (
    <Link
      to={`/restaurant/${item.restaurantId}`}
      state={{ currentUser }}
      className="restaurant-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* LEFT IMAGE */}
      <div className="card-image">
        <img src={restaurantImage} alt={item?.name || "Restaurant"} />
      </div>

      {/* MIDDLE CONTENT */}
      <div className="card-content">
        <h2 className="res-name">{item?.name}</h2>

        <p className="status-text">
          {isOpen ? "Open Now" : "Closed"}
        </p>

        <p className="line res-location">
          <img src={locationIcon} className="icon" alt="Location" />
          {item?.location || "Unknown Location"}
        </p>

        <p className="line res-details">
          <img src={cuisineIcon} className="icon" alt="Cuisine" />
          {cuisines}
        </p>

        <p className="line res-price">
          <img src={priceIcon} className="icon" alt="Price" />
          {priceRange}
        </p>

        {item?.menuLink && (
          <button
            className="menu-link-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(item.menuLink, "_blank", "noopener,noreferrer");
            }}
          >
            <img src={menuIcon} className="icon" alt="Menu" /> Menu
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="card-right">
        {role === "admin" ? (
          <div
            className="admin-menu-wrapper"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <span className="admin-menu-icon" onClick={toggleAdminMenu}>
              &#8230;
            </span>

            {showAdminMenu && (
              <div className="admin-menu-dropdown">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
          </div>
        ) : (
          <div
            className="user-toggle"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave();
            }}
          >
            {isSaved ? (
              <div className="saved-wrapper">
                <img src={heartIcon} alt="Saved" className="heart-big" />
                <span className="rating-on-heart">{rating}</span>
              </div>
            ) : (
              <div className="rating-circle">
                <span className="rating">{rating}</span>
                <span className="save-text">Click to save</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}