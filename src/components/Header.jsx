import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import "./Header.css";

export function Header({ role }) {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="mid-header">
        {role === "admin" ? (
          <>
            <Link to="/admin">Home</Link>
            <Link to="/activityPage">Activity</Link>
            <Link to="/addPage">Add</Link>
          </>
        ) : (
          <>
            <Link to="/browse">Browse</Link>
            <Link to="/own-reviews">Reviews</Link>
            <Link to="/favorites">Favourites</Link>
          </>
        )}
      </div>

      <div className="left-header">
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}
