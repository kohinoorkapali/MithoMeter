import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './RestaurantCard.css';
import locationIcon from "../assets/location.png";
import menuIcon from "../assets/menu.png";
import priceIcon from "../assets/tag.png";
import cuisineIcon from "../assets/dish.png";
import openIcon from "../assets/open.png";
import closedIcon from "../assets/closed.png";
import heartIcon from "../assets/heart.png";

export function RestaurantCard({ item, currentUser, role }) {
    const isOpen = item.isOpen;
    const [isSaved, setIsSaved] = useState(false);
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const [reviews, setReviews] = useState([]);
    const toggleSave = () => setIsSaved(!isSaved);
    const toggleAdminMenu = () => setShowAdminMenu(!showAdminMenu);

    // Determine image to display
    const photo = item.photos?.[0];
    const restaurantImage = photo
    ? photo.startsWith("http")
        ? photo
        : photo.startsWith("/uploads")
        ? `http://localhost:5000${photo}`
        : `http://localhost:5000/uploads/restaurants/${photo}`
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
