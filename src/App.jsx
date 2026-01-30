import React, { useState, useEffect, Suspense } from "react";
import AppRoutes from "./AppRoutes";
import { Toaster } from "react-hot-toast";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Toaster position="top-right" />
      {/* Pass token & user to AppRoutes */}
      <AppRoutes token={token} user={user} setToken={setToken} setUser={setUser} />
    </Suspense>
  );
}
