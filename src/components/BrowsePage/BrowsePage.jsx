import { Header } from '../Header.jsx';
import { RestaurantCard } from './RestaurantCard.jsx';

import './BrowsePage.css';

import Img from "../../assets/Chyura.png";
import search from "../../assets/search.png";


export function BrowsePage() {
    return (
        <>
            <Header />  

            <div className="browse-container">
                <div className="top">
                    <div className="top-left">
                        <div className="title">Choose Your Favourites</div>

                        <div className="subtitle">
                            Scroll through the city's best flavours
                        </div>
                    </div>

                    <div className="top-right">
                        <img src={Img} alt="Browse Top Img" />
                    </div>
                </div>

                <div className="search-wrapper">
                    <input type="text" placeholder="Search restaurants..." />

                    <div className="icon-circle">
                        <img src={search} alt="search icon" />
                    </div>
                </div>

                <div className="dropdown-line">

                    {/* CUISINE */}
                    <div className="dropdown">
                        <div className="dropdown-trigger">Cuisine</div>
                        <div className="dropdown-options">
                            <label><input type="checkbox" value="Nepali" /> Nepali</label>
                            <label><input type="checkbox" value="Indian" /> Indian</label>
                            <label><input type="checkbox" value="Chinese" /> Chinese</label>
                            <label><input type="checkbox" value="Continental" /> Continental</label>
                            <label><input type="checkbox" value="All" /> All</label>
                        </div>
                    </div>

                    {/* RATINGS */}
                    <div className="dropdown">
                        <div className="dropdown-trigger">Ratings</div>
                        <div className="dropdown-options">
                            <label><input type="checkbox" value="5" /> ⭐⭐⭐⭐⭐</label>
                            <label><input type="checkbox" value="4" /> ⭐⭐⭐⭐</label>
                            <label><input type="checkbox" value="3" /> ⭐⭐⭐</label>
                            <label><input type="checkbox" value="2" /> ⭐⭐</label>
                            <label><input type="checkbox" value="1" /> ⭐</label>
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className="dropdown">
                        <div className="dropdown-trigger">Price</div>
                        <div className="dropdown-options">
                            <label><input type="checkbox" value="cheap" /> Budget</label>
                            <label><input type="checkbox" value="mid" /> Moderate</label>
                            <label><input type="checkbox" value="expensive" /> Premium</label>
                        </div>
                    </div>

                    {/* MOOD */}
                    <div className="dropdown">
                        <div className="dropdown-trigger">Mood</div>
                        <div className="dropdown-options">
                            <label><input type="checkbox" value="Cozy" /> Cozy</label>
                            <label><input type="checkbox" value="Romantic" /> Romantic</label>
                            <label><input type="checkbox" value="Family" /> Family-Friendly</label>
                            <label><input type="checkbox" value="Friends" /> Perfect for Friends</label>
                        </div>
                    </div>

                    {/* AMENITIES */}
                    <div className="dropdown">
                        <div className="dropdown-trigger">Amenities</div>
                        <div className="dropdown-options">
                            <label><input type="checkbox" value="Parking" /> Parking</label>
                            <label><input type="checkbox" value="Wifi" /> Wi-Fi</label>
                            <label><input type="checkbox" value="Outdoor" /> Outdoor Seating</label>
                            <label><input type="checkbox" value="Live Music" /> Live Music</label>
                            <label><input type="checkbox" value="All" /> All</label>
                        </div>
                    </div>

                </div>

                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>

                
            </div>
        </>
    );
}
