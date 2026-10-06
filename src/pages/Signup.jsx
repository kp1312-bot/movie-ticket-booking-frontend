import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./Signup.module.css";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            console.log("SIGNUP DATA:",formData);
            const response = await api.post("signup/",formData
            );

            setMessage(
                response.data.message || "Signup successful!"
            );

            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                password: "",
            });

            // Go to signin after signup
            setTimeout(() => {
                navigate("/signin");
            }, 1000);

        } catch (error) {

            console.log(error.response?.data);

            setMessage(
                error.response?.data?.error ||
                "Signup failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className={styles.signupPage}>

            <div className={styles.signupCard}>

                <div className={styles.logo}>
                    🎬
                </div>

                <h1>Create Account</h1>

                <p className={styles.subtitle}>
                    Create your account and start booking movie tickets
                </p>


                <form onSubmit={handleSubmit}>

                    <div className={styles.nameRow}>

                        <div className={styles.inputGroup}>
                            <label>First Name</label>

                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className={styles.inputGroup}>
                            <label>Last Name</label>

                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>


                    <div className={styles.inputGroup}>

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className={styles.inputGroup}>

                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className={styles.inputGroup}>

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className={styles.signupButton}
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }
                    </button>

                </form>


                {message && (
                    <p className={styles.message}>
                        {message}
                    </p>
                )}


                <p className={styles.signinText}>
                    Already have an account?
                    {" "}
                    <span
                        onClick={() => navigate("/signin")}
                    >
                        Sign In
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Signup;