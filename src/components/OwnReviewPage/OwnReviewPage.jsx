import React, { useEffect, useState } from "react";
import { Header } from "../Header.jsx";
import { apiRequest } from "../../utils/api.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Spinner, Card } from "react-bootstrap";
import useNotifications from '../../hooks/useNotifications.js';

import "./OwnReviewPage.css";


export default function OwnReviewsPage({ currentUser }) {
  //Notification
  useNotifications();

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
                ? `http://localhost:5000/uploads/restaurants/${review.restaurantPhotos[0]}`
                : "/placeholder.png";

              return (
                <Link
                  key={review.reviewId}
                  to={`/restaurant/${review.restaurantId}`}
                  state={{ currentUser }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card className="review-card shadow-sm">
                    {/* Restaurant Image */}
                    <img
                      src={restaurantImage}
                      alt={review.restaurantName}
                      className="review-image"
                    />

                    {/* Review Info */}
                    <div className="review-content">
                      <h3>{review.restaurantName}</h3>
                      <h5>{review.title}</h5>
                      <p>{review.text}</p>
                      {review.visitDate && (
                        <p>
                          <strong>Visited on:</strong>{" "}
                          {new Date(review.visitDate).toLocaleDateString()}
                        </p>
                      )}
                      {review.visitCompany && (
                        <p>
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
      </div>
    </>
  );
}
