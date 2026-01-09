import { Header } from '../Header.jsx';
import { RestaurantCard } from '../../common/RestaurantCard.jsx';
import { DropdownFilter } from "../../common/DropdownFilter.jsx";
import { Pagination } from "../../common/Pagination.jsx";

import './BrowsePage.css';

import Img from "../../assets/Chyura.png";
import search from "../../assets/search.png";

import { useEffect, useState } from "react";
import axios from 'axios';

export default function BrowsePage() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState([])

    //PAGINATION
    const ITEMS_PER_PAGE = 10;

    useEffect(()=>{
        axios.get("http://localhost:5000/api/restaurants")
        .then(res=>{
            setItems(res.data.data);
        }).catch(err=>{
            console.error("Failed to fetch restaurants");
        });
    }, []);

    console.log(items);

        
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = items.slice(startIndex, endIndex);


    //DROPDOWNS
    const initialFilters = {
      cuisine: [],
      ratings: [],
      price: [],
      mood: [],
      amenities: []
    };
  
    const [filters, setFilters] = useState(initialFilters);
  
    // CLEAR ALL
    const hasActiveFilters = Object.values(filters).some(
        filterArray => filterArray.length > 0
      );      

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
                        selectedValues = {filters.cuisine}
                        onChange={(values)=>
                            setFilters(prev=>({...prev, cuisine:values}))
                        }
                    />
                    

                    {/* RATINGS */}
                    <DropdownFilter
                        title="Ratings"
                        options={[5,4,3,2,1].map(r => ({
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
                            {label:"Budget", value:"cheap"},
                            { label: "Moderate", value: "mid" },
                            { label: "Premium", value: "expensive" }
                        ]}
                        selectedValues={filters.price}
                        onChange={(values)=>
                            setFilters(prev=> ({...prev, price: values}))
                        }
                    />

                    {/* MOOD */}
                    <DropdownFilter
                        title="Mood"
                        options={[
                            {label:"Cozy", value:"Cozy"},
                            { label: "Romantic", value: "Romantic" },
                            { label: "Family", value: "Family" },
                            { label: "Friends", value: "Friends" }
                        ]}
                        selectedValues={filters.mood}
                        onChange={(values)=>
                            setFilters(prev=> ({...prev, mood: values}))
                        }
                    />

                    {/* AMENITIES */}
                    <DropdownFilter
                        title="Amenities"
                        options={[
                            {label:"Parking", value:"Parking"},
                            { label: "Wi-Fi", value: "Wi-Fi" },
                            { label: "Outdoor Seating", value: "Outdoor Seating" },
                            { label: "Live Music", value: "Live Music" }
                        ]}
                        selectedValues={filters.amenities}
                        onChange={(values)=>
                            setFilters(prev=> ({...prev, amenities: values}))
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
                    {items?.length > 0
                        ? items.map((item) => <RestaurantCard key={item.restaurantId} item={item} />)
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
