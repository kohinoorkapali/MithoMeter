import React from "react";
import "./LandingPage.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-container">

      <nav className="navbar">
        <div className="nav-left">
          <img src={Logo} alt="logo" className="logo" />
        </div>


        <div className="nav-buttons">
          <Link to="/login">
          <button className="landing-login-btn">Login</button>
          </Link>
          <Link to= "/register">
          <button className="landing-signin-btn">Sign in</button>
          </Link>
          
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
