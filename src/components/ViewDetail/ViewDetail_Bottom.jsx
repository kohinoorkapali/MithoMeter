import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import "./ViewDetail_Bottom.css";
import personIcon from "../../assets/person.png";
import likeIcon from "../../assets/like.png";        
import likedIcon from "../../assets/liked.png";
import { toast } from "react-hot-toast"; 

export default function ViewDetail_Bottom({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  const [showTraveller, setShowTraveller] = useState(false);
const [showRating, setShowRating] = useState(false);
const [showTime, setShowTime] = useState(false);

const [travellerFilter, setTravellerFilter] = useState("All");
const [ratingSort, setRatingSort] = useState("");
const [timeSort, setTimeSort] = useState("");


  // Fetch reviews
  const fetchReviews = async () => {
    try {
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

  
const toggleLike = async (reviewId) => {
  if (!currentUser || !currentUser.id) {
    console.warn("No current user set");
    return alert("Please login to like");
  }

  try {
    const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Like failed:", data);
      return;
    }

    // Update likes in state immediately
    setReviews((prev) =>
      prev.map((r) =>
        r.reviewId === reviewId ? { ...r, likes: data.likes, liked: data.liked } : r
      )
    );
  } catch (err) {
    console.error("Like error:", err);
  }
};


  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getAverage = (key) => {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, r) => {
    let ratings = r.ratings;

    // Parse if string
    if (typeof ratings === "string") {
      try {
        ratings = JSON.parse(ratings);
      } catch {
        ratings = {};
      }
    }

    const value = ratings && ratings[key] ? Number(ratings[key]) : 0;
    return acc + value;
  }, 0);

  return (sum / reviews.length).toFixed(1);
};

  const overallRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + (Number(r.totalRating) || 0), 0) /
        reviews.length
      ).toFixed(1)
    : 0;

  const categoryRatings = [
    { label: "Location", score: getAverage("location") },
    { label: "Ambience", score: getAverage("ambience") },
    { label: "Food", score: getAverage("food") },
    { label: "Service", score: getAverage("service") },
    { label: "Value", score: getAverage("value") },
  ];

  const grading = {
    Excellent: reviews.filter((r) => r.totalRating >= 4.5).length,
    Good: reviews.filter((r) => r.totalRating >= 3.5 && r.totalRating < 4.5).length,
    Average: reviews.filter((r) => r.totalRating >= 2.5 && r.totalRating < 3.5).length,
    Poor: reviews.filter((r) => r.totalRating >= 1.5 && r.totalRating < 2.5).length,
    Terrible: reviews.filter((r) => r.totalRating < 1.5).length,
  };

  const getProfileImage = (profile) => {
    if (!profile) return personIcon; // fallback if empty
    return `http://localhost:5000/uploads/profile/${profile}`;
  };

  const totalReviews = reviews.length;
  //REPORT BUTTON
  const reportReview = async (reviewId) =>{
    try{
      await apiRequest("POST", `/reviews/${reviewId}/report`);
      alert("Review reported")
    }catch(err){
      toast.error(err.message || "Failed to load reports");
    }
  }

  async function handleDelete(reviewId) {
  if (!window.confirm("Are you sure you want to delete this review?")) return;

  // Optional: Show a "Loading" toast
  const loadingToast = toast.loading("Deleting review...");

  try {
    const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id }),
    });

    if (res.ok) {
      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success("Review deleted successfully!");
      
      setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId));
      setOpenMenuId(null);
    } else {
      toast.dismiss(loadingToast);
      const errorData = await res.json();
      toast.error(errorData.message || "Failed to delete");
    }
  } catch (err) {
    toast.dismiss(loadingToast);
    toast.error("Network error. Please try again.");
  }
}
const filteredReviews = [...reviews]
  .filter(r => travellerFilter === "All" || r.visitCompany === travellerFilter)
  .sort((a, b) => {
    if (ratingSort === "Highest") return b.totalRating - a.totalRating;
    if (ratingSort === "Lowest") return a.totalRating - b.totalRating;
    if (timeSort === "Newest") return new Date(b.visitDate) - new Date(a.visitDate);
    if (timeSort === "Oldest") return new Date(a.visitDate) - new Date(b.visitDate);

    // default newest first
    return new Date(b.visitDate) - new Date(a.visitDate);
  });





  return (
    <div className="review-page">
      <div className="review-summary">
        <div className="overall-score-wrapper">
          <h2 className="summary-heading">Overall Rating</h2>
          <div className="overall-score">
            <div className="score">{overallRating}</div>
            <div className="overall-meta">
              <div className="label">
                {overallRating >= 4.5
                  ? "Excellent"
                  : overallRating >= 3.5
                  ? "Good"
                  : overallRating >= 2.5
                  ? "Average"
                  : overallRating >= 1.5
                  ? "Poor"
                  : "Terrible"}
              </div>
              <div className="count">({totalReviews} reviews)</div>
            </div>
          </div>
        </div>

        <div className="ratings-right">
          <div className="rating-breakdown">
            <h4>Rating Descriptors</h4>
            {Object.entries(grading).map(([label, count], i) => (
              <div className="rating-row" key={i}>
                <span>{label}</span>
                <div className="bar">
                  <div
                    className="fill"
                    style={{
                      width: totalReviews ? `${(count / totalReviews) * 100}%` : "0%",
                    }}
                  />
                </div>
                <span>{count}</span>
              </div>
            ))}
          </div>

          <div className="rating-breakdown">
            <h4>Rating Categories</h4>
            {categoryRatings.map((item, i) => (
              <div className="rating-row" key={i}>
                <span>{item.label}</span>
                <div className="bar">
                  <div className="fill" style={{ width: `${item.score * 20}%` }}></div>
                </div>
                <span>{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3>Reviews</h3>

      <div className="filters">
       <div className="filter-group">

         {/* Traveller */}
          <div className="dropdown-wrapper">
           <button onClick={() => setShowTraveller(!showTraveller)}>Traveller ▼</button>

            {showTraveller && (
             <div className="dropdown-menu">
             {["All", "Friends", "Solo", "Business", "Family"].map(type => (
             <div
               key={type}
               className="dropdown-item"
               onClick={() => {
                  setTravellerFilter(type);
                  setShowTraveller(false);
                }}
              >
                {type}
              </div>
            ))}
          </div>
        )}
       </div>

        {/* Ratings */}
        <div className="dropdown-wrapper">
          <button onClick={() => setShowRating(!showRating)}>Ratings ▼</button>
          {showRating && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => { setRatingSort("Highest"); setTimeSort(""); setShowRating(false); }}
              >
                Highest rating
              </div>
              <div
                className="dropdown-item"
                onClick={() => { setRatingSort("Lowest"); setTimeSort(""); setShowRating(false);
                }}
              >
                Lowest rating
              </div>
            </div>
          )}
        </div>

        {/* Time */}
        <div className="dropdown-wrapper">
          <button onClick={() => setShowTime(!showTime)}>Time ▼</button>
          {showTime && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => {setTimeSort("Newest"); setRatingSort(""); setShowTime(false);
                }}
              >
                Newest
              </div>
              <div
                className="dropdown-item"
                onClick={() => { setTimeSort("Oldest"); setRatingSort(""); setShowTime(false);
                }}
              >
                Oldest
              </div>
            </div>
          )}
        </div>

       </div>

        <button
          className="write-review"
          onClick={() => navigate(`/restaurant/${id}/add-review`)}
        >
          ✏️ Write a Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first one!</p>
      ) : (
        filteredReviews.map((review) => {
           console.log("Full Review Data:", review);
          return (
            <div className="review-card" key={review.reviewId}>
              <div className="review-header">
                <div className="user">
                  <img
                    src={getProfileImage(review.profile)}
                    alt={review.username}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = personIcon;
                    }}
                  />
                  <div>
                    <strong>{review.username}</strong>
                    <small>{review.contributions || 1} contributions</small>
                  </div>
                </div>

                <div className="review-actions">
                  <button
                    className="like-btn"
                    onClick={() => toggleLike(review.reviewId)}
                  >
                    <img
                      src={review.liked ? likedIcon : likeIcon}
                      alt="like"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span>{review.likes || 0}</span>
                  </button>


                  <div className="menu-wrapper">
                    <button
                      className="menu-btn"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === review.reviewId ? null : review.reviewId
                        )
                      }
                    >
                      ⋯
                    </button>

                   {openMenuId === review.reviewId && (
                     <div className="menu-dropdown">
                         {/* Case 1: The person logged in IS the author */}
                         {currentUser?.id === review.userId ? (
                             <>
                               <button
                                  onClick={() => navigate(`/restaurant/${id}/add-review?edit=${review.reviewId}`)}
                                >
                                  ✏️ Edit
                                </button>
             
                               <button onClick={() => handleDelete(review.reviewId)}>
                                  🗑 Delete
                                </button>                           
                                  </>
                            ) : (
                             <button>🚩 Report</button>
                           )}
                      </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="review-body">
                <span className="stars">
                  {"★".repeat(Math.round(review.totalRating)) +
                    "☆".repeat(5 - Math.round(review.totalRating))}
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
                        src={`http://localhost:5000/uploads/reviewPhotos/${img}`}
                        alt={`review-${i}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
