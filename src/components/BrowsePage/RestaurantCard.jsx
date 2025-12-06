
import './RestaurantCard.css';

export function RestaurantCard(){
    return(
        <div className="restaurant-card">
            {/* LEFT IMAGE */}
            <div className="card-image">
            <img src="/images/restaurant.jpg" alt="Restaurant" />
            </div>

            {/* MIDDLE CONTENT */}
            <div className="card-content">
                <h2 className="res-name">Himalayan Bistro</h2>

                <p className="line res-location">
                    <img src="/icons/location.png" className="icon" alt="" />
                    Kathmandu, Nepal
                </p>

                <p className="line res-details">
                    <img src="/icons/cuisine.png" className="icon" alt="" />
                    Nepali · Continental 
                </p>

                <p className="line res-price">
                    <img src="/icons/price.png" className="icon" alt="" />
                    ₹₹ Medium
                </p>

                <a href="menu" className="line menu-link">
                    <img src="/icons/menu.png" className="icon" alt="" />
                    Menu
                </a>

                <p className="line status open">
                    <img src="/icons/open.png" className="icon" alt="" />
                    Open Now
                </p>

                <div className="reviews">
                    <p className="review">“Amazing thakali! Fresh and flavorful.”</p>
                    <p className="review">“Cozy place and quick service.”</p>
                </div>
                
            </div>

            {/* RIGHT SIDE */}
            <div className="card-right">
            <div className="rating-circle">4.5</div>
            <img src="/icons/heart.png" alt="" className="heart-icon" />
            </div>


        </div>

    );
}