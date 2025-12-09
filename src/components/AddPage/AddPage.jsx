import { Header } from '../Header.jsx';

import './AddPage.css';

export function AddPage() {
    return (
      <>
        <Header />
  
        <div className="create-container">
          <div className="left-container">
            Bring this restaurant onto the MithoMeter radar.
            <div className="photo-container">
              Add some photos
              <label htmlFor="photo-upload" className="photo-box">
                Click to add photos
              </label>
              <input type="file" id="photo-upload" accept="image/*" multiple />
            </div>
          </div>
  
          <div className="right-container">
            <div className="name">
              <label htmlFor="q1">Title the restaurant</label>
              <input type="text" id="q1" />
            </div>
  
            <div className="location">
              <label htmlFor="q2">Add the location</label>
              <input type="text" id="q2" />
            </div>
  
            <div className="cuisine">
              <label>What cuisine does it offer?</label>
                <div className="dropdown">
                    <div className="dropdown-trigger">Select cuisines</div>
                    <div className="dropdown-options">
                    <label><input type="checkbox" value="Nepali" /> Nepali</label>
                    <label><input type="checkbox" value="Fast Food" /> Fast Food</label>
                    <label><input type="checkbox" value="All" /> All</label>
                    </div>
                </div>
            </div>
  
            <div className="price">
              <label>Enter the price range</label>
              <div className="dropdown">
                <div className="dropdown-trigger">Select price range</div>
                <div className="dropdown-options">
                  <label><input type="checkbox" value="Low" /> ₹ Low</label>
                  <label><input type="checkbox" value="Moderate" /> ₹₹ Medium</label>
                  <label><input type="checkbox" value="High" /> ₹₹₹ High</label>
                  <label><input type="checkbox" value="All" /> All</label>
                </div>
              </div>
            </div>
  
            <div className="hours">
              <label>Enter the opening hours</label>
              <div className="hour-inputs">
                <input type="time" id="q5a" />
                <span>to</span>
                <input type="time" id="q5b" />
              </div>
            </div>
  
            <div className="description">
              <label htmlFor="q6">Add a description</label>
              <textarea id="q6" rows="7"></textarea>
            </div>
  
            <div className="website">
              <label htmlFor="q7">Link to the restaurant</label>
              <input type="text" id="q7" />
            </div>
  
            <div className="menu">
              <label htmlFor="q8">Link to the restaurant's menu</label>
              <input type="text" id="q8" />
            </div>
  
            <div className="moods">
              <label>Add moods</label>
              <div className="chip-list">
                <div className="chip">Cozy</div>
                <div className="chip">Romantic</div>
                <div className="chip">Family-Friendly</div>
                <div className="chip">Luxury</div>
                <div className="chip">Casual</div>
                <div className="chip">Party</div>
                <div className="chip">Pet-Friendly</div>
                <div className="chip">Business</div>
              </div>
            </div>
  
            <div className="features">
              <label>Add features</label>
              <div className="chip-list">
                <div className="chip">WiFi</div>
                <div className="chip">Parking</div>
                <div className="chip">Outdoor Seating</div>
                <div className="chip">Non-Smoking</div>
                <div className="chip">Air conditioned</div>
                <div className="chip">Wheelchair Accessibility</div>
              </div>
            </div>
  
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </div>
      </>
    );
  }
  