import { Header } from '../Header.jsx';
import { useNavigate} from "react-router-dom";
import { RestaurantCard } from '../../common/RestaurantCard.jsx';
import { DropdownFilter } from "../../common/DropdownFilter.jsx";
import { Pagination } from "../../common/Pagination.jsx";
import {
  cuisineOptions,
  moodOptions,
  featureOptions,
  priceOptions
} from "../../common/filterOptions";
import useNotifications from '../../hooks/useNotifications.js';
import { FaFilter } from "react-icons/fa";


import './BrowsePage.css';

import Img from "../../assets/Chyura.png";
import search from "../../assets/search.png";

import { useEffect, useState } from "react";
import axios from 'axios';
export default function BrowsePage({ currentUser }) {
  // Notifications (Menuka)
  useNotifications();

  // Navigation (Yours)
  const navigate = useNavigate();

  // Shared
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Compare feature (Yours)
  const [selected, setSelected] = useState([]);

  // Mobile filter toggle (Menuka)
  const [filtersVisible, setFiltersVisible] = useState(false);


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
const filteredRestaurants = items.filter((r) => {
  if (filters.cuisine.length && !filters.cuisine.some(c => r.cuisines.includes(c))) return false;if (filters.price.length) {
    const priceMatches = r.priceRange.some(p => filters.price.includes(p));
    if (!priceMatches) return false;
  }
  if (filters.mood.length && !filters.mood.some(m => r.moods.includes(m))) return false;
  if (filters.amenities.length && !filters.amenities.some(a => r.features.includes(a))) return false;
  if (filters.ratings.length && !filters.ratings.includes(Math.floor(r.rating))) return false;
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

  const toggleSelect = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
  
      if (prev.length === 2) return prev;
  
      return [...prev, id];
    });
  };
  

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
{/* Cards */}
<div className="items-grid">
  {currentItems.length > 0 ? (
    currentItems.map((item) => (
      <RestaurantCard 
        key={item.restaurantId}
        item={item}
        role={currentUser?.role}      
        currentUser={currentUser}
        isSelected={selected.includes(item.restaurantId)}
        onSelect={toggleSelect}
      />
    ))
  ) : (
    <p>No restaurants available</p>
  )}
</div>


                {selected.length === 2 && (
                <div className="compare-bar">
                    <button
                    type="button"   // ✅ VERY IMPORTANT
                    onClick={(e) => {
                        e.preventDefault(); // stop reload
                        e.stopPropagation(); // stop bubbling

                        const selectedData = currentItems.filter((item) =>
                        selected.includes(item.restaurantId)
                        );

                        navigate("/compare", {
                        state: {
                            selectedRestaurants: selectedData,
                        },
                        });
                    }}
                    >
                    Compare Restaurants
                    </button>
                </div>
                )}


                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />

                

      </div>
    </>
  );
}
