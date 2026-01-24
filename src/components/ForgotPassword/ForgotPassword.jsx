import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/forgot/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong!");

      // Show reset link in center
      toast.custom(
        <div className="center-toast">
          <p>Password reset link:</p>
          <a
            href={data.resetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="center-toast-link"
          >
            {data.resetLink}
          </a>
        </div>,
        {
          position: "top-center", // it will center horizontally
          duration: 10000, // 10 seconds
        }
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <Toaster /> {/* Required to render toasts */}
      <div className="forgot-box">
        <h2 className="forgot-title">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="forgot-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="forgot-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="forgot-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
