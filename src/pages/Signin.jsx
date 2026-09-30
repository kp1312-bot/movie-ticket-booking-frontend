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

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            const response = await api.post(
                "signin/",
                formData
            );

            console.log(
                "LOGIN RESPONSE:",
                response.data
            );


            // Get JWT tokens
            const accessToken =
                response.data?.access;

            const refreshToken =
                response.data?.refresh;


            // Check access token
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


            console.log(
                "ACCESS TOKEN SAVED"
            );


            setMessage(
                response.data?.message ||
                "Signin successful!"
            );


            // Go to Home
            setTimeout(() => {

                navigate("/");

            }, 1000);


        } catch (error) {

            console.log(
                "SIGNIN ERROR:",
                error.response?.data
            );


            setMessage(
                error.response?.data?.error ||
                "Signin failed"
            );


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
                            required
                        />

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

                    <span
                        onClick={() =>
                            navigate("/signup")
                        }
                    >
                        Sign Up
                    </span>

                </p>


            </div>

        </div>

    );

}

export default Signin;