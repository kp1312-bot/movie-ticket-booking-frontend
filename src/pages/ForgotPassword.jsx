import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            const response = await api.post(
                "forgot-password/",
                { email }
            );

            setMessage(
                response.data.message ||
                "If this email is registered, a password reset link has been sent."
            );

        } catch (error) {

            console.log(error.response?.data);

            setMessage(
                error.response?.data?.error ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <h1>Forgot Password</h1>

            <p>
                Enter your registered email address.
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Sending..."
                        : "Send Reset Link"
                    }
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

            <button
                onClick={() => navigate("/signin")}
            >
                Back to Sign In
            </button>

        </div>
    );
}

export default ForgotPassword;