import { Header } from '../Header.jsx';
import { RestaurantCard } from '../../common/RestaurantCard.jsx';

import { useEffect, useState } from "react";
import axios from 'axios';
export default function ActivityPage({ currentUser }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/restaurants")
      .then(res => {
        setItems(res.data.data);
      })
      .catch(err => {
        console.error("Failed to fetch restaurants");
      });
  }, []);

  console.log("ActivityPage currentUser:", currentUser);

  return (
    <>
      <Header role={currentUser?.role} />

      <div className="activity-container">
        <div className="items-grid">
          {items.length > 0 ? (
            items.map((item) => (
              <RestaurantCard
                key={item.restaurantId}
                item={item}
                currentUser={currentUser}
                role={currentUser?.role}
              />
            ))
          ) : (
            <p>No restaurants available</p>
          )}
        </div>
      </div>
    </>
  );
}
