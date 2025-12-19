import React, { useState, useEffect } from "react";
import "./AddReviewPage.css";
import { Header } from "../Header";
import Chyura from '../../assets/Chyura.png';
import StarFilled from '../../assets/star_filled.png';
import StarEmpty from '../../assets/star_empty.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddReviewPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [visitDate, setVisitDate] = useState(null);
  const [ratings, setRatings] = useState({
    location: 0,
    ambience: 0,
    food: 0,
    service: 0,
    value: 0,
  });


  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos, ...files].slice(0, 5);
    setPhotos(newPhotos);
  };

  const renderStars = (category) => {
    return [...Array(5)].map((_, i) => {
      const starNumber = i + 1;
      const isActive = starNumber <= ratings[category];
      return (
        <img
          key={starNumber}
          src={isActive ? StarFilled : StarEmpty}
          alt="star"
          className="star"
          onClick={() => setRatings({ ...ratings, [category]: starNumber })}
        />
      );
    });
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      const data = {
        name: "Himalayan Bistro",
        location: "Inside Thamel, Kathmandu",
        image: Chyura,
      };
      setRestaurant(data);
    };
    fetchRestaurant();
  }, []);

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

            <div className="rating-row">
              <label>Location</label>
              {renderStars("location")}
            </div>
            <div className="rating-row">
              <label>Ambience</label>
              {renderStars("ambience")}
            </div>
            <div className="rating-row">
              <label>Food</label>
              {renderStars("food")}
            </div>
            <div className="rating-row">
              <label>Service</label>
              {renderStars("service")}
            </div>
            <div className="rating-row">
              <label>Value</label>
              {renderStars("value")}
            </div>

            <label>When did you go?</label>
<div className="datepicker-wrapper">
  <DatePicker
    selected={visitDate}
    onChange={(date) => setVisitDate(date)}
    placeholderText="Select date"
    className="dropdown" // This applies to the <input>
  />
</div>

            <label htmlFor="visit-company">Whom did you go with?</label>
            <select id="visit-company" className="dropdown">
              <option value="">Select option</option>
              <option>Business</option>
              <option>Friends</option>
              <option>Family</option>
            </select>

            <label htmlFor="review-text">Write your review</label>
            <textarea id="review-text" className="review-text"></textarea>

            <label htmlFor="review-title">Title your review</label>
            <input id="review-title" type="text" className="title-input" />

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
                    onClick={() => {
                      const newPhotos = photos.filter((_, i) => i !== index);
                      setPhotos(newPhotos);
                    }}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
            </div>

            <button className="submit-btn">Submit Review</button>
          </div>
        </div>
      </div>
    </>
  );
}