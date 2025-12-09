import Logo from "../assets/Logo.png";

import './Header.css';

export function Header(){
    return(
        <div className="header">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>

                <div className="mid-header">
                    <a href="/home">Home</a>
                    <a href="/browse">Browse</a>
                    <a href="/reviews">Reviews</a>
                </div>

                <div className="left-header">
                    <a href="/profile">Profile</a>
                </div>
            </div>
    );
}