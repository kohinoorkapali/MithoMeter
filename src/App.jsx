import React, { useState } from "react";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // user object contains role

  return (
    <>
    {/* 🔔 Toast renderer (ONE TIME ONLY) */}
    <Toaster position="top-right" />
      {token && user ? (
        <PrivateRoutes
          token={token}
          user={user}       // pass user including role
          setToken={setToken}
        />
      ) : (
        <PublicRoutes
          setToken={setToken} 
          setUser={setUser} // login page will set user
        />
      )}
    </>
  );
}
