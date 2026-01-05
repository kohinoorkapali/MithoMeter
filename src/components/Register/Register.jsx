import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schema/register.schema"; // Your Zod schema
import logo from "../../assets/Logo.png";
import "./Register.css";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    // Call backend API here
  };

  return (
    <div className="register-page">
      <div className="logo">
        <img src={logo} alt="MithoMeter Logo" />
      </div>

      <div className="register-container">
        <h2>Register Page</h2>
        <p className="subtitle">Create an account to start exploring</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Fullname */}
          <div className="input-group">
            <label htmlFor="fullname">Fullname</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                id="fullname"
                {...register("fullname")}
              />
              <div className="invalid-feedback" style={{ minHeight: "18px" }}>
                {errors.fullname ? errors.fullname.message : "\u00A0"}
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                id="username"
                {...register("username")}
              />
              <div className="invalid-feedback" style={{ minHeight: "18px" }}>
                {errors.username ? errors.username.message : "\u00A0"}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="email"
                id="email"
                {...register("email")}
              />
              <div className="invalid-feedback" style={{ minHeight: "18px" }}>
                {errors.email ? errors.email.message : "\u00A0"}
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="password"
                id="password"
                {...register("password")}
              />
              <div className="invalid-feedback" style={{ minHeight: "18px" }}>
                {errors.password ? errors.password.message : "\u00A0"}
              </div>
            </div>
          </div>

          {/* Retype Password */}
          <div className="input-group">
            <label htmlFor="retype">Retype Password</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="password"
                id="retype"
                {...register("retype")}
              />
              <div className="invalid-feedback" style={{ minHeight: "18px" }}>
                {errors.retype ? errors.retype.message : "\u00A0"}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn">Sign in</button>

          {/* Login link */}
          <div className="login-link">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
