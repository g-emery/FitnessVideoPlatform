import "./styles/navBarStyles.css";
import logo from "./styles/nhLogo.png";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="https://www.nuffieldhealth.com">
                <img src={logo} alt="Logo" className="logo-img" />
                </a>
                <div className="logo-text">
                    24/7
                    </div>
            </div>
            <ul className="nav-links">
                <li><a href="/">Browse</a></li>
                <li><a href="https://www.nuffieldhealth.com/gyms/247#faqs">FAQ</a></li>
                <li><a href="https://247.nuffieldhealth.com/login">Sign In</a></li>
                <li><a href="/trainers">Trainers</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;