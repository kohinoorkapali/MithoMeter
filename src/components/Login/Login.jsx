import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/loginschema"; 
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/hide.png";
import { apiRequest } from "../../utils/api.js";
import "./Login.css";

export default function Login({ setToken, setUser }) {
  const navigate = useNavigate(); // ✅ initialize navigate

  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setBackendError("");

    try {
      const res = await apiRequest("POST", "/auth/login", {
        data: { email: data.email, password: data.password },
      });

      if (res.access_token) {
        // store token
        setToken(res.access_token);

        // store full user info including role
        const userData = {
          id: res.user.id,
          username: res.user.username,
          fullname: res.user.fullname,
          role: res.user.role?.trim().toLowerCase(), // admin/user
          email: res.user.email,
        };
        setUser(userData);

        // ✅ navigate based on role
        if (userData.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/browse", { replace: true });
        }

      } else {
        setBackendError(res.message || "Invalid credentials");
      }
    } catch (err) {
      setBackendError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} className="login-logo" alt="Logo" />

        <h3 className="login-title">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="login-label">Email</label>
          <input
            type="email"
            className={`login-input ${errors.email ? "is-invalid" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}

          {/* Password */}
          <label className="login-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              spellCheck="false"
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

          {/* Backend Error */}
          {backendError && (
            <div className="backend-error" style={{ color: "red", margin: "10px 0" }}>
              {backendError}
            </div>
          )}

          {/* Login Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register & Forget Password */}
          <div className="register-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
          <div className="forget">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

        </form>
      </div>
    </div>
  );
}
