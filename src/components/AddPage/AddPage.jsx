import { Header } from '../Header.jsx';
import { DropdownFilter } from "../../common/DropdownFilter.jsx";

import './AddPage.css';

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function AddPage() {
  // REACT FORM SETUP
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  }= useForm();

  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const [photos, setPhotos] = useState([]);


  //SYNC UI STATE
  useEffect(()=>{
    setValue("moods", selectedMoods);
  }, [selectedMoods, setValue]);

  useEffect(() => {
    setValue("features", selectedFeatures); 
  }, [selectedFeatures, setValue]);

  useEffect(() => {
    setValue("cuisines", selectedCuisines); // 
  }, [selectedCuisines, setValue]);

  useEffect(() => {
    setValue("priceRange", selectedPrices); // 
  }, [selectedPrices, setValue]);

  function toggleChip(value, selectedList, setSelectedList) {
    if (selectedList.includes(value)) {
      setSelectedList(selectedList.filter(item => item !== value));
    } else {
      setSelectedList([...selectedList, value]);
    }
  }

  function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
  
    setPhotos(prev => {
      const combined = [...prev, ...files];
      return combined.slice(0, 5); // max 5 images
    });
  
    // keep react-hook-form in sync
    setValue("photos", e.target.files);
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

  const onSubmit = (data) => {
    console.log("Submitted Restaurant Data:", data);
  };

    return (
      <>
        <Header role = "admin"/>
  
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="create-container">
            <div className="left-container">
              Bring this restaurant onto the MithoMeter radar.
              <div className="photo-container">
                Add some photos
                <label htmlFor="photo-upload" className="photo-box">
                  Click to add photos
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                />
                <div className="photo-preview">
                  {photos.map((photo, index) => {
                    const previewUrl = URL.createObjectURL(photo);
                    return (
                      <div className="uploaded-photo-wrapper" key={index}>
                        <img
                          src={previewUrl}
                          className="uploaded-photo"
                          alt="preview"
                          onLoad={() => URL.revokeObjectURL(previewUrl)}
                        />

                        <span
                          className="remove-photo"
                          onClick={() =>
                            setPhotos(prev => prev.filter((_, i) => i !== index))
                          }
                        >
                          ×
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
    
            <div className="right-container">
              <div className="name">
                <label>Title the restaurant</label>
                <input
                type="text"
                {...register("name", { required: "Restaurant name is required" })} 
                />
              {errors.name && <small>{errors.name.message}</small>}
              </div>
    
              <div className="location">
                <label>Add the location</label>
                <input type="text" 
                {...register("location", {required: "Location is required"})} />
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
                  <input type="time" 
                  {...register ("openTime")} />
                  <span>to</span>
                  <input type="time" 
                  {...register("closeTime")} />
                </div>
              </div>
    
              <div className="description">
                <label>Add a description</label>
                <textarea rows="7" {...register("description")}></textarea>
              </div>
    
              <div className="website">
                <label>Link to the restaurant</label>
                <input type="text" {...register("websiteLink")} />
              </div>
    
              <div className="menu">
                <label>Link to the restaurant's menu</label>
                <input type="text" {...register("menuLink")}/>
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
        </form>
      </>
    );
  }
  