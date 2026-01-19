import React, { useEffect, useState } from "react";
import { Header } from "../Header.jsx";
import { apiRequest } from "../../utils/api.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Spinner, Card } from "react-bootstrap";

export default function OwnReviewsPage({ currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = currentUser?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await apiRequest("GET", `/reviews/user/${userId}`);
        setReviews(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (!currentUser) return <p>Loading user...</p>;

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h1 className="text-center mb-4">My Reviews</h1>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <span className="ms-2">Loading your reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center">You haven't submitted any reviews yet.</div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {reviews.map((review) => {
              const restaurantImage =
                review.restaurantPhotos && review.restaurantPhotos.length > 0
                  ? `http://localhost:5000/uploads/${review.restaurantPhotos[0]}`
                  : "/placeholder.png";

              return (
                <Link
                  key={review.reviewId}
                  to={`/restaurant/${review.restaurantId}`}
                  state={{ currentUser }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card
                    className="shadow-sm"
                    style={{
                      backgroundColor: "#FFF7EC",
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      maxWidth: "900px",
                      padding: "20px",
                      gap: "20px",
                      marginLeft: "50px",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Restaurant Image */}
                    <img
                      src={restaurantImage}
                      alt={review.restaurantName}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />

                    {/* Review Info */}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontWeight: 700,
                          fontSize: "1.5rem",
                          marginBottom: "10px",
                        }}
                      >
                        {review.restaurantName}
                      </h3>
                      <h5
                        style={{
                          fontWeight: 500,
                          fontSize: "1.2rem",
                          marginBottom: "8px",
                        }}
                      >
                        {review.title}
                      </h5>
                      <p style={{ fontSize: "1rem", color: "#333" }}>
                        {review.text}
                      </p>
                      {review.visitDate && (
                        <p style={{ fontSize: "0.9rem", color: "#333" }}>
                          <strong>Visited on:</strong>{" "}
                          {new Date(review.visitDate).toLocaleDateString()}
                        </p>
                      )}
                      {review.visitCompany && (
                        <p style={{ fontSize: "0.9rem", color: "#333" }}>
                          <strong>Went with:</strong> {review.visitCompany}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/profile" className="btn btn-secondary">
            Back to Profile
          </Link>
        </div>
      </div>
    </>
  );
}
