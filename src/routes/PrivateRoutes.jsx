import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const BrowsePage = React.lazy(() => import("../components/BrowsePage/BrowsePage"));
const AddPage = React.lazy(() => import("../components/AddPage/AddPage"));
const ProfilePage = React.lazy(() => import("../components/ProfilePage/ProfilePage"));

const PrivateRoutes = ({ setToken }) => {
  const token = localStorage.getItem("access_token"); // check if user is logged in

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/add" element={<AddPage />} />
        {/* Pass setToken so ProfilePage can logout properly */}
        <Route path="/profile" element={<ProfilePage setToken={setToken} />} />
        {/* fallback for unknown private routes */}
        <Route path="*" element={<Navigate to="/browse" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
