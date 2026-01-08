import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy-loaded pages
const BrowsePage = React.lazy(() => import("../components/BrowsePage/BrowsePage"));
const AddPage = React.lazy(() => import("../components/AddPage/AddPage.jsx"));
const ProfilePage = React.lazy(() => import("../components/ProfilePage/ProfilePage"));

const PrivateRoutes = ({ token, role, setToken }) => {
  if (!token) return <Navigate to="/login" replace />;

  const userRole = role?.toLowerCase() || "";

  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <Routes>
        {/* Redirect "/" to proper page */}
        <Route
          path="/"
          element={<Navigate to={userRole === "admin" ? "/addPage" : "/browse"} replace />}
        />

        {/* Admin-only page */}
        <Route
          path="/addPage"
          element={userRole === "admin" ? <AddPage /> : <Navigate to="/browse" replace />}
        />

        {/* Browse accessible to everyone logged in */}
        <Route path="/browse" element={<BrowsePage />} />

        {/* Profile page */}
        <Route path="/profile" element={<ProfilePage setToken={setToken} />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
