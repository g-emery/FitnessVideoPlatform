import "./styles/navBarStyles.css";
import logo from "./styles/nhLogo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="https://www.nuffieldhealth.com">
                <img src={logo} alt="Logo" className="logo-img" />
                </Link>
                <div className="logo-text">
                    24/7
                    </div>
            </div>
            <ul className="nav-links">
                <Link to="/videos">Browse</Link>
                <Link to="https://www.nuffieldhealth.com/gyms/247#faqs">FAQ</Link>
                <Link to="/">Sign In</Link>
                <Link to="/trainers">Trainers</Link>
                <Link to="/profile">Profile</Link>
            </ul>
        </nav>
    );
};

export default NavBar;