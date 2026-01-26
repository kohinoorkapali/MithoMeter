// src/pages/AddPage.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantSchema  } from "../../schema/restaurant.schema.js";
import { apiRequest, apiUpload } from "../../utils/api.js";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Header } from "../Header.jsx";
import { DropdownFilter } from "../../common/DropdownFilter.jsx";
import "./AddPage.css";
import { EditableChips } from "../../common/EditableChips.jsx";

export default function AddPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  // react-hook-form with Zod
  const [backendError, setBackendError] = useState("");
  
  const [successMessage, setSuccessMessage] = useState(""); //  success state

  
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
  

  //EDIT PAGE
  useEffect(() => {
    if (!id) return;
    const fetchRestaurant = async () => {
      try {
        const res = await apiRequest("GET", `/restaurants/${id}`);
  
        console.log("EDIT FETCH RESPONSE:", res);
  
        const restaurant = res.data; // ✅ THIS IS THE KEY
  
        reset({
          name: restaurant.name ?? "",
          location: restaurant.location ?? "",
          openTime: restaurant.openTime ?? "",
          closeTime: restaurant.closeTime ?? "",
          description: restaurant.description ?? "",
          websiteLink: restaurant.websiteLink ?? "",
          menuLink: restaurant.menuLink ?? "",
          cuisines: restaurant.cuisines ?? [],
          priceRange: restaurant.priceRange ?? [],
          moods: restaurant.moods ?? [],
          features: restaurant.features ?? []
        });

        setExistingPhotos(restaurant.photos ?? []);
  
        setSelectedCuisines(restaurant.cuisines ?? []);
        setSelectedPrices(restaurant.priceRange ?? []);
        setSelectedMoods(restaurant.moods ?? []);
        setSelectedFeatures(restaurant.features ?? []);
      } catch (err) {
        console.error("Edit fetch failed:", err.message);
      }
    };
    fetchRestaurant();
  }, [id, reset]);
  
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

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files); 
    const oversized = files.find(file => file.size > 5 * 1024 * 1024);
    if (oversized) {
      alert("Each image must be under 5MB");
      return;
    } 
    setNewPhotos(prev => [...prev, ...files].slice(0, 5));
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
    console.log("SUBMIT DATA:", data);
    const formData = new FormData();
  
    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("openTime", data.openTime);
    formData.append("closeTime", data.closeTime);
    formData.append("description", data.description);
    formData.append("websiteLink", data.websiteLink);
    formData.append("menuLink", data.menuLink);
  
    formData.append("cuisines", JSON.stringify(selectedCuisines));
    formData.append("priceRange", JSON.stringify(selectedPrices));
    formData.append("moods", JSON.stringify(selectedMoods));
    formData.append("features", JSON.stringify(selectedFeatures));
  
    formData.append("existingPhotos", JSON.stringify(existingPhotos));
  
    newPhotos.forEach((photo) => {
      formData.append("photos", photo);
    });
  
    try {
      if (isEdit) {
        await apiUpload("PATCH", `/restaurants/${id}`, formData);
  
        toast.success("Restaurant updated successfully ✅");
      } else {
        await apiUpload("POST", "/restaurants", formData);
  
        toast.success("Restaurant added successfully 🎉");
      }
  
      // Optional: Reset after success (for create only)
      if (!isEdit) {
        reset();
        setNewPhotos([]);
        setExistingPhotos([]);
        setSelectedCuisines([]);
        setSelectedPrices([]);
        setSelectedMoods([]);
        setSelectedFeatures([]);
      }
  
    } catch (err) {
      console.error("Submit error:", err);
  
      toast.error(
        err?.response?.data?.message || "Something went wrong ❌"
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
              <input
                type="file"
                id="photo-upload"
                name="photos"          
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
              />
              {errors.photos && <small className="error">{errors.photos.message}</small>}

              {/* EXISTING PHOTOS (from DB) */}
              {existingPhotos.length > 0 && (
                <div className="photo-preview">
                  {existingPhotos.map((photo, index) => (
                    <div key={index} className="uploaded-photo-wrapper">
                      <img
                        src={encodeURI(
                          `http://localhost:5000/${photo.replace(/\\/g, "/")}`
                        )}
                        alt="existing"
                        className="uploaded-photo"
                      />
                      <span
                        className="remove-photo"
                        onClick={() =>
                          setExistingPhotos((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      >
                        ×
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* NEWLY UPLOADED PHOTOS */}
              <div className="photo-preview">
                {newPhotos.map((photo, index) => {
                  const previewUrl = URL.createObjectURL(photo);
                  return (
                    <div key={index} className="uploaded-photo-wrapper">
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="uploaded-photo"
                        onLoad={() => URL.revokeObjectURL(previewUrl)}
                      />
                      <span
                        className="remove-photo"
                        onClick={() =>
                          setNewPhotos((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
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

           <EditableChips
            name="moods"
            label="Add moods"
            options={moodOptions}
            register={register}
            setValue={setValue}
            error={errors.moods}
          />

           <EditableChips

            name="features"
            label="Add features"
            options={featureOptions}
            register={register}
            setValue={setValue}
            error={errors.features}
          />
          
            {backendError && (
              <div className="backend-error" style={{ color: "red", margin: "10px 0" }}>
                {backendError}
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isEdit ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
