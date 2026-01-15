// src/pages/AddReviewPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddReviewPage.css";
import { Header } from "../Header";
import Chyura from '../../assets/Chyura.png';
import StarFilled from '../../assets/star_filled.png';
import StarEmpty from '../../assets/star_empty.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiRequest } from "../../utils/api.js";

export default function AddReviewPage({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [ratings, setRatings] = useState({
    location: 0,
    ambience: 0,
    food: 0,
    service: 0,
    value: 0,
  });
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [photos, setPhotos] = useState([]);
  const [visitDate, setVisitDate] = useState(null);
  const [visitCompany, setVisitCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("Current User:", currentUser);

  if (!currentUser) return null; // wait for user to load

  // Fetch restaurant info by ID
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setRestaurant({
          restaurantId: parseInt(id),
          name: "Himalayan Bistro",
          location: "Inside Thamel, Kathmandu",
          image: Chyura,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch restaurant");
      }
    };
    fetchRestaurant();
  }, [id]);

  // Star rendering
  const renderStars = (category) =>
    [...Array(5)].map((_, i) => {
      const starNum = i + 1;
      const isActive = starNum <= ratings[category];
      return (
        <img
          key={starNum}
          src={isActive ? StarFilled : StarEmpty}
          alt="star"
          className="star"
          onClick={() => setRatings({ ...ratings, [category]: starNum })}
        />
      );
    });

  // Photo upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files].slice(0, 5));
  };

  // Submit review
  const handleSubmitReview = async () => {
  setError("");

  if (!reviewTitle.trim() || !reviewText.trim()) {
    setError("Please provide a title and review text.");
    return;
  }

  if (!restaurant || !restaurant.restaurantId) {
    setError("Restaurant info missing.");
    return;
  }

  const totalRating =
    Object.values(ratings).reduce((sum, r) => sum + r, 0) /
    Object.keys(ratings).length;

  const formData = new FormData();
  formData.append("restaurantId", restaurant.restaurantId);
  formData.append("userId", currentUser.id);
  formData.append("username", currentUser.username);
  formData.append("title", reviewTitle);
  formData.append("text", reviewText);
  formData.append("ratings", JSON.stringify(ratings));
  formData.append("totalRating", totalRating);
  formData.append("visitDate", visitDate?.toISOString() || "");
  formData.append("visitCompany", visitCompany);

  // send real image files
  photos.forEach((file) => {
    formData.append("photos", file);
  });

  console.log("Sending review with files:", photos);

  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      body: formData,        // IMPORTANT
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Review submitted!");
      navigate(`/restaurant/${restaurant.restaurantId}`);
    } else {
      setError(data.message || "Failed to submit review");
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
    setError("Failed to submit review");
  }
};
  return (
    <>
      <Header />
      <div className="review-page">
        <div className="review-container">
          {/* LEFT SECTION */}
          <div className="left-section">
            <h1>How high does it rank on your MithoMeter?</h1>
            <p className="subtitle">
              Tell us if the food was mitho, mid, or meh — your review helps others.
            </p>

            {restaurant && (
              <div className="restaurant-card">
                <img src={restaurant.image} alt={restaurant.name} />
                <h3>{restaurant.name}</h3>
                <p>{restaurant.location}</p>
              </div>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="right-section">
            <h3>Rate your experience</h3>

            {["location", "ambience", "food", "service", "value"].map(cat => (
              <div className="rating-row" key={cat}>
                <label>{cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
                {renderStars(cat)}
              </div>
            ))}

            <div className="rating-divider"></div>

            <label>When did you go?</label>
            <div className="datepicker-wrapper">
              <DatePicker
                selected={visitDate}
                onChange={(date) => setVisitDate(date)}
                placeholderText="Select date"
                className="dropdown"
                maxDate={new Date()}
              />
            </div>

            <label>Whom did you go with?</label>
            <select
              className="dropdown"
              value={visitCompany}
              onChange={(e) => setVisitCompany(e.target.value)}
            >
              <option value="">Select option</option>
              <option>Business</option>
              <option>Friends</option>
              <option>Family</option>
              <option>Solo</option>
            </select>

            <label>Write your review</label>
            <textarea
              className="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <label>Title your review</label>
            <input
              className="title-input"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />

            {/* PHOTO UPLOAD */}
            <div className="photo-upload-container">
              <input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="photo-upload" className="photo-box">
                Add Photo
              </label>

              <div className="photo-preview">
                {photos.map((photo, index) => (
                  <div className="uploaded-photo-wrapper" key={index}>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`upload-${index}`}
                      className="uploaded-photo"
                    />
                    <span
                      className="remove-photo"
                      onClick={() =>
                        setPhotos(photos.filter((_, i) => i !== index))
                      }
                    >
                      &times;
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className="submit-btn" onClick={handleSubmitReview} disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
