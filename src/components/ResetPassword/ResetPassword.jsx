import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { resetPasswordSchema } from "../../schema/resetschema"; // <-- import here
import "./ResetPassword.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/forgot/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: data.newPassword }),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || "Something went wrong!");

      toast.success("Password reset successfully!", { style: { textAlign: "center" } });
      reset();

      setTimeout(() => {
        navigate("/login"); // redirect to login after reset
      }, 2000);

    } catch (err) {
      console.error(err);
      toast.error(err.message, { style: { textAlign: "center" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2 className="reset-title">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="reset-label">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className={`reset-input ${errors.newPassword ? "is-invalid" : ""}`}
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <div className="reset-error">{errors.newPassword.message}</div>
          )}

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
