import { useEffect, useState } from "react";
import "./Analytics.css";
import { apiRequest } from "../../../utils/api";

export function Analytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    activeUsers: 0,
    helpfulChecks: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await apiRequest("GET", "/admin/analytics");
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
  <div className="stats-container">
    <div className="stat-box">
      <p className="stat-number">{stats.totalUsers}</p>
      <p className="stat-label">Total Users</p>
    </div>
  
    <div className="stat-box">
      <p className="stat-number">{stats.totalRestaurants}</p>
      <p className="stat-label">Total Restaurants</p>
    </div>
  
    <div className="stat-box">
      <p className="stat-number">{stats.activeUsers}</p>
      <p className="stat-label">Active Users</p>
    </div>
  
    <div className="stat-box">
      <p className="stat-number">{stats.helpfulChecks}</p>
      <p className="stat-label">Helpful Checks</p>
    </div>
  </div>
  
  );
}
