import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useAPI";
import { RestaurantCard } from "../../common/RestaurantCard"; // adjust path
import "./FavouritesPage.css";
import { Header } from '../Header.jsx';

export default function FavoritesPage({ currentUser }) {
  const { loading, error, callApi } = useApi();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchFavorites = async () => {
      try {
        const data = await callApi("GET", `/favorites/${currentUser.id}`);
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, [currentUser?.id]);

  const handleToggleFavorite = (restaurantId) => {
    setFavorites(prev =>
      prev.filter(fav => fav.restaurantId !== restaurantId)
    );
  };

  return (
    <>
      <Header />

      {loading && <p>Loading favorites...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && !favorites.length && <p>No favorites yet.</p>}

      {!loading && !error && favorites.length > 0 && (
        <div className="favorites-container">
          {favorites.map((fav) => (
            <RestaurantCard
              key={fav.id}
              item={fav.Restaurant}
              currentUser={currentUser}
              role="user"
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}
