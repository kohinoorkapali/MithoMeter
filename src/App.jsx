import React, { useState, useEffect } from "react";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  // keep localStorage and state in sync
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <>{token ? <PrivateRoutes setToken={setToken} /> : <PublicRoutes setToken={setToken} />}</>;
}

export default App;
