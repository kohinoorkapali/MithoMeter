// src/AppRoutes.jsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

// Lazy-loaded pages
const LandingPage = React.lazy(() => import("./components/LandingPage/Landingpage"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Register = React.lazy(() => import("./components/Register/Register"));
const ForgotPassword = React.lazy(() => import("./components/ForgotPassword/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./components/ResetPassword/ResetPassword"));

const BrowsePage = React.lazy(() => import("./components/BrowsePage/BrowsePage"));
const ViewDetail = React.lazy(() => import("./components/ViewDetail/ViewDetail"));
const AddReviewPage = React.lazy(() => import("./components/AddReviewPage/AddReviewPage"));
const ProfilePage = React.lazy(() => import("./components/ProfilePage/ProfilePage"));
const OwnReviewsPage = React.lazy(() => import("./components/OwnReviewPage/OwnReviewPage"));
const FavoritesPage = React.lazy(() => import("./components/FavouritesPage/FavouritesPage"));
const AddPage = React.lazy(() => import("./components/AddPage/AddPage"));
const ActivityPage = React.lazy(() => import("./components/ActivityPage/ActivityPage"));
const AdminPage = React.lazy(() => import("./components/AdminDashboard/AdminDashboard"));
const ComparePage = React.lazy(() => import("./components/Compare/Compare"));


const AppRoutes = ({ token, user, setToken, setUser }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes setToken={setToken} setUser={setUser} />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes token={token} user={user} setToken={setToken} />}>
          <Route path="/browse" element={<BrowsePage currentUser={user} />} />
          <Route path="/restaurant/:id" element={<ViewDetail currentUser={user} />} />
          <Route path="/restaurant/:id/add-review" element={<AddReviewPage currentUser={user} />} />
          <Route path="/profile" element={<ProfilePage currentUser={user} setToken={setToken} setUser={setUser} />} />
          <Route path="/own-reviews" element={<OwnReviewsPage currentUser={user} />} />
          <Route path="/favorites" element={<FavoritesPage currentUser={user} />} />
          <Route path="/compare" element={<ComparePage currentUser={user} />} />

          {/* Admin-only pages */}
          <Route path="/addPage" element={user?.role === "admin" ? <AddPage /> : <Navigate to="/browse" replace />} />
          <Route path="/activityPage" element={user?.role === "admin" ? <ActivityPage currentUser={user} /> : <Navigate to="/browse" replace />} />
          <Route path="/admin" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/browse" replace />} />
        </Route>

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
