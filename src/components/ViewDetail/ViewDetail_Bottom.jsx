import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewDetail_Bottom.css";

export default function ViewDetail_Bottom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch reviews
  const fetchReviews = async () => {
  try {
    // NOTE: use /restaurant/:id
    const res = await fetch(`http://localhost:5000/api/reviews/restaurant/${id}`);
    const data = await res.json();
    setReviews(data.data || []);
  } catch (err) {
    console.error("Error fetching reviews:", err);
  }
};

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const toggleLike = (reviewId) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.reviewId !== reviewId) return review;

        const currentLikes = Number(review.likes) || 0;
        return {
          ...review,
          liked: !review.liked,
          likes: review.liked ? currentLikes - 1 : currentLikes + 1,
        };
      })
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="review-page">
      <h3>Reviews</h3>

      {/* FILTER + WRITE REVIEW */}
      <div className="filters">
        <div className="filter-group">
          <button>Traveller ▼</button>
          <button>Ratings ▼</button>
          <button>Time ▼</button>
        </div>

        <button
          className="write-review"
          onClick={() => navigate(`/restaurant/${id}/add-review`)}
        >
          ✏️ Write a Review
        </button>
      </div>

      {/* REVIEWS LIST */}
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first one!</p>
      ) : (
        reviews.map((review) => (
          <div className="review-card" key={review.reviewId}>
            <div className="review-header">
              <div className="user">
                <img
                  src={review.profile || "https://i.pravatar.cc/40"}
                  alt={review.username}
                />
                <div>
                  <strong>{review.username}</strong>
                  <small>{review.contributions || 1} contributions</small>
                </div>
              </div>

              <div className="review-actions">
                <button
                  className={`like-btn ${review.liked ? "liked" : ""}`}
                  onClick={() => toggleLike(review.reviewId)}
                >
                  👍 {review.likes || 0}
                </button>

                <div className="menu-wrapper">
                  <button
                    className="menu-btn"
                    onClick={() =>
                      setOpenMenuId(openMenuId === review.reviewId ? null : review.reviewId)
                    }
                  >
                    ⋯
                  </button>

                  {openMenuId === review.reviewId && (
                    <div className="menu-dropdown">
                      <button>✏️ Edit</button>
                      <button>🗑 Delete</button>
                      <button>🚩 Report</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="review-body">
              <span className="stars">
                {"★".repeat(Math.round(review.totalRating)) + "☆".repeat(5 - Math.round(review.totalRating))}
              </span>
              <h4>{review.title}</h4>
              <small>
                {formatDate(review.visitDate)}{" "}
                {review.visitCompany ? `• ${review.visitCompany}` : ""}
              </small>
              <p>{review.text}</p>

              {review.photos && review.photos.length > 0 && (
                <div className="review-images">
                  {review.photos.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:5000/uploads/reviewPhotos/${img}`} // correct path
                      alt={`review-${i}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
