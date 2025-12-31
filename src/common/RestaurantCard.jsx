import { useState } from 'react';
import './RestaurantCard.css';

import location from "../assets/location.png";
import menu from "../assets/menu.png";
import price from "../assets/tag.png";
import cuisine from "../assets/dish.png";
import open from "../assets/open.png";
import closed from "../assets/closed.png";
import heart from "../assets/heart.png";
import Img from "../assets/Chyura.png";


export function RestaurantCard({item}){
    const isOpen = item.isOpen;  

    const [isSaved, setIsSaved] = useState(false);

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    return(
        <div className="restaurant-card">
            {/* LEFT IMAGE */}
            <div className="card-image">
            <img src={Img} alt="Restaurant" />
            </div>

            {/* MIDDLE CONTENT */}
            <div className="card-content">
                <h2 className="res-name"> {item.name}</h2>

                {/* LOCATION + OPEN/CLOSED STATUS IN ONE LINE */}
                <div className="line location-status">
                    <p className="line res-location">
                        <img src={location} className="icon" alt="" />
                        {item.location}, 
                    </p>

                    {/* CONDITIONAL OPEN/CLOSED ICON */}
                    <img 
                        src={isOpen ? open : closed} 
                        alt="Status Icon"
                        className="status-icon"
                    />
                </div>

                <p className="line res-details">
                    <img src={cuisine} className="icon" alt="" />
                    {item.cuisine} 
                </p>

                <p className="line res-price">
                    <img src={price} className="icon" alt="" />
                    {item.price} 
                </p>

                <a href="menu" className="line menu-link">
                    <img src={menu} className="icon" alt="" />
                    Menu
                </a>

                <div className="reviews">
                    <p className="review">“Amazing thakali! Fresh and flavorful.”</p>
                    <p className="review">“Cozy place and quick service.”</p>
                </div>
                
            </div>

            {/* RIGHT SIDE */}
            <div className="card-right" onClick={toggleSave}>

                {isSaved ? (
                    <div className="saved-wrapper">
                        <img 
                            src={heart} 
                            alt="saved" 
                            className="heart-big"
                        />
                        <span className="rating-on-heart">{item.rating}</span>
                    </div>
                ) : (
                    <div className="rating-circle">
                        <span className="rating">4.5</span>
                        <span className="save-text">Click to save</span>
                    </div>
                )}

            </div>


        </div>

    );
}