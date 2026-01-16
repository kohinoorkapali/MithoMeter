import { useState } from 'react';
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

    const toggleSave = () => setIsSaved(!isSaved);
    const toggleAdminMenu = () => setShowAdminMenu(!showAdminMenu);

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
        e.stopPropagation(); // Prevent outer card link
        if (item.menuLink) {
            window.open(item.menuLink, "_blank", "noopener,noreferrer");
        }
    }

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
                    <h2 className="res-name">{item.name || "No Name"}</h2>

                    <div className="line location-status">
                        <p className="line res-location">
                            <img src={locationIcon} className="icon" alt="Location" />
                            {item.location || "Unknown Location"}
                        </p>
                        <img 
                            src={isOpen ? openIcon : closedIcon} 
                            alt={isOpen ? "Open" : "Closed"} 
                            className="status-icon"
                        />
                    </div>

                    <p className="line res-details">
                        <img src={cuisineIcon} className="icon" alt="Cuisine" />
                        {cuisines}
                    </p>

                    <p className="line res-price">
                        <img src={priceIcon} className="icon" alt="Price" />
                        {priceRange}
                    </p>

                    {/* Menu button */}
                    {item.menuLink && (
                        <button 
                            className="line menu-link-btn"
                            onClick={openMenu}
                        >
                            <img src={menuIcon} className="icon" alt="Menu" />
                            Menu
                        </button>
                    )}

                    <div className="reviews">
                        <p className="review">“Amazing food! Fresh and flavorful.”</p>
                        <p className="review">“Cozy place and quick service.”</p>
                    </div>
                </div>

                {/* RIGHT SIDE: Rating / Heart / Admin */}
                <div className="card-right">
                    {role === "admin" ? (
                        <div className="admin-menu-wrapper" onClick={(e) => e.stopPropagation()}>
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
                        <div className="user-toggle" onClick={(e) => { e.stopPropagation(); toggleSave(); }}>
                            {isSaved ? (
                                <div className="saved-wrapper">
                                    <img src={heartIcon} alt="saved" className="heart-big" />
                                    <span className="rating-on-heart">{rating}</span>
                                </div>
                            ) : (
                                <div className="rating-circle">
                                    <span className="rating">{rating}</span>
                                    <span className="save-text">Click to save</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
        </Link>
    );
}
