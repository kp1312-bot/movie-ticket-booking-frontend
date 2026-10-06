import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./Signin.module.css";

function Signin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        const username = formData.username.trim();
        const password = formData.password;

        if (!username || !password) {
            setMessage("Please enter username and password.");
            return;
        }

        setLoading(true);

        try {
            // Send login request to Django
            const response = await api.post(
                "signin/",
                {
                    username: username,
                    password: password
                }
            );

            console.log("LOGIN STATUS:", response.status);
            console.log("LOGIN RESPONSE:", response.data);

            const accessToken = response.data?.access;
            const refreshToken = response.data?.refresh;

            if (!accessToken) {
                setMessage(
                    "Login failed. Access token not received."
                );
                return;
            }

            // Save JWT tokens
            localStorage.setItem(
                "access",
                accessToken
            );

            localStorage.setItem(
                "refresh",
                refreshToken || ""
            );

            // Save username
            localStorage.setItem(
                "username",
                username
            );

            setMessage(
                response.data?.message ||
                "Signin Successful"
            );

            // Go to home page
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            console.error(
                "SIGNIN ERROR:",
                error
            );

            console.log(
                "SERVER STATUS:",
                error.response?.status
            );

            console.log(
                "SERVER RESPONSE:",
                error.response?.data
            );

            if (error.response?.status === 401) {

                setMessage(
                    "Invalid username or password"
                );

            } else if (!error.response) {

                setMessage(
                    "Unable to connect to server."
                );

            } else {

                setMessage(
                    error.response?.data?.error ||
                    "Signin failed. Please try again."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signinPage}>

            <div className={styles.signinCard}>

                <div className={styles.logo}>
                    🎬
                </div>

                <h1>
                    Welcome Back
                </h1>

                <p className={styles.subtitle}>
                    Sign in to continue booking
                    your movie tickets
                </p>

                <form onSubmit={handleSubmit}>

                    {/* USERNAME */}

                    <div className={styles.inputGroup}>

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                            required
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className={styles.inputGroup}>

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />

                    </div>

                    {/* FORGOT PASSWORD */}

                    <div className={styles.forgotPassword}>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/forgot-password")
                            }
                        >
                            Forgot Password?
                        </button>

                    </div>

                    {/* SIGN IN BUTTON */}

                    <button
                        type="submit"
                        className={styles.signinButton}
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"
                        }
                    </button>

                </form>

                {/* MESSAGE */}

                {message && (
                    <p className={styles.message}>
                        {message}
                    </p>
                )}

                {/* SIGN UP */}

                <p className={styles.signupText}>

                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/signup")
                        }
                    >
                        Sign Up
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Signin;

