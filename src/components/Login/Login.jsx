import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/Logo.png";

// ✔ Add these two lines (import your images)
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/hide.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      
      {/* ✔ Logo on the left */}
      <img src={logo} className="login-logo" alt="logo" />

      <div className="login-box">

        <h2 className="login-title">Login </h2>

        {/* Username */}
        <label className="login-label">Username</label>
        <input type="text" className="login-input" />

        {/* Password + Eye Icon */}
        <label className="login-label">Password</label>

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="login-input"
          />
          <img
            src={showPassword ? viewIcon : hideIcon}
            alt="toggle password"
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* Login Button */}
        <button className="login-btn">Login</button>

        {/* Register text */}
        <div className="register-text">
          Don't have an account? <span>Register here.</span>
        </div>

        <div className="forget">
       <span> Forget Password</span>
        </div>

      </div>
    </div>
  );
}

export default Login;
