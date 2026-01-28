import { Header } from '../Header.jsx';
import { useNavigate } from "react-router-dom";
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
  useNotifications();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Sorting
  const [ratingSort, setRatingSort] = useState("");   // high | low
  const [dateSort, setDateSort] = useState("");       // newest | oldest

  const itemsPerPage = 10;

  const initialFilters = {
    cuisine: [],
    price: [],
    mood: [],
    amenities: []
  };

  const [filters, setFilters] = useState(initialFilters);

  // Fetch restaurants + ratings
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/restaurants");
        const restaurants = res.data.data;

        // fetch reviews to calculate average rating
        const restaurantsWithRatings = await Promise.all(
          restaurants.map(async (r) => {
            try {
              const revRes = await axios.get(
                `http://localhost:5000/api/reviews/restaurant/${r.restaurantId}`,
                { params: { userId: currentUser?.id } }
              );
              const reviews = revRes.data.data || [];
              const averageRating =
                reviews.length > 0
                  ? reviews.reduce((sum, r) => sum + Number(r.totalRating || 0), 0) / reviews.length
                  : 0;
              return { ...r, rating: averageRating };
            } catch {
              return { ...r, rating: 0 };
            }
          })
        );

        setItems(restaurantsWithRatings);
      } catch (err) {
        console.error("Failed to fetch restaurants", err);
      }
    };

    fetchRestaurants();
  }, [currentUser]);

  // Filter restaurants
  let filteredRestaurants = items.filter(r =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredRestaurants = filteredRestaurants.filter((r) => {
    if (filters.cuisine.length && !filters.cuisine.some(c => r.cuisines?.includes(c))) return false;
    if (filters.price.length && !r.priceRange?.some(p => filters.price.includes(p))) return false;
    if (filters.mood.length && !filters.moods?.some(m => filters.mood.includes(m))) return false;
    if (filters.amenities.length && !filters.features?.some(a => filters.amenities.includes(a))) return false;
    return true;
  });

  // Sort restaurants
  filteredRestaurants = [...filteredRestaurants];

  if (ratingSort === "high") filteredRestaurants.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  if (ratingSort === "low") filteredRestaurants.sort((a, b) => (a.rating || 0) - (b.rating || 0));
  if (dateSort === "newest") filteredRestaurants.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  if (dateSort === "oldest") filteredRestaurants.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);

  const hasActiveFilters =
    Object.values(filters).some(arr => arr.length > 0) ||
    ratingSort !== "" ||
    dateSort !== "";

  function clearAllFilters() {
    setFilters(initialFilters);
    setRatingSort("");
    setDateSort("");
    setCurrentPage(1);
  }

  const toggleSelect = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length === 2) return prev;
      return [...prev, id];
    });
  };

  return (
    <>
      <Header />
      <div className="browse-container">
        {/* top section */}
        <div className="top">
          <div className="top-left">
            <div className="title">Choose Your Favourites</div>
            <div className="subtitle">Scroll through the city's best flavours</div>
          </div>
          <div className="top-right">
            <img src={Img} alt="Browse Top Img" />
          </div>
        </div>

        {/* search */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <div className="icon-circle">
            <img src={search} alt="search icon" />
          </div>
        </div>

        {/* mobile filter */}
        <div className="mobile-filter-toggle d-md-none">
          <button style={{ backgroundColor: "#FF8A00", color: "#fff" }} onClick={() => setFiltersVisible(prev => !prev)}>
            <FaFilter /> Filters
          </button>
        </div>

        {/* filters */}
        <div className={`dropdown-line ${filtersVisible ? "show" : ""}`}>
          <DropdownFilter title="Cuisine" options={cuisineOptions} selectedValues={filters.cuisine} onChange={(values) => setFilters(prev => ({ ...prev, cuisine: values }))} />
          <div className="sort-dropdown">
            <select value={ratingSort} onChange={(e) => { setRatingSort(e.target.value); setDateSort(""); setCurrentPage(1); }}>
              <option value="">Sort by Rating</option>
              <option value="high">High → Low ⭐</option>
              <option value="low">Low → High ⭐</option>
            </select>
          </div>
          <div className="sort-dropdown">
            <select value={dateSort} onChange={(e) => { setDateSort(e.target.value); setRatingSort(""); setCurrentPage(1); }}>
              <option value="">Sort by Date</option>
              <option value="newest">Newest First 🆕</option>
              <option value="oldest">Oldest First 🕒</option>
            </select>
          </div>
          <DropdownFilter title="Price" options={priceOptions} selectedValues={filters.price} onChange={(values) => setFilters(prev => ({ ...prev, price: values }))} />
          <DropdownFilter title="Mood" options={moodOptions} selectedValues={filters.mood} onChange={(values) => setFilters(prev => ({ ...prev, mood: values }))} />
          <DropdownFilter title="Amenities" options={featureOptions} selectedValues={filters.amenities} onChange={(values) => setFilters(prev => ({ ...prev, amenities: values }))} />
          {hasActiveFilters && <div className="clear-filters-wrapper"><button className="clear-filters-btn" onClick={clearAllFilters}>Clear All Filters</button></div>}
        </div>

        {/* restaurant cards */}
        <div className="items-grid">
          {currentItems.length > 0 ? (
            currentItems.map(item => (
              <RestaurantCard key={item.restaurantId} item={item} role={currentUser?.role} currentUser={currentUser} isSelected={selected.includes(item.restaurantId)} onSelect={toggleSelect} />
            ))
          ) : (<p>No restaurants available</p>)}
        </div>

        {/* compare */}
        {selected.length === 2 && (
          <div className="compare-bar">
            <button type="button" onClick={(e) => {
              e.preventDefault();
              const selectedData = items.filter((item) => selected.includes(item.restaurantId));
              navigate("/compare", { state: { selectedRestaurants: selectedData } });
            }}>Compare Restaurants</button>
          </div>
        )}

        {/* pagination */}
        <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </>
  );
}
