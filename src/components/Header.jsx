import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import './Header.css';

export function Header({ role }) {
    return (
        <div className="header">
            <div className="header-logo">
                <img src={Logo} alt="Logo" />
            </div>

            <div className="mid-header">
                {role === "admin" && (
                    <Link to="/home">Home</Link>
                )}

                <Link to="/browse">Browse</Link>

                {role === "user" && (
                    <Link to="/review">Reviews</Link>
                )}

                {role === "admin" ? (
                    <Link to="/addPage">Add</Link>
                ) : (
                    <Link to="/favourites">Favourites</Link>
                )}
            </div>

            <div className="left-header">
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    );
}
