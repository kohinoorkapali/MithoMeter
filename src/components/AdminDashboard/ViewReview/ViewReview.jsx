import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./ViewReview.css";
import { apiRequest } from "../../../utils/api";

export default function ViewReview() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchReportedReviews();
  }, []);

  const fetchReportedReviews = async () => {
    try {
      const res = await apiRequest("GET", "/admin/reported-reviews");
      setReviews(res || []);
    } catch (err) {
      console.error("Failed to fetch reported reviews", err);
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
  
      await apiRequest(
        "PATCH",
        `/admin/reported-reviews/${selectedReview.reviewId}`
      );
  
      setReviews((prev) =>
        prev.filter((r) => r.reviewId !== selectedReview.reviewId)
      );
  
      toast.success("Review approved successfully");
      closeModal();
    } catch (err) {
      toast.error("Failed to approve review");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedReview) return;
  
    if (!window.confirm("Are you sure you want to delete this review?")) return;
  
    try {
      setLoading(true);
  
      const res = await apiRequest(
        "DELETE",
        `/admin/reported-reviews/${selectedReview.reviewId}`
      );
  
      // Remove from UI list
      setReviews((prev) =>
        prev.filter((r) => r.reviewId !== selectedReview.reviewId)
      );
  
      toast.success(
        res?.message || "Review deleted and user notified successfully"
      );
  
      closeModal();
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Failed to delete review";
  
      toast.error(msg);
      console.error("Delete review error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  
  const closeModal = () => {
    setSelectedReview(null);
  };

  return (
    <div className="reviews-page">
      {/* Header */}
      <div className="reviews-header">
        <h2>Reported Reviews</h2>
        <p>{reviews.length} reported</p>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 && <p>No reported reviews</p>}

        {reviews.map((item) => (
          <div
            className="review-card"
            key={item.reviewId}
            onClick={() => setSelectedReview(item)}
          >
            <img src="/images/user.png" alt="profile" className="profile-img" />
            <div>
              <h3>{item.username}</h3>
              <small>
                Reported on: {new Date(item.reportedAt).toLocaleString()}
              </small>
            </div>
          </div>
        ))}

      </div>

      {/* Modal */}
      {selectedReview && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Reported Review</h3>

            <p><strong>User:</strong> {selectedReview.username}</p>

            <p><strong>Review:</strong></p>
            <p className="review-text">{selectedReview.text}</p>

            <p>
              <strong>Reported at:</strong>{" "}
              {new Date(selectedReview.reportedAt).toLocaleString()}
            </p>

            <div className="modal-actions">
              <button className="accept-btn" 
                onClick={handleApprove} 
                disabled={loading}> 
                {loading ? "Approving..." : "Approve"}
              </button>
              
              <button
                className="remove-btn"
                onClick={handleDelete}
                disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </button>

              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
