import { Header } from '../Header.jsx';
import { RestaurantCard } from '../../common/RestaurantCard.jsx';
import { DropdownFilter } from "../../common/DropdownFilter.jsx";
import { Pagination } from "../../common/Pagination.jsx";

import './BrowsePage.css';

import Img from "../../assets/Chyura.png";
import search from "../../assets/search.png";

import { useEffect, useState, useCallback } from "react";
import axios from 'axios';

// ✅ Filters constant outside component
const initialFilters = {
  cuisine: [],
  ratings: [],
  price: [],
  mood: [],
  amenities: [],
  open: []   
};


export default function BrowsePage() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const ITEMS_PER_PAGE = 10;

  // ✅ Fetch all restaurants on first render
  useEffect(() => {
    axios.get("http://localhost:5000/api/restaurants")
      .then(res => setItems(res.data.data || []))
      .catch(() => console.error("Failed to fetch restaurants"));
  }, []);

  // ✅ Fetch filtered restaurants when filters change
const fetchFilteredRestaurants = useCallback(async () => {
  try {
    const response = await fetch("http://localhost:5000/api/restaurants/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    });

    // ✅ check if backend responded 200
    if (!response.ok) {
      const text = await response.text();
      console.error("Backend error:", text); // log HTML or error
      setItems([]); // fallback
      return;
    }

    const data = await response.json();
    setItems(Array.isArray(data.data) ? data.data : []); // ensure array
    setCurrentPage(1);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    setItems([]); // fallback
  }
}, [filters]);

  useEffect(() => {
    const hasActiveFilters = Object.values(filters).some(
      arr => Array.isArray(arr) && arr.length > 0
    );

    if (hasActiveFilters) {
      fetchFilteredRestaurants();
    } else {
      axios.get("http://localhost:5000/api/restaurants")
        .then(res => setItems(res.data.data || []))
        .catch(() => console.error("Failed to fetch restaurants"));
    }
  }, [filters, fetchFilteredRestaurants]);

  // ✅ Pagination logic
  const totalPages = Math.ceil((items?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = Array.isArray(items) ? items.slice(startIndex, endIndex) : [];


  // ✅ Check if any filters active
  const hasActiveFilters = Object.values(filters).some(
    arr => Array.isArray(arr) && arr.length > 0
  );

  // ✅ Clear all filters
  function clearAllFilters() {
    setFilters(initialFilters);
  }

    return (
        <>
            <Header/>  

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
                    <input type="text" placeholder="Search restaurants..." />

                    <div className="icon-circle">
                        <img src={search} alt="search icon" />
                    </div>
                </div>

                {/* Dropdowns */}
                <div className="dropdown-line">

                   {/* CUISINE */}
                    <DropdownFilter
                    title="Cuisine"
                    options={[
                        { label: "Nepali", value: "Nepali" },
                        { label: "Indian", value: "Indian" },
                        { label: "Chinese", value: "Chinese" },
                        { label: "Continental", value: "Continental" }
                    ]}
                    selectedValues={filters.cuisine}
                    onChange={(values) =>
                        setFilters(prev => ({ ...prev, cuisine: values }))
                    }
                    />

                    {/* RATINGS */}
                    <DropdownFilter
                    title="Ratings"
                    options={[5, 4, 3, 2, 1].map(r => ({
                        label: "⭐".repeat(r),
                        value: r
                    }))}
                    selectedValues={filters.ratings}
                    onChange={(values) =>
                        setFilters(prev => ({ ...prev, ratings: values }))
                    }
                    />

                    {/* PRICE */}
                    <DropdownFilter
                    title="Price"
                    options={[
                        { label: "Budget", value: "cheap" },
                        { label: "Moderate", value: "mid" },
                        { label: "Premium", value: "expensive" }
                    ]}
                    selectedValues={filters.price}
                    onChange={(values) =>
                        setFilters(prev => ({ ...prev, price: values }))
                    }
                    />

                    {/* MOOD */}
                    <DropdownFilter
                    title="Mood"
                    options={[
                        { label: "Cozy", value: "Cozy" },
                        { label: "Romantic", value: "Romantic" },
                        { label: "Family", value: "Family" },
                        { label: "Friends", value: "Friends" }
                    ]}
                    selectedValues={filters.mood}
                    onChange={(values) =>
                        setFilters(prev => ({ ...prev, mood: values }))
                    }
                    />

                    {/* AMENITIES */}
                    <DropdownFilter
                    title="Amenities"
                    options={[
                        { label: "Parking", value: "Parking" },
                        { label: "Wi-Fi", value: "Wi-Fi" },
                        { label: "Outdoor Seating", value: "Outdoor Seating" },
                        { label: "Live Music", value: "Live Music" }
                    ]}
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
                <div className="items-grid">
                    {currentItems.length > 0
                        ? currentItems.map(item => (
                            <RestaurantCard key={item.restaurantId} item={item} />
                        ))
                        : <p>No restaurants available</p>
                    }
                </div>


                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />         
            </div>
        </>
    );
}
