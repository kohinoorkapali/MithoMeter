import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const ViewDetail = React.lazy(() => import("../components/ViewDetail/ViewDetail"));
const BrowsePage = React.lazy(() => import("../components/BrowsePage/BrowsePage"));
const AddPage = React.lazy(() => import("../components/AddPage/AddPage.jsx"));
const ProfilePage = React.lazy(() => import("../components/ProfilePage/ProfilePage"));
const AddReviewPage = React.lazy(() => import("../components/AddReviewPage/AddReviewPage"));
const ActivityPage = React.lazy(() => import("../components/ActivityPage/ActivityPage.jsx"));
const FavouritesPage = React.lazy(() => import("../components/FavouritesPage/FavouritesPage.jsx"));
const PrivateRoutes = ({ token, user, setToken }) => {
  if (!token || !user) return <Navigate to="/login" replace />;

  const userRole = user.role || "";

  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={userRole === "admin" ? "/addPage" : "/browse"} replace />}
        />

        <Route
          path="/addPage"
          element={userRole === "admin" ? <AddPage /> : <Navigate to="/browse" replace />}
        />
        <Route
          path="/activityPage"
          element={userRole === "admin" ? <ActivityPage /> : <Navigate to="/browse" replace />}
        />

        <Route path="/browse" element={<BrowsePage currentUser={user} />} />
        <Route path="/profile" element={<ProfilePage setToken={setToken} />} />
        <Route path="/restaurant/:id" element={<ViewDetail user={user} />} />
        <Route path="/restaurant/:id/add-review" element={<AddReviewPage currentUser={user} />} />
        <Route path="/favorite" element={<FavouritesPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
