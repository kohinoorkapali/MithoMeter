import { useLocation, useNavigate } from "react-router-dom";
import { CompareCard } from "../Compare/CompareCard.jsx";
import "./Compare.css";
import { Header } from "../Header.jsx";

export default function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedRestaurants } = location.state || {};

  if (!selectedRestaurants || selectedRestaurants.length !== 2) {
    return <p>Please select 2 restaurants to compare.</p>;
  }

  return (
    <>
      <Header/>
      <div className="compare-page">

      {/* Cards Row */}
      <div className="compare-grid">
        <CompareCard item={selectedRestaurants[0]} />
        <CompareCard item={selectedRestaurants[1]} />
      </div>

      {/* Back Button */}
      <button
        className="back-to-browse"
        onClick={() => navigate("/browse")}
      >
        Compare Other Restaurants
      </button>

    </div>
    </>
  );
}
