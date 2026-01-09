// src/schema/restaurant.schema.js
import * as z from "zod";

export const restaurantSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  location: z.string().min(1, "Location is required"),
  openTime: z.string().min(1, "Opening time is required"),
  closeTime: z.string().min(1, "Closing time is required"),
  description: z.string().min(1, "Description is required"),

  // Make links required
  websiteLink: z.string().url("Invalid website URL"),
  menuLink: z.string().url("Invalid menu URL"),

  cuisines: z.array(z.string()).min(1, "Select at least one cuisine"),
  priceRange: z.array(z.string()).min(1, "Select a price range"),
  moods: z.array(z.string()).min(1, "Select at least one mood"),
  features: z.array(z.string()).min(1, "Select at least one feature"),

  photos: z
    .array(z.instanceof(File))
    .min(1, "Please add at least one photo")
    .max(5, "You can upload max 5 photos"),
});
