import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const LandingPage = React.lazy(() => import("../components/LandingPage/Landingpage"));
const Login = React.lazy(() => import("../components/Login/Login"));
const Register = React.lazy(() => import("../components/Register/Register"));

const PublicRoutes = ({ setToken, setUser }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
