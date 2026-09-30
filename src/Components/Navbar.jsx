import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {

    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>

            {/* Logo */}
            <div
                className={styles.logo}
                onClick={() => navigate("/")}
            >
                Movie Ticket Booking
            </div>

            {/* Navigation */}
            <div className={styles.navLinks}>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Home
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/my-bookings")}
                >
                    My Bookings
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/signin")}
                >
                    Sign In
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </button>

            </div>

        </nav>
    );
}

export default Navbar;