import { Header } from '../Header.jsx';
import { RestaurantCard } from '../../common/RestaurantCard.jsx';
import { DropdownFilter } from "../../common/DropdownFilter.jsx";
import { Pagination } from "../../common/Pagination.jsx";
import {
  cuisineOptions,
  moodOptions,
  featureOptions,
  priceOptions,
    ratingOptions,
} from "../../common/filterOptions";

import './BrowsePage.css';

import Img from "../../assets/Chyura.png";
import search from "../../assets/search.png";

import { useEffect, useState } from "react";
import axios from 'axios';
import useNotifications from '../../hooks/useNotifications.js';
import { FaFilter } from "react-icons/fa";

export default function BrowsePage({ currentUser })  {
    //Notification
    useNotifications();

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [searchTerm, setSearchTerm] = useState("");
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("http://localhost:5000/api/restaurants")
      .then(res => {
        setItems(res.data.data);
      })
      .catch(err => {
        console.error("Failed to fetch restaurants");
      });
  }, []);

  const filteredItems = items.filter(item =>
  item.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

const initialFilters = {
  cuisine: [],
  ratings: [],
  price: [],
  mood: [],
  amenities: []
};

const [filters, setFilters] = useState(initialFilters);

// 1️⃣ Filter restaurants
const isNewRestaurant = (createdAt) => {
  const today = new Date();
  const addedDate = new Date(createdAt);
  const diffDays = (today - addedDate) / (1000 * 60 * 60 * 24);
  return diffDays <= 30; // new if added within last 30 days
};

const filteredRestaurants = items.filter((r) => {

  // 🍽️ Cuisine filter
  if (filters.cuisine.length && !filters.cuisine.some(c => r.cuisines.includes(c))) {
    return false;
  }

  // 💲 Price filter
  if (filters.price.length) {
    const priceMatches = r.priceRange.some(p => filters.price.includes(p));
    if (!priceMatches) return false;
  }

  // 😃 Mood filter
  if (filters.mood.length && !filters.mood.some(m => r.moods.includes(m))) {
    return false;
  }

  // 🛋️ Amenities filter
  if (filters.amenities.length && !filters.amenities.some(a => r.features.includes(a))) {
    return false;
  }

  // ⭐ Ratings filter (number ranges + newly added)
  if (filters.ratings.length) {
  let ratingMatch = false;

  filters.ratings.forEach(val => {
    if (!isNaN(val)) {
      const numVal = Number(val); // convert string to number

      if (numVal === 5 && r.rating >= 5) {
        ratingMatch = true;
      } else if (numVal < 5 && r.rating >= numVal && r.rating < numVal + 1) {
        ratingMatch = true;
      }
    }

    // Check newly added
    if (val === "new" && isNewRestaurant(r.createdAt)) {
      ratingMatch = true;
    }
  });

  if (!ratingMatch) return false;
}
  return true;
});



// 2️⃣ Pagination slice
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);

  const hasActiveFilters = Object.values(filters).some(
    filterArray => filterArray.length > 0
  );

  function clearAllFilters() {
    setFilters(initialFilters);
  }

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

                {/* Search Bar */}
                <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); 
                    }}
                />

                <div className="icon-circle">
                    <img src={search} alt="search icon" />
                </div>
                </div>

                        {/* MOBILE FILTER TOGGLE */}
                <div className="mobile-filter-toggle d-md-none">
                <button 
                    style={{ backgroundColor: "#FF8A00", color: "#fff" }}
                    onClick={() => setFiltersVisible(prev => !prev)}
                    >
                    <FaFilter /> Filters
                </button>

                </div>

                {/* Dropdowns */}
                <div 
                    className={`dropdown-line ${filtersVisible ? "show" : ""}`}
                >
                    {/* CUISINE */}
                    <DropdownFilter
                    title="Cuisine"
                    options={cuisineOptions}
                    selectedValues={filters.cuisine}
                    onChange={(values) =>
                        setFilters(prev => ({ ...prev, cuisine: values }))
                    }
                    />

                    {/* PRICE */}
                    <DropdownFilter
                    title="Price"
                    options={priceOptions}
                    selectedValues={filters.price}
                    onChange={(values) =>
                        setFilters(prev => ({ ...prev, price: values }))
                    }
                    />

                    {/* MOOD */}
                    <DropdownFilter
                    title="Mood"
                    options={moodOptions}
                    selectedValues={filters.mood}
                    onChange={(values) =>
                        setFilters(prev => ({ ...prev, mood: values }))
                    }
                    />

                    {/* AMENITIES */}
                    <DropdownFilter
                    title="Amenities"
                    options={featureOptions}
                    selectedValues={filters.amenities}
                    onChange={(values) =>
                        setFilters(prev => ({ ...prev, amenities: values }))
                    }
                    />
                    {/* RATINGS */}
                        <DropdownFilter
                        title="Ratings"
                        options={ratingOptions}
                        selectedValues={filters.ratings}
                        onChange={(values) =>
                            setFilters(prev => ({ ...prev, ratings: values }))
                        }
                        />


                    {/* CLEAR BUTTON */}
                    {hasActiveFilters && (
                    <div className="clear-filters-wrapper">
                        <button
                        className="clear-filters-btn"
                        onClick={clearAllFilters}
                        >
                        Clear All Filters
                        </button>
                    </div>
                    )}

                </div>

                {/* Cards */}
                <div className="items-grid">
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                        <RestaurantCard
                            key={item.restaurantId}
                            item={item}
                            role={currentUser?.role}      
                            currentUser={currentUser}
                        />
                        ))
                    ) : (
                        <p>No restaurants available</p>
                    )}
                </div>



                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />

                

      </div>
    </>
  );
}
