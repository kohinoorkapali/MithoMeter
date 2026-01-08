import React, { useState } from "react";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

export default function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <>
      {token && role ? (
        <PrivateRoutes token={token} role={role} setToken={setToken} />
      ) : (
        <PublicRoutes setToken={setToken} setRole={setRole} />
      )}
    </>
  );
}
