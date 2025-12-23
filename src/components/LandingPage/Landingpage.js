import React from "react";
import "./LandingPage.css";
import Logo from "../../assets/Logo.png";

export default function LandingPage() {
  return (
    <div className="landing-container">

      <nav className="navbar">
        <div className="nav-left">
          <img src={Logo} alt="logo" className="logo" />
        </div>


        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="signin-btn">Sign in</button>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-text">
          <h1>
            Discover The Best <br /> Restaurants Near <br /> You!
          </h1>
          <p>
            Honest reviews, real photos and trusted ratings – all in one place.
          </p>
        </div>
      </div>

    </div>
  );
}
