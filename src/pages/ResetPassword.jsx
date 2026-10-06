import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {

    const { uidb64, token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                `reset-password/${uidb64}/${token}/`,
                {
                    password: password
                }
            );

            setMessage(
                response.data.message ||
                "Password reset successful."
            );

            setTimeout(() => {
                navigate("/signin");
            }, 1500);

        } catch (error) {

            console.log(error.response?.data);

            setMessage(
                error.response?.data?.error ||
                "Invalid or expired reset link."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <h1>Reset Password</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Resetting..."
                        : "Reset Password"
                    }
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

        </div>
    );
}

export default ResetPassword;