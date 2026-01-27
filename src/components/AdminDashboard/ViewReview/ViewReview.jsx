import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./ViewReview.css";
import { apiRequest } from "../../../utils/api";
import { DropdownFilter } from "../../../common/DropdownFilter.jsx";

export default function ViewReview() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const statusOptions = [
    { label: "Pending", value: "pending" },   // reported, not resolved
    { label: "Approved", value: "approved" }, // approved/visible
    { label: "Hidden", value: "hidden" },     // removed
  ];
  
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
  
      // Update flags in UI (instead of removing)
      setReviews((prev) =>
        prev.map((r) =>
          r.reviewId === selectedReview.reviewId
            ? {
                ...r,
                isReported: false,
                isHidden: false,
              }
            : r
        )
      );
      toast.success("Review approved");
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
  
    if (!window.confirm("Hide this review?")) return;
  
    try {
      setLoading(true);
  
      await apiRequest(
        "DELETE",
        `/admin/reported-reviews/${selectedReview.reviewId}`
      );
  
      // Update flags in UI
      setReviews((prev) =>
        prev.map((r) =>
          r.reviewId === selectedReview.reviewId
            ? {
                ...r,
                isHidden: true,
                isReported: false,
              }
            : r
        )
      );
  
      toast.success("Review hidden");
      closeModal();
    } catch (err) {
      toast.error("Failed to hide review");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };  
  
  const closeModal = () => {
    setSelectedReview(null);
  };

  return (
    <div className="view-reviews-page">
      {/* Header */}
      <div className="reviews-header">
        <div>
          <h2>Reported Reviews</h2>
          <p>{reviews.length} reported</p>
        </div>
        <DropdownFilter
          title="Status"
          options={statusOptions}
          selectedValues={selectedStatuses}
          onChange={setSelectedStatuses}
        />
      </div>


      <div className="reviews-list">
        {reviews.length === 0 && <p>No reported reviews</p>}

        {reviews
        .filter((r) => {
          // No filter → show all
          if (selectedStatuses.length === 0) return true;

          return selectedStatuses.some((status) => {
            if (status === "pending") {
              return r.isReported === true && r.isHidden === false;
            }

            if (status === "approved") {
              return r.isReported === false && r.isHidden === false;
            }

            if (status === "hidden") {
              return r.isHidden === true;
            }

            return false;
          });
        })
        .map((item) => (
          <div
            className="review-card"
            key={item.reviewId}
            onClick={() => setSelectedReview(item)}
          >
            <img
              src={
                item.user?.profile_image
                  ? `http://localhost:5000/uploads/profile/${item.user.profile_image}`
                  : "/images/user.png"
              }
              alt={item.user?.username || "User"}
              className="profile-img"
            />

            <h3>{item.user?.username}</h3>
            
            <div>
              <h3>{item.username}</h3>
              <span className={`status-badge ${
                item.isHidden
                  ? "hidden"
                  : item.isReported
                  ? "pending"
                  : "approved"
              }`}>
                {item.isHidden
                  ? "Hidden"
                  : item.isReported
                  ? "Pending"
                  : "Approved"}
              </span>
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
