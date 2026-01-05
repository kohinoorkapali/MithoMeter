import * as z from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  retype: z.string().min(6, "Retype your password"),
}).refine((data) => data.password === data.retype, {
  message: "Passwords do not match",
  path: ["retype"],
});
