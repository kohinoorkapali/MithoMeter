import { useState, useEffect } from 'react';
import { Header } from "../Header";
import { RestaurantCard } from '../../common/RestaurantCard.jsx';
import './FavouritesPage.css'

export default function FavouritesPage(){
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
        
        // Refresh every 1 second to show newly saved items
        const interval = setInterval(loadFavorites, 1000);
        return () => clearInterval(interval);
    }, []);

    const loadFavorites = () => {
        try {
            const favorites = [];
            
            // Get all keys from localStorage that start with 'restaurant:'
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('restaurant:')) {
                    try {
                        const value = localStorage.getItem(key);
                        if (value) {
                            const data = JSON.parse(value);
                            favorites.push(data);
                        }
                    } catch (err) {
                        console.log('Error parsing item:', err);
                    }
                }
            }
            
            setFavoriteRestaurants(favorites);
            console.log('📋 Loaded favorites:', favorites.length);
        } catch (error) {
            console.log('Error loading favorites:', error);
            setFavoriteRestaurants([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header/>
                <div className="favourites-container">
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        fontSize: '1.2rem',
                        color: '#666'
                    }}>
                        Loading your favorites...
                    </div>
                </div>
            </>
        );
    }

    return(
        <>
            <Header/>
            <div className="favourites-container">
                {favoriteRestaurants.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        background: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💔</div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>No favorites yet!</h2>
                        <p style={{ color: '#666' }}>
                            Browse restaurants and click the heart to save your favorites
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={{ 
                            marginBottom: '2rem',
                            padding: '1rem',
                            background: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                Your Favourites ❤️
                            </h2>
                            <p style={{ color: '#666', fontSize: '1rem' }}>
                                You have {favoriteRestaurants.length} favorite restaurant{favoriteRestaurants.length > 1 ? 's' : ''}
                            </p>
                        </div>
                        
                        {favoriteRestaurants.map((restaurant, index) => (
                            <RestaurantCard 
                                key={restaurant.restaurantId || index}
                                item={{
                                    restaurantId: restaurant.restaurantId,
                                    name: restaurant.name,
                                    location: restaurant.location,
                                    cuisines: restaurant.cuisines,
                                    priceRange: restaurant.priceRange,
                                    rating: restaurant.rating,
                                    photos: restaurant.photos || [],
                                    isOpen: restaurant.isOpen,
                                    menuLink: restaurant.menuLink
                                }}
                                currentUser={null}
                                role="user"
                            />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}