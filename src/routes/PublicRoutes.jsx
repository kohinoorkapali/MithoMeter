import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ token }) => {
  return token ? <Navigate to="/browse" replace /> : <Outlet />;
};

export default PublicRoutes;
