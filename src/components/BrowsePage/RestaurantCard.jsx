
import './RestaurantCard.css';
import location from "../../assets/location.png";
import menu from "../../assets/menu.png";
import price from "../../assets/tag.png";
import cuisine from "../../assets/dish.png";
import open from "../../assets/open.png";
import closed from "../../assets/closed.png";
import heart from "../../assets/favorite.png";


export function RestaurantCard(){
    const isOpen = true;  

    return(
        <div className="restaurant-card">
            {/* LEFT IMAGE */}
            <div className="card-image">
            <img src="/images/restaurant.jpg" alt="Restaurant" />
            </div>

            {/* MIDDLE CONTENT */}
            <div className="card-content">
                <h2 className="res-name">Himalayan Bistro</h2>

                {/* LOCATION + OPEN/CLOSED STATUS IN ONE LINE */}
                <div className="line location-status">
                    <p className="line res-location">
                        <img src={location} className="icon" alt="" />
                        Kathmandu, Nepal
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
                    Nepali · Continental 
                </p>

                <p className="line res-price">
                    <img src={price} className="icon" alt="" />
                    ₹₹ Medium
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
            <div className="card-right">
            <div className="rating-circle">4.5</div>
            <img src={heart} alt="" className="heart-icon" />
            </div>


        </div>

    );
}