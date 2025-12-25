import './Register.css';
import Img from "../../assets/Login.jpg";
import logo from "../../assets/Logo.png";


export function Register() {
    return (
    <>
        <div className="page-wrapper">
            
            <div className="logo">
                <img src={logo} alt="MithoMeter Logo" />
            </div>
            <div className="register-container">

                <h2>Register Page</h2>
                <p className="subtitle">Create an account to start exploring</p>

                <form>
                    <div className="input-group">
                        <label htmlFor="fullname">Fullname</label>
                        <input type="text" id="fullname" name="fullname" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="retype">Retype Password</label>
                        <input type="password" id="retype" name="retype" required />
                    </div>

                    <button type="submit" className="btn">Sign in</button>
                    <div className="login-link">
                        <p>Already have an account? <a href="/login">Login here</a></p>
                    </div>
                </form>
            </div>
            
        </div>
    </>
    );
}
