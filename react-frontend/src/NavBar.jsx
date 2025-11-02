import "./styles/navBarStyles.css";
import logo from "./styles/nhLogo.png";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo} alt="Logo" className="logo-img" />
                <a href="/" className="logo-text">
                    24/7
                </a>
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/workouts">Workouts</a></li>
                <li><a href="/programs">Programs</a></li>
                <li><a href="/trainers">Trainers</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;