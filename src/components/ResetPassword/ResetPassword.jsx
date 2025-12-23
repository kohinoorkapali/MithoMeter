import React from "react";
import "./ResetPassword.css";

export default function ResetPassword() {
  return (
    <div className="reset-wrapper">
      <div className="reset-container">
        <h2 className="title">Reset Password</h2>

        <label>Email</label>
        <input type="email" placeholder="Enter your email" />

        <label>Verification Code</label>
        <input type="text" placeholder="Enter the 6-digit code sent to your email" />

        <label>New Password</label>
        <input type="password" placeholder="Enter new password" />

        <label>Confirm Password</label>
        <input type="password" placeholder="Re-type your new password" />

        <button className="reset-btn">Reset Password</button>

        <p className="back-login">Back to login</p>
      </div>
    </div>
  );
}
