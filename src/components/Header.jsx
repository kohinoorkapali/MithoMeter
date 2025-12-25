import Logo from "../assets/Logo.png";

import './Header.css';

export function Header({role}){
    return(
        <div className="header">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>

                <div className="mid-header">
                    {role === "admin" && (
                        <a href="/home">Home</a>
                        )}
                    <a href="/browse">Browse</a>

                    {role === "user" && (
                    <a href="/review">Reviews</a>
                    )}

                    {role === "admin" ? (
                    <a href="/add">Add</a>
                    ) : (
                    <a href="/favourites">Favourites</a>
                    )}
                    </div>

                <div className="left-header">
                    <a href="/profile">Profile</a>
                </div>
            </div>
    );
}