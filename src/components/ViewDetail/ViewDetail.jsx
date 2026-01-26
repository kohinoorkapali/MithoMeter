import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { Header } from "../Header.jsx";
import "./ViewDetail.css";
import ViewDetail_Bottom from "./ViewDetail_Bottom.jsx";
import websiteIcon from "../../assets/website.png";
import locationIcon from "../../assets/location.png";
import menuIcon from "../../assets/menu.png";
import priceIcon from "../../assets/tag.png";
import cuisineIcon from "../../assets/dish.png";
import openIcon from "../../assets/open.png";
import placeholderImg from "../../assets/Chyura.png";
import heartEmptyIcon from "../../assets/heart-empty.png";
import heartFilledIcon from "../../assets/heart-filled.png";

function ViewDetail({ currentUser }) {
  const { id } = useParams();
  const { callApi } = useApi();

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await callApi("GET", `/restaurants/${id}`);
        setRestaurant(data.data);
      } catch (err) {
        // handle error silently
      }
    };
    fetchRestaurant();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await callApi("GET", `/reviews/restaurant/${id}`);
        setReviews(data.data || []);
      } catch (err) {
        // handle error silently
      }
    };
    fetchReviews();
  }, [id]);

  // Fetch favorite status
  useEffect(() => {
    if (!currentUser?.id || !restaurant?.restaurantId) return;

    const fetchFavorite = async () => {
      try {
        const data = await callApi("GET", `/favorites/${currentUser.id}`);
        const exists = data.some(
          (fav) => Number(fav.restaurantId) === Number(restaurant.restaurantId)
        );
        setIsFavorite(exists);
      } catch (err) {
        // handle error silently
      }
    };

    fetchFavorite();
  }, [currentUser, restaurant]);

  // Toggle favorite
  const toggleFavorite = async () => {
    if (!currentUser || !restaurant?.restaurantId) return;

    const userIdNum = Number(currentUser.id);
    const restaurantIdNum = Number(restaurant.restaurantId);

    try {
      if (isFavorite) {
        await callApi("DELETE", `/favorites/${userIdNum}/${restaurantIdNum}`);
        setIsFavorite(false);
      } else {
        await callApi("POST", `/favorites/save`, {
          data: { userId: userIdNum, restaurantId: restaurantIdNum },
        });
        setIsFavorite(true);
      }
    } catch (err) {
      // handle error silently
    }
  };

  if (!restaurant) return <p>Loading...</p>;

  const cuisines = Array.isArray(restaurant.cuisines)
    ? restaurant.cuisines.join(", ")
    : restaurant.cuisines || "N/A";

  const priceRange = Array.isArray(restaurant.priceRange)
    ? restaurant.priceRange.join(", ")
    : restaurant.priceRange || "N/A";

  const features =
    Array.isArray(restaurant.features) && restaurant.features.length > 0
      ? restaurant.features
      : ["No features listed"];

  const images =
    Array.isArray(restaurant.photos) && restaurant.photos.length > 0
      ? restaurant.photos
      : [];

  const totalImages = images.length;
  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);

  return (
    <>
      <Header />

      <div className="ViewDetail-container">
        <h1 className="ViewDetail-title">{restaurant.name || "No Name"}</h1>

        <div className="overview-line">
          <div className="item rating">
            <span>
              {reviews.length > 0
                ? (
                    reviews.reduce(
                      (sum, r) => sum + (Number(r.totalRating) || 0),
                      0
                    ) / reviews.length
                  ).toFixed(1)
                : "N/A"}{" "}
              ({reviews.length} reviews)
            </span>
          </div>

          <div className="item dish">
            <img src={cuisineIcon} alt="Dish" className="icon" />
            <span>{cuisines}</span>
          </div>

          <div className="item price">
            <img src={priceIcon} alt="Price" className="icon" />
            <span>{priceRange}</span>
          </div>

          <div
            className="item favorite"
            onClick={toggleFavorite}
            style={{ cursor: restaurant ? "pointer" : "not-allowed" }}
          >
            <img
              src={isFavorite ? heartFilledIcon : heartEmptyIcon}
              alt="Favorite"
              className="heart-icon"
            />
          </div>
        </div>

        {/* Image carousel */}
        <div className="image-carousel">
          {totalImages > 0 ? (
            <>
              <button className="nav-btn left" onClick={prevImage}>
                ‹
              </button>
              <img
                src={`http://localhost:5000${images[currentIndex]}`}
                alt={`Restaurant ${currentIndex}`}
                className="carousel-img"
                onError={(e) => (e.target.src = placeholderImg)}
              />
              <button className="nav-btn right" onClick={nextImage}>
                ›
              </button>
              <div className="image-counter">
                {currentIndex + 1} / {totalImages}
              </div>
            </>
          ) : (
            <img src={placeholderImg} alt="No Restaurant" className="carousel-img" />
          )}
        </div>

        {/* Overview */}
        <section className="overview-left">
          <h2>Overview</h2>
          <ul className="overview-list">
            <li className="overview-item">
              <img src={openIcon} alt="Time" className="icon" />
              <strong>Time:</strong>{" "}
              {restaurant.openTime && restaurant.closeTime
                ? `${restaurant.openTime} - ${restaurant.closeTime}`
                : "N/A"}
            </li>
            <li className="overview-item">
              <img src={locationIcon} alt="Location" className="icon" />
              <strong>Location:</strong> {restaurant.location || "N/A"}
            </li>
            <li className="overview-item">
              <img src={cuisineIcon} alt="Dish" className="icon" />
              <strong>Cuisines:</strong> {cuisines}
            </li>
            <li className="overview-item">
              <img src={priceIcon} alt="Price" className="icon" />
              <strong>Price Range:</strong> {priceRange}
            </li>
            <li className="overview-link">
              <img src={menuIcon} alt="Menu" className="icon" />
              <strong>
                <a
                  href={restaurant.menuLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Menu
                </a>
              </strong>
            </li>
            <li className="overview-link">
              <img src={websiteIcon} alt="Website" className="icon" />
              <strong>
                <a
                  href={restaurant.websiteLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </strong>
            </li>
          </ul>
        </section>

        <section className="left-section">
          <h2>About</h2>
          <p>{restaurant.description || "No description available."}</p>

          <h2>Features</h2>
          <ul className="features-list">
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>

        <ViewDetail_Bottom currentUser={currentUser} />
      </div>
    </>
  );
}

export default ViewDetail;
