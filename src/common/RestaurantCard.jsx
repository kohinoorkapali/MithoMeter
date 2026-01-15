import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import './RestaurantCard.css';

import locationIcon from "../assets/location.png";
import menuIcon from "../assets/menu.png";
import priceIcon from "../assets/tag.png";
import cuisineIcon from "../assets/dish.png";
import openIcon from "../assets/open.png";
import closedIcon from "../assets/closed.png";
import heartIcon from "../assets/heart.png";

export function RestaurantCard({ item, role, onDelete }) {
    const isOpen = item.isOpen;  
    const [isSaved, setIsSaved] = useState(false);
    const [showAdminMenu, setShowAdminMenu] = useState(false)

    const toggleSave = () => setIsSaved(!isSaved);
    const toggleAdminMenu = ()=> setShowAdminMenu(!showAdminMenu);

    // Determine image to display
    const restaurantImage =
    item.photos && item.photos.length > 0
        ? encodeURI(
            `http://localhost:5000/${item.photos[0].replace(/\\/g, "/")}`
        )
        : "/placeholder.png";

    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/restaurants/edit/${item.restaurantId}`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${item.name}?`
        );
        
        if (!confirmDelete) return;
        
        try {console.log("Deleting restaurantId:", item.restaurantId);

            await axios.delete(
            `http://localhost:5000/api/restaurants/${item.restaurantId}`

            );
        
            // Notify parent to remove item from UI
            onDelete?.(item.restaurantId);
        
        } catch (error) {
            console.error("Delete failed", error);
            alert("Failed to delete restaurant");
        }
        };
          

    return (
        <div className="restaurant-card">
            {/* LEFT IMAGE */}
            <div className="card-image">
                <img src={restaurantImage} alt={item.name} />
            </div>

            {/* MIDDLE CONTENT */}
            <div className="card-content">
                <h2 className="res-name">{item.name || "No Name"}</h2>

                {/* Location + Status */}
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

                {/* Cuisines */}
                <p className="line res-details">
                    <img src={cuisineIcon} className="icon" alt="Cuisine" />
                    {item.cuisines?.length > 0 ? item.cuisines.join(", ") : "No Cuisines"}
                </p>

                {/* Price */}
                <p className="line res-price">
                    <img src={priceIcon} className="icon" alt="Price" />
                    {item.priceRange?.length > 0 ? item.priceRange.join(", ") : "Price N/A"}
                </p>

                {/* Menu link */}
                <Link to={`/restaurant/${item.restaurantId}/menu`} className="line menu-link">
                    <img src={menuIcon} className="icon" alt="Menu" />
                    Menu
                </Link>

                {/* Reviews (placeholder) */}
                <div className="reviews">
                    <p className="review">“Amazing food! Fresh and flavorful.”</p>
                    <p className="review">“Cozy place and quick service.”</p>
                </div>
            </div>

            {/* RIGHT SIDE: Rating / Heart */}
            <div className="card-right">
                {/* {role === "admin" ? ( */}
                <div className="card-right admin">
                    <div className="admin-actions">
                        <button className="edit-btn" onClick={handleEdit}>Edit</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                </div>

                {/* // ) : (
                //     <div className="user-toggle" onClick={toggleSave}>
                //         {isSaved ? (
                //             <div className="saved-wrapper">
                //                 <img src={heartIcon} alt="saved" className="heart-big" />
                //                 <span className="rating-on-heart">{item.rating || "N/A"}</span>
                //             </div>
                //         ) : (
                //             <div className="rating-circle">
                //                 <span className="rating">{item.rating || "N/A"}</span>
                //                 <span className="save-text">Click to save</span>
                //             </div>
                //         )}
                //     </div>
                // )} */}
            </div>
        </div>
    );
}
