import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import "./RestaurantCard.css";

import locationIcon from "../assets/location.png";
import menuIcon from "../assets/menu.png";
import priceIcon from "../assets/tag.png";
import cuisineIcon from "../assets/dish.png";
import openIcon from "../assets/open.png";
import closedIcon from "../assets/closed.png";
import heartIcon from "../assets/heart.png";

import { useApi } from "../hooks/useAPI.js";

export function RestaurantCard({
  item,
  currentUser,
  role,
  onToggleFavorite,
  disableClick = false,
  isSelected,
  onSelect,
  onDelete,
}) {
  const { callApi } = useApi();
  const navigate = useNavigate();
  const CardWrapper = disableClick ? "div" : Link;
  const [isSaved, setIsSaved] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [reviews, setReviews] = useState([]);

  /* ----------------------------------
     IMAGE
  ---------------------------------- */
const restaurantImage =
  item.photos && item.photos.length > 0
    ? `http://localhost:5000${item.photos[0]}`
    : "/placeholder.png";

  /* ----------------------------------
     ADMIN ACTIONS
  ---------------------------------- */

  const handleEdit = () => {
    navigate(`/restaurants/edit/${item.restaurantId}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${item.name}?`
    );
  
    if (!confirmDelete) return;
  
    try {
      await axios.delete(
        `http://localhost:5000/api/restaurants/${item.restaurantId}`
      );
  
      toast.success("Restaurant deleted successfully 🗑️");
  
      onDelete?.(item.restaurantId);
    } catch (error) {
      console.error("Delete failed", error);
  
      toast.error(
        error?.response?.data?.message || "Failed to delete restaurant ❌"
      );
    }
  };
  

  /* ----------------------------------
     REVIEWS
  ---------------------------------- */

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/reviews/restaurant/${item.restaurantId}`
        );
        const data = await res.json();
        setReviews(data.data || []);
      } catch (err) {
        console.error("Review fetch error:", err);
      }
    };

    fetchReviews();
  }, [item.restaurantId]);

  const overallRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, r) => sum + (Number(r.totalRating) || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : "N/A";

  /* ----------------------------------
     FAVORITES
  ---------------------------------- */

  useEffect(() => {
    const checkFavorite = async () => {
      if (!currentUser) return;

      try {
        const favorites = await callApi(
          "GET",
          `/favorites/${currentUser.id}`
        );

        const exists = favorites.some(
          (fav) =>
            Number(fav.restaurantId) ===
            Number(item.restaurantId)
        );

        setIsSaved(exists);
      } catch (err) {
        console.error("Favorite check error:", err);
      }
    };

    checkFavorite();
  }, [currentUser, item.restaurantId, callApi]);

  const toggleSave = async () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    try {
      if (isSaved) {
        await callApi(
          "DELETE",
          `/favorites/${currentUser.id}/${item.restaurantId}`
        );
        setIsSaved(false);
      } else {
        await callApi("POST", "/favorites/save", {
          data: {
            userId: currentUser.id,
            restaurantId: item.restaurantId,
          },
        });

        setIsSaved(true);
      }

      onToggleFavorite?.(item.restaurantId);
    } catch (err) {
      console.error("Favorite toggle error:", err);
    }
  };

  /* ----------------------------------
     DATA
  ---------------------------------- */

  const cuisines = Array.isArray(item.cuisines)
    ? item.cuisines.join(", ")
    : item.cuisines || "No Cuisines";

  const priceRange = Array.isArray(item.priceRange)
    ? item.priceRange.join(", ")
    : item.priceRange || "Price N/A";

  const isOpen = item.isOpen;

  /* ----------------------------------
     RENDER
  ---------------------------------- */

  return (
    <CardWrapper
    {...(!disableClick && {
      to: `/restaurant/${item.restaurantId}`,
      state: { currentUser },
    })}
    className="restaurant-card"
    style={{
      textDecoration: "none",
      color: "inherit",
      cursor: disableClick ? "default" : "pointer",
    }}
  >
      {/* IMAGE */}
      <div className="card-image">
        <img src={restaurantImage} alt={item.name} />
      </div>

      {/* COMPARE */}
      <div
        className={`compare-select ${isSelected ? "selected" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSelect(item.restaurantId);
        }}
      >
        {isSelected ? "✔" : "○"}
      </div>

      {/* CONTENT */}
      <div className="card-content">
        <h2 className="res-name">{item.name}</h2>

        {/* Location + Status */}
        <div className="line location-status">
          <p className="line res-location">
            <img src={locationIcon} className="icon" />
            {item.location || "Unknown"}
          </p>

          <img
            src={isOpen ? openIcon : closedIcon}
            className="status-icon"
          />
        </div>

        {/* Cuisine */}
        <p className="line">
          <img src={cuisineIcon} className="icon" />
          {cuisines}
        </p>

        {/* Price */}
        <p className="line">
          <img src={priceIcon} className="icon" />
          {priceRange}
        </p>

        {/* Menu */}
        {item.menuLink && (
          <button
            className="menu-link-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(item.menuLink, "_blank");
            }}
          >
            <img src={menuIcon} className="icon" />
            Menu
          </button>
        )}

        {/* Reviews */}
        <div className="reviews">
          <p className="review">“Amazing food!”</p>
          <p className="review">“Cozy place.”</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="card-right">

        {/* ADMIN */}
        {role === "admin" && (
          <div className="card-right admin">
            <div className="admin-actions">

              <button
                className="edit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEdit();
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                Delete
              </button>

            </div>
          </div>
        )}

        {/* USER */}
        {role !== "admin" && (
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
                <img src={heartIcon} className="heart-big" />
                <span className="rating-on-heart">
                  {overallRating}
                </span>
              </div>
            ) : (
              <div className="rating-circle">
                <span className="rating">
                  {overallRating}
                </span>
                <span className="save-text">
                  Click to save
                </span>
              </div>
            )}
          </div>
        )}

      </div>
    </CardWrapper>
  );
}
