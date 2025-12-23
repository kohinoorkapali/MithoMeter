import { Header } from '../Header.jsx';
import { DropdownFilter } from "../../common/DropdownFilter.jsx";

import './AddPage.css';

import { useState } from 'react';

export function AddPage() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  function toggleChip(value, selectedList, setSelectedList) {
    if (selectedList.includes(value)) {
      setSelectedList(selectedList.filter(item => item !== value));
    } else {
      setSelectedList([...selectedList, value]);
    }
  }

  const moodOptions = [
    { label: "Cozy", value: "Cozy" },
    { label: "Romantic", value: "Romantic" },
    { label: "Family-Friendly", value: "Family-Friendly" },
    { label: "Luxury", value: "Luxury" },
    { label: "Casual", value: "Casual" },
    { label: "Party", value: "Party" },
    { label: "Pet-Friendly", value: "Pet-Friendly" },
    { label: "Business", value: "Business" }
  ];
  
  const featureOptions = [
    { label: "WiFi", value: "WiFi" },
    { label: "Parking", value: "Parking" },
    { label: "Outdoor Seating", value: "Outdoor Seating" },
    { label: "Non-Smoking", value: "Non-Smoking" },
    { label: "Air Conditioned", value: "Air Conditioned" },
    { label: "Wheelchair Accessibility", value: "Wheelchair Accessibility" }
  ];
  
  

  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const cuisineOptions = [
    { label: "Nepali", value: "Nepali" },
    { label: "Newari", value: "Newari" },
    { label: "Indian", value: "Indian" },
    { label: "Chinese", value: "Chinese" },
    { label: "Tibetan", value: "Tibetan" },
    { label: "Fast Food", value: "Fast Food" },
    { label: "Italian", value: "Italian" },
    { label: "Continental", value: "Continental" },
    { label: "Cafe", value: "Cafe" },
    { label: "Bakery", value: "Bakery" }
  ];
  
  const priceOptions = [
    { label: "₹ Low", value: "Low" },
    { label: "₹₹ Medium", value: "Medium" },
    { label: "₹₹₹ High", value: "High" }
  ];
  

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
              <DropdownFilter
                title="Cuisines"
                options={cuisineOptions}
                selectedValues={selectedCuisines}
                onChange={setSelectedCuisines}
              />
            </div>

  
            <div className="price">
              <label>Enter the price range</label>
              <DropdownFilter
                title="Price"
                options={priceOptions}
                selectedValues={selectedPrices}
                onChange={setSelectedPrices}
              />
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
                {moodOptions.map(function (mood) {
                  return (
                    <div
                      key={mood.value}
                      className={`chip ${selectedMoods.includes(mood.value) ? "selected" : ""}`}
                      onClick={function () {
                        toggleChip(mood.value, selectedMoods, setSelectedMoods);
                      }}
                    >
                      {mood.label}
                    </div>
                  );
                })}
              </div>
            </div>
  
            <div className="features">
              <label>Add features</label>
              <div className="chip-list">
                {featureOptions.map(function (feature) {
                  return (
                    <div
                      key={feature.value}
                      className={`chip ${selectedFeatures.includes(feature.value) ? "selected" : ""}`}
                      onClick={function () {
                        toggleChip(feature.value, selectedFeatures, setSelectedFeatures);
                      }}
                    >
                      {feature.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </div>
      </>
    );
  }
  