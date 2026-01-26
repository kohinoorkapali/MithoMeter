import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const ViewDetail = React.lazy(() => import("../components/ViewDetail/ViewDetail"));
const BrowsePage = React.lazy(() => import("../components/BrowsePage/BrowsePage"));
const AddPage = React.lazy(() => import("../components/AddPage/AddPage.jsx"));
const ProfilePage = React.lazy(() => import("../components/ProfilePage/ProfilePage"));
const AddReviewPage = React.lazy(() => import("../components/AddReviewPage/AddReviewPage"));
const ActivityPage = React.lazy(() => import("../components/ActivityPage/ActivityPage.jsx"));
const OwnReviewsPage = React.lazy(() => import("../components/OwnReviewPage/OwnReviewPage")); 
const FavoritesPage = React.lazy(() => import("../components/FavouritesPage/FavouritesPage"));
const AdminPage = React.lazy(() => import("../components/AdminDashboard/AdminDashboard.jsx"));
const ComparePage = React.lazy(() => import("../components/Compare/Compare.jsx"));

const PrivateRoutes = ({ token, user, setToken }) => {
  if (!token || !user) return <Navigate to="/login" replace />;

  const userRole = user.role || "";

  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={userRole === "admin" ? "/admin" : "/browse"} replace />}
        />

        <Route
          path="/addPage"
          element={userRole === "admin" ? <AddPage /> : <Navigate to="/browse" replace />}
        />
        <Route
  path="/activityPage"
  element={
    userRole === "admin" ? (
      <ActivityPage currentUser={user} />
    ) : (
      <Navigate to="/browse" replace />
    )
  }
/>

        <Route
        path="/admin"
        element={userRole === "admin" ? <AdminPage/> : <Navigate to="/browse" replace />}
      />

        <Route path="/browse" element={<BrowsePage currentUser={user} />} />
        <Route
          path="/compare"
          element={<ComparePage currentUser={user} />}
        />


        <Route
          path="/profile"
          element={
            <ProfilePage 
              setToken={setToken} 
              currentUser={user}        // pass current user
              setUser={() => {}}        // optional
            />
          }
        />

        <Route path="/own-reviews" element={<OwnReviewsPage currentUser={user} />} />

        <Route path="/restaurant/:id" element={<ViewDetail currentUser={user} />} />

        <Route path="/restaurant/:id/add-review" element={<AddReviewPage currentUser={user} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/favorites" element={<FavoritesPage currentUser={user} />} />

      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
