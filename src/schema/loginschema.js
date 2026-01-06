import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email")          
    .email("Enter a valid Gmail address") 
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Enter a valid Gmail address", 
    }),
  password: z
    .string()
    .min(1, "Enter your password")      
    .min(6, "Password must be at least 6 characters"), 
});
