import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './RestaurantCard.css';
import locationIcon from "../assets/location.png";
import menuIcon from "../assets/menu.png";
import priceIcon from "../assets/tag.png";
import cuisineIcon from "../assets/dish.png";
import openIcon from "../assets/open.png";
import closedIcon from "../assets/closed.png";
import heartIcon from "../assets/heart.png";
import { useApi } from "../hooks/useAPI.js";


export function RestaurantCard({ item, currentUser, role }) {
  const { callApi } = useApi();
  const [isSaved, setIsSaved] = useState(false);
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const [reviews, setReviews] = useState([]);
    const toggleAdminMenu = () => setShowAdminMenu(!showAdminMenu);
    const navigate = useNavigate();


    // Determine image to display
    const restaurantImage =
  item.photos && item.photos.length > 0
    ? `http://localhost:5000${item.photos[0]}`
    : "/placeholder.png";


    const rating = typeof item.rating === "number" || typeof item.rating === "string" 
        ? item.rating 
        : "N/A";

    const cuisines = Array.isArray(item.cuisines) ? item.cuisines.join(", ") : item.cuisines || "No Cuisines";
    const priceRange = Array.isArray(item.priceRange) ? item.priceRange.join(", ") : item.priceRange || "Price N/A";

    // Open menu in new tab
        const openMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.menuLink) {
            window.open(item.menuLink, "_blank", "noopener,noreferrer");
        }
        };


        useEffect(() => {
        const fetchReviews = async () => {
            try {
            const res = await fetch(`http://localhost:5000/api/reviews/restaurant/${item.restaurantId}`);
            const data = await res.json();
            setReviews(data.data || []);
            } catch (err) {
            console.error("Error fetching reviews:", err);
            }
        };

        fetchReviews();
        }, [item.restaurantId]);

        const overallRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + (Number(r.totalRating) || 0), 0) / reviews.length).toFixed(1)
        : "N/A";

          // Check if favorite already
        useEffect(() => {
            const checkFavorite = async () => {
            if (!currentUser) return;
            try {
                const favorites = await callApi("GET", `/favorites/${currentUser.id}`);
                const exists = favorites.some(fav => Number(fav.restaurantId) === Number(item.restaurantId));
                setIsSaved(exists);
            } catch (err) {
                console.error("Error checking favorites:", err.message);
            }
            };
            checkFavorite();
        }, [currentUser, item.restaurantId, callApi]);

        // Toggle favorite directly inside card (no redirect)
        const toggleSave = async () => {
        if (!currentUser) {
            alert("Please login to save restaurants");
            return;
        }

        try {
            if (isSaved) {
            // remove from favorites
            await callApi("DELETE", `/favorites/${currentUser.id}/${item.restaurantId}`);
            setIsSaved(false);
            } else {
            // save to favorites
            await callApi("POST", "/favorites/save", {
                data: { userId: currentUser.id, restaurantId: item.restaurantId },
            });
            setIsSaved(true);
            }

            // ✅ Call parent callback if provided
            if (onToggleFavorite) {
            onToggleFavorite(item.restaurantId);
            }
        } catch (err) {
            console.error("Favorite toggle error:", err.message);
        }
        };

        











    return (
        <Link 
           to={`/restaurant/${item.restaurantId}`}
            state={{ currentUser }} // <-- pass the user here
            className="restaurant-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
        >


                {/* LEFT IMAGE */}
                <div className="card-image">
                    <img src={restaurantImage} alt={item.name || "Restaurant"} />
                </div>

                {/* MIDDLE CONTENT */}
                <div className="card-content">
                        {/* Title */}
                        <h2 className="res-name">{item.name}</h2>

                        {/* Location */}
                        <p className="line res-location">
                            <img src={locationIcon} className="icon" alt="Location" />
                            {item.location || "Unknown Location"}
                        </p>

                        {/* Cuisine */}
                        <p className="line res-details">
                            <img src={cuisineIcon} className="icon" alt="Cuisine" />
                            {cuisines}
                        </p>

                        {/* Price */}
                        <p className="line res-price">
                            <img src={priceIcon} className="icon" alt="Price" />
                            {priceRange}
                        </p>

                        {/* Menu button */}
                        {item.menuLink && (
                            <button 
                            className="menu-link-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(item.menuLink, "_blank", "noopener,noreferrer");
                            }}
                            >
                            <img src={menuIcon} className="icon" alt="Menu" /> Menu
                            </button>
                        )}

                        {/* Reviews */}
                        <div className="reviews">
                            <p className="review">“Amazing food! Fresh and flavorful.”</p>
                            <p className="review">“Cozy place and quick service.”</p>
                        </div>
                        </div>


                {/* RIGHT SIDE: Rating / Heart / Admin */}
                <div className="card-right">
                    {role === "admin" ? (
                        <div className="admin-menu-wrapper" onClick={(e) => {
                                e.preventDefault(); e.stopPropagation(); }} >
                            <span className="admin-menu-icon" onClick={toggleAdminMenu}>
                                &#8230;
                            </span>
                            {showAdminMenu && (
                                <div className="admin-menu-dropdown">
                                    <button onClick={() => console.log("Edit", item.restaurantId)}>Edit</button>
                                    <button onClick={() => console.log("Delete", item.restaurantId)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="user-toggle" onClick={(e) => {
                                e.preventDefault(); e.stopPropagation(); toggleSave();
                            }} >
                            {isSaved ? (
                            <div className="saved-wrapper">
                                <img src={heartIcon} alt="saved" className="heart-big" />
                                <span className="rating-on-heart">{overallRating}</span>
                            </div>
                            ) : (
                            <div className="rating-circle">
                                <span className="rating">{overallRating}</span>
                                <span className="save-text">Click to save</span>
                            </div>
                            )}
                        </div>
                    )}
                </div>
        </Link>
    );
}
