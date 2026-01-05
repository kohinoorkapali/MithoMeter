import * as z from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(1, "Please enter your fullname"),
  username: z.string().min(1, "Please enter your username"),
  email: z
    .string()
    .min(1, "Please enter your email") // empty email
    .email("Invalid email"),            // invalid format
  password: z.string().min(1, "Please enter your password") // empty password
    .min(6, "Password must be at least 6 characters"),      // too short
  retype: z.string().min(1, "Please retype your password")
    .min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.retype, {
  message: "Passwords do not match",
  path: ["retype"], // show error on retype field
});
