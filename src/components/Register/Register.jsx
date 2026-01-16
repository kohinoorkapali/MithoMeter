import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schema/register.schema"; // Your Zod schema
import { apiRequest } from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import "./Register.css";

export default function Register() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

const onSubmit = async (data) => {
  try {
    setBackendError("");
    setLoading(true);

    const payload = {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    await apiRequest("POST", "/auth/register", { data: payload });
    setLoading(false);
    navigate("/login"); 
  } catch (err) {
    setBackendError(err.message);
    setLoading(false);
  }
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
            <input type="text" id="fullname" {...register("fullname")} />
            <div className="invalid-feedback">
              {errors.fullname ? errors.fullname.message : "\u00A0"}
            </div>
          </div>

          {/* Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register("username")} />
            <div className="invalid-feedback">
              {errors.username ? errors.username.message : "\u00A0"}
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            <div className="invalid-feedback">
              {errors.email ? errors.email.message : "\u00A0"}
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
            <div className="invalid-feedback">
              {errors.password ? errors.password.message : "\u00A0"}
            </div>
          </div>

          {/* Retype Password */}
          <div className="input-group">
            <label htmlFor="retype">Retype Password</label>
            <input type="password" id="retype" {...register("retype")} />
            <div className="invalid-feedback">
              {errors.retype ? errors.retype.message : "\u00A0"}
            </div>
          </div>

          {/* Backend Error */}
          {backendError && (
          <div className="backend-error" style={{ color: "red", margin: "10px 0" }}>
            {backendError}
          </div>
        )}

          {/* Submit Button */}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Sign up"}
          </button>

          {/* Login link */}
          <div className="login-link">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
