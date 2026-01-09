// src/pages/AddPage.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantSchema } from "../../schema/restaurant.schema.js";
import { apiUpload } from "../../utils/api.js";

import { Header } from "../Header.jsx";
import { DropdownFilter } from "../../common/DropdownFilter.jsx";
import "./AddPage.css";

export default function AddPage() {
  // react-hook-form with Zod
  const [backendError, setBackendError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ success state

  const {
    register,
    handleSubmit,
    setValue,
    reset, // ✅ add reset
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(restaurantSchema),
    mode: "onChange",
    defaultValues: {
      moods: [],
      features: [],
      cuisines: [],
      priceRange: [],
      photos: [],
    },
  });



  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [photos, setPhotos] = useState([]);

useEffect(() => {
  setValue("moods", selectedMoods, { shouldValidate: true });
}, [selectedMoods, setValue]);

useEffect(() => {
  setValue("features", selectedFeatures, { shouldValidate: true });
}, [selectedFeatures, setValue]);

useEffect(() => {
  setValue("cuisines", selectedCuisines, { shouldValidate: true });
}, [selectedCuisines, setValue]);

useEffect(() => {
  setValue("priceRange", selectedPrices, { shouldValidate: true });
}, [selectedPrices, setValue]);

useEffect(() => {
  setValue("photos", photos, { shouldValidate: true });
}, [photos, setValue]);


  const toggleChip = (value, selectedList, setSelectedList) => {
    if (selectedList.includes(value)) {
      setSelectedList(selectedList.filter((item) => item !== value));
    } else {
      setSelectedList([...selectedList, value]);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files].slice(0, 5)); // max 5 photos
  };

  // options
  const moodOptions = [
    { label: "Cozy", value: "Cozy" },
    { label: "Romantic", value: "Romantic" },
    { label: "Family-Friendly", value: "Family-Friendly" },
    { label: "Luxury", value: "Luxury" },
    { label: "Casual", value: "Casual" },
    { label: "Party", value: "Party" },
    { label: "Pet-Friendly", value: "Pet-Friendly" },
    { label: "Business", value: "Business" },
  ];

  const featureOptions = [
    { label: "WiFi", value: "WiFi" },
    { label: "Parking", value: "Parking" },
    { label: "Outdoor Seating", value: "Outdoor Seating" },
    { label: "Non-Smoking", value: "Non-Smoking" },
    { label: "Air Conditioned", value: "Air Conditioned" },
    { label: "Wheelchair Accessibility", value: "Wheelchair Accessibility" },
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
    { label: "Bakery", value: "Bakery" },
  ];

  const priceOptions = [
    { label: "₹ Low", value: "Low" },
    { label: "₹₹ Medium", value: "Medium" },
    { label: "₹₹₹ High", value: "High" },
  ];

   const onSubmit = async (data) => {
    try {
      setBackendError("");
      setSuccessMessage(""); // clear previous message
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("openTime", data.openTime);
      formData.append("closeTime", data.closeTime);
      formData.append("description", data.description);
      formData.append("websiteLink", data.websiteLink);
      formData.append("menuLink", data.menuLink);

      formData.append("cuisines", JSON.stringify(data.cuisines));
      formData.append("priceRange", JSON.stringify(data.priceRange));
      formData.append("moods", JSON.stringify(data.moods));
      formData.append("features", JSON.stringify(data.features));

      data.photos.forEach((photo) => formData.append("photos", photo));

      const res = await apiUpload("/restaurants", formData);
      console.log("Restaurant added:", res);

      // ✅ Success message
      setSuccessMessage("Restaurant submitted successfully!");

      // ✅ Clear form and states
      reset();
      setSelectedMoods([]);
      setSelectedFeatures([]);
      setSelectedCuisines([]);
      setSelectedPrices([]);
      setPhotos([]);

      // ✅ Clear message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setBackendError(
        err?.message || "Something went wrong while adding restaurant"
      );
    }
  

  };

  return (
    <>
      <Header role="admin" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="create-container">
          {/* Left - Photos */}
          <div className="left-container">
            <div className="photo-container">
              Add some photos
              <label htmlFor="photo-upload" className="photo-box">
                Click to add photos
              </label>
              <input type="file" id="photo-upload" accept="image/*" multiple onChange={handlePhotoUpload} />
              {errors.photos && <small className="error">{errors.photos.message}</small>}
              <div className="photo-preview">
                {photos.map((photo, index) => {
                  const previewUrl = URL.createObjectURL(photo);
                  return (
                    <div key={index} className="uploaded-photo-wrapper">
                      <img src={previewUrl} alt="preview" className="uploaded-photo" onLoad={() => URL.revokeObjectURL(previewUrl)} />
                      <span className="remove-photo" onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}>
                        ×
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right - Form Fields */}
          <div className="right-container">
            <div className="name">
              <label>Title the restaurant</label>
              <input type="text" {...register("name")} />
              {errors.name && <small className="error">{errors.name.message}</small>}
            </div>

            <div className="location">
              <label>Add the location</label>
              <input type="text" {...register("location")} />
              {errors.location && <small className="error">{errors.location.message}</small>}
            </div>

            <div className="cuisine">
              <label>What cuisine does it offer?</label>
              <DropdownFilter title="Cuisines" options={cuisineOptions} selectedValues={selectedCuisines} onChange={setSelectedCuisines} />
              {errors.cuisines && <small className="error">{errors.cuisines.message}</small>}
            </div>

            <div className="price">
              <label>Enter the price range</label>
              <DropdownFilter title="Price" options={priceOptions} selectedValues={selectedPrices} onChange={setSelectedPrices} />
              {errors.priceRange && <small className="error">{errors.priceRange.message}</small>}
            </div>

            <div className="hours">
              <label>Enter the opening hours</label>
              <div className="hour-inputs">
                <input type="time" {...register("openTime")} />
                <span>to</span>
                <input type="time" {...register("closeTime")} />
              </div>
              {errors.openTime && <small className="error">{errors.openTime.message}</small>}
              {errors.closeTime && <small className="error">{errors.closeTime.message}</small>}
            </div>

            <div className="description">
              <label>Add a description</label>
              <textarea rows="7" {...register("description")}></textarea>
              {errors.description && <small className="error">{errors.description.message}</small>}
            </div>

            <div className="website">
              <label>Link to the restaurant</label>
              <input type="text" {...register("websiteLink")} />
              {errors.websiteLink && <small className="error">{errors.websiteLink.message}</small>}
            </div>

            <div className="menu">
              <label>Link to the restaurant's menu</label>
              <input type="text" {...register("menuLink")} />
              {errors.menuLink && <small className="error">{errors.menuLink.message}</small>}
            </div>

            <div className="moods">
              <label>Add moods</label>
              <div className="chip-list">
                {moodOptions.map((mood) => (
                  <div key={mood.value} className={`chip ${selectedMoods.includes(mood.value) ? "selected" : ""}`} onClick={() => toggleChip(mood.value, selectedMoods, setSelectedMoods)}>
                    {mood.label}
                  </div>
                ))}
              </div>
              {errors.moods && <small className="error">{errors.moods.message}</small>}
            </div>

            <div className="features">
              <label>Add features</label>
              <div className="chip-list">
                {featureOptions.map((feature) => (
                  <div key={feature.value} className={`chip ${selectedFeatures.includes(feature.value) ? "selected" : ""}`} onClick={() => toggleChip(feature.value, selectedFeatures, setSelectedFeatures)}>
                    {feature.label}
                  </div>
                ))}
              </div>
              {errors.features && <small className="error">{errors.features.message}</small>}
            </div>

            {backendError && (
  <div className="backend-error" style={{ color: "red", margin: "10px 0" }}>
    {backendError}
  </div>
)}
            <button type="submit" className="submit-btn">

              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
