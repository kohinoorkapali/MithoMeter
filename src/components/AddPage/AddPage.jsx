// src/pages/AddPage.jsx
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantSchema } from "../../schema/restaurant.schema.js";
import { apiRequest, apiUpload } from "../../utils/api.js";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Header } from "../Header.jsx";
import { DropdownFilter } from "../../common/DropdownFilter.jsx";
import "./AddPage.css";
import { EditableChips } from "../../common/EditableChips.jsx";

import {
  cuisineOptions,
  moodOptions,
  featureOptions,
  priceOptions,
} from "../../common/filterOptions";

export default function AddPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);

  /* ------------------ FORM SETUP ------------------ */
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(restaurantSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      location: "",
      openTime: "",
      closeTime: "",
      description: "",
      websiteLink: "",
      menuLink: "",
      cuisines: [],
      priceRange: [],
      moods: [],
      features: [],
    },
  });

  /* ------------------ EDIT MODE FETCH ------------------ */
  useEffect(() => {
    if (!id) return;

    const fetchRestaurant = async () => {
      try {
        const res = await apiRequest("GET", `/restaurants/${id}`);

        const restaurant = res.data;

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
          features: restaurant.features ?? [],
        });

        setExistingPhotos(restaurant.photos ?? []);
      } catch (err) {
        console.error("Edit fetch failed:", err);
        toast.error("Failed to load restaurant");
      }
    };

    fetchRestaurant();
  }, [id, reset]);

  /* ------------------ PHOTO UPLOAD ------------------ */
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);

    const oversized = files.find((f) => f.size > 5 * 1024 * 1024);

    if (oversized) {
      toast.error("Each image must be under 5MB");
      return;
    }

    setNewPhotos((prev) => [...prev, ...files].slice(0, 5));
  };

  /* ------------------ SUBMIT ------------------ */
  const onSubmit = async (data) => {
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

    formData.append("existingPhotos", JSON.stringify(existingPhotos));

    newPhotos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      if (isEdit) {
        await apiUpload("PATCH", `/restaurants/${id}`, formData);
        toast.success("Restaurant updated 🎉");
      } else {
        await apiUpload("POST", "/restaurants", formData);
        toast.success("Restaurant added 🎉");

        reset();
        setNewPhotos([]);
        setExistingPhotos([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <>
      <Header role="admin" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="create-container">

          {/* ================= LEFT : PHOTOS ================= */}
          <div className="left-container">
            <div className="photo-container">

              <h3>Add Photos</h3>

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

              {/* Existing */}
              {existingPhotos.length > 0 && (
                <div className="photo-preview">
                  {existingPhotos.map((photo, i) => (
                    <div key={i} className="uploaded-photo-wrapper">

                      <img
                        src={`http://localhost:5000${photo}`}
                        className="uploaded-photo"
                        alt=""
                      />

                      <span
                        className="remove-photo"
                        onClick={() =>
                          setExistingPhotos((p) =>
                            p.filter((_, index) => index !== i)
                          )
                        }
                      >
                        ×
                      </span>

                    </div>
                  ))}
                </div>
              )}

              {/* New */}
              <div className="photo-preview">
                {newPhotos.map((photo, i) => {
                  const url = URL.createObjectURL(photo);

                  return (
                    <div key={i} className="uploaded-photo-wrapper">

                      <img
                        src={url}
                        className="uploaded-photo"
                        alt=""
                        onLoad={() => URL.revokeObjectURL(url)}
                      />

                      <span
                        className="remove-photo"
                        onClick={() =>
                          setNewPhotos((p) =>
                            p.filter((_, index) => index !== i)
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

          {/* ================= RIGHT : FORM ================= */}
          <div className="right-container">

            {/* Name */}
            <div>
              <label>Restaurant Name</label>
              <input {...register("name")} />
              {errors.name && <small>{errors.name.message}</small>}
            </div>

            {/* Location */}
            <div>
              <label>Location</label>
              <input {...register("location")} />
              {errors.location && <small>{errors.location.message}</small>}
            </div>

            {/* Cuisine */}
            <div>
              <label>Cuisines</label>

              <Controller
                name="cuisines"
                control={control}
                render={({ field }) => (
                  <DropdownFilter
                    title="Cuisines"
                    options={cuisineOptions}
                    selectedValues={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Price */}
            <div>
              <label>Price Range</label>

              <Controller
                name="priceRange"
                control={control}
                render={({ field }) => (
                  <DropdownFilter
                    title="Price"
                    options={priceOptions}
                    selectedValues={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Hours */}
            <div>
              <label>Opening Hours</label>

              <div className="hour-inputs">
                <input type="time" {...register("openTime")} />
                <span>to</span>
                <input type="time" {...register("closeTime")} />
              </div>

              {errors.openTime && <small>{errors.openTime.message}</small>}
              {errors.closeTime && <small>{errors.closeTime.message}</small>}
            </div>

            {/* Description */}
            <div>
              <label>Description</label>
              <textarea rows="6" {...register("description")} />
              {errors.description && <small>{errors.description.message}</small>}
            </div>

            {/* Website */}
            <div>
              <label>Website</label>
              <input {...register("websiteLink")} />
            </div>

            {/* Menu */}
            <div>
              <label>Menu Link</label>
              <input {...register("menuLink")} />
            </div>

            {/* Moods */}
            <Controller
              name="moods"
              control={control}
              render={({ field }) => (
                <EditableChips
                  label="Add moods"
                  options={moodOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.moods}
                />
              )}
            />


            {/* Features */}
            <Controller
              name="features"
              control={control}
              render={({ field }) => (
                <EditableChips
                  label="Add features"
                  options={featureOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.features}
                />
              )}
            />


            <button type="submit" className="submit-btn">
              {isEdit ? "Update" : "Submit"}
            </button>

          </div>
        </div>
      </form>
    </>
  );
}
