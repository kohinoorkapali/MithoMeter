import "./CompareCard.css";

export function CompareCard() {
    return(
        
        <div className="compare-card">
          <p className="rank">#1 among 109 Nepalese Cuisine Restaurants</p>

          <div className="image-row">
            <img src="/food1.jpg" alt="" />
            <img src="/food2.jpg" alt="" />
          </div>

          <h2>Himalayan Bistro</h2>
          <p className="rating">4.6 ⭐⭐⭐⭐⭐ (110 reviews)</p>
          <p className="price">₹₹ - Moderate</p>
          <p className="open">● Open now</p>
          <p className="cuisine">Nepali, Tibetan</p>
          <p className="location">📍 Thamel</p>

          <h4>Features</h4>
          <ul>
            <li>Vegetarian</li>
            <li>Take out</li>
            <li>Family Style</li>
            <li>Free WiFi</li>
          </ul>

          <button className="visit-btn">Visit the Page</button>
        </div>
    )
  
}