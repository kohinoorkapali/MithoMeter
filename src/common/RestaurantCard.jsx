import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import './RestaurantCard.css';

import locationIcon from "../assets/location.png";
import menuIcon from "../assets/menu.png";
import priceIcon from "../assets/tag.png";
import cuisineIcon from "../assets/dish.png";
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
  const [reviews, setReviews] = useState([]);

  /* ---------------- IMAGE ---------------- */

  const restaurantImage =
    item.photos && item.photos.length > 0
      ? `http://localhost:5000/${item.photos[0].replace(/\\/g, "/")}`
      : "/placeholder.png";

  /* ---------------- ADMIN ---------------- */

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/restaurants/edit/${item.restaurantId}`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      `Delete ${item.name}?`
    );

    if (!confirm) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/restaurants/${item.restaurantId}`
      );

      onDelete?.(item.restaurantId);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ---------------- DATA ---------------- */

  const cuisines = Array.isArray(item.cuisines)
    ? item.cuisines.join(", ")
    : item.cuisines || "No cuisines";

  const priceRange = Array.isArray(item.priceRange)
    ? item.priceRange.join(", ")
    : item.priceRange || "Price N/A";

  /* ---------------- REVIEWS ---------------- */

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/reviews/restaurant/${item.restaurantId}`
        );

        const data = await res.json();
        setReviews(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [item.restaurantId]);

  const overallRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (s, r) => s + Number(r.totalRating || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : "N/A";

  /* ---------------- FAVORITES ---------------- */

  useEffect(() => {
    const checkFav = async () => {
      if (!currentUser) return;

      try {
        const favs = await callApi(
          "GET",
          `/favorites/${currentUser.id}`
        );

        const exists = favs.some(
          (f) =>
            Number(f.restaurantId) ===
            Number(item.restaurantId)
        );

        setIsSaved(exists);
      } catch (err) {
        console.error(err);
      }
    };

    checkFav();
  }, [currentUser, item.restaurantId, callApi]);

  const toggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      alert("Login first");
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
      console.error(err);
    }
  };

  /* ================= RENDER ================= */

  return (
    <Link
      to={`/restaurant/${item.restaurantId}`}
      state={{ currentUser }}
      className="restaurant-card"
    >
      {/* IMAGE */}
      <div className="card-image">
        <img src={restaurantImage} alt={item.name} />
      </div>

      {/* COMPARE */}
      <div
        className={`compare-select ${
          isSelected ? "selected" : ""
        }`}
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

        <p className="line">
          <img src={locationIcon} className="icon" />
          {item.location || "Unknown"}
        </p>

        <p className="line">
          <img src={cuisineIcon} className="icon" />
          {cuisines}
        </p>

        <p className="line">
          <img src={priceIcon} className="icon" />
          {priceRange}
        </p>

        {item.menuLink && (
          <button
            className="menu-link-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(item.menuLink);
            }}
          >
            <img src={menuIcon} className="icon" />
            Menu
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="card-right">

        {/* ADMIN */}
        {role === "admin" && (
          <div className="admin-actions">
            <button
              className="edit-btn"
              onClick={handleEdit}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}

        {/* USER */}
        {role !== "admin" && (
          <div className="user-toggle" onClick={toggleSave}>
            {isSaved ? (
              <div className="saved-wrapper">
                <img
                  src={heartIcon}
                  className="heart-big"
                />
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
