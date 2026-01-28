import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  isSelected,
  onSelect,
  onDelete,
}) {
  const { callApi } = useApi();
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [reviews, setReviews] = useState([]);

  /* ----------------------------------
     IMAGE
  ---------------------------------- */
  const restaurantImage = item.photos?.length
  ? `http://localhost:5000${item.photos[0]}`
  : "/placeholder.png";

  /* ----------------------------------
     ADMIN ACTIONS
  ---------------------------------- */

  const handleEdit = () => {
    navigate(`/restaurants/edit/${item.restaurantId}`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ${item.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });
  
    if (!result.isConfirmed) return;
  
    const loadingToast = toast.loading("Deleting restaurant...");
  
    try {
      await axios.delete(
        `http://localhost:5000/api/restaurants/${item.restaurantId}`
      );
  
      toast.dismiss(loadingToast);
  
      toast.success("Restaurant deleted successfully 🗑️");
  
      // Update UI
      onDelete?.(item.restaurantId);
  
    } catch (error) {
      console.error("Delete failed", error);
  
      toast.dismiss(loadingToast);
  
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
    // If not logged in
    if (!currentUser) {
      await Swal.fire({
        title: "Login Required",
        text: "Please login to save restaurants.",
        icon: "info",
        confirmButtonColor: "#2563eb",
      });
  
      return;
    }
  
    const loadingToast = toast.loading(
      isSaved ? "Removing from favorites..." : "Saving to favorites..."
    );
  
    try {
      if (isSaved) {
        await callApi(
          "DELETE",
          `/favorites/${currentUser.id}/${item.restaurantId}`
        );
  
        toast.dismiss(loadingToast);
        toast.success("Removed from favorites ❤️‍🩹");
  
        setIsSaved(false);
  
      } else {
        await callApi("POST", "/favorites/save", {
          data: {
            userId: currentUser.id,
            restaurantId: item.restaurantId,
          },
        });
  
        toast.dismiss(loadingToast);
        toast.success("Added to favorites ❤️");
  
        setIsSaved(true);
      }
  
      // Update parent if needed
      onToggleFavorite?.(item.restaurantId);
  
    } catch (err) {
      console.error("Favorite toggle error:", err);
  
      toast.dismiss(loadingToast);
  
      toast.error("Failed to update favorites ❌");
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
    <Link
      to={`/restaurant/${item.restaurantId}`}
      state={{ currentUser }}
      className="restaurant-card"
      style={{ textDecoration: "none", color: "inherit" }}
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
    </Link>
  );
}
