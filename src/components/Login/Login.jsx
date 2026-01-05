import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/loginschema"; // your Zod schema
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/hide.png";
import "./Login.css"; // your CSS

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // Call your backend API here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} className="login-logo" alt="Logo" />

        <h3 className="login-title">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <label className="login-label">Username</label>
          <input
            type="text"
            className={`login-input ${errors.username ? "is-invalid" : ""}`}
            {...register("username")}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username.message}</div>
          )}

          {/* Password */}
          <label className="login-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className={`login-input ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
            />
            <img
              src={showPassword ? viewIcon : hideIcon}
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              alt="toggle password"
            />
          </div>
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}

          {/* Login Button */}
          <button type="submit" className="login-btn">
            Login
          </button>

          {/* Register & Forget Password */}
          <div className="register-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
          <div className="forget">
            <span>Forget Password?</span>
          </div>
        </form>
      </div>
    </div>
  );
}
