import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function BookingConfirmation() {

    const location = useLocation();
    const navigate = useNavigate();

    const booking = location.state;

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(
        booking?.status || "Confirmed"
    );
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // If booking data is not available
    if (!booking) {
        return (
            <div>
                <h1>Booking Confirmation</h1>
                <p>No booking information found.</p>

                <button onClick={() => navigate("/")}>
                    Go Home
                </button>
            </div>
        );
    }

    // Get real booking ID
    const bookingId =
        booking.booking_id ||
        booking.bookingId ||
        booking.id;

    const cancelBooking = async () => {

        setLoading(true);
        setError("");
        setMessage("");

        const token = localStorage.getItem("access");

        console.log("========== CANCEL BOOKING ==========");
        console.log("BOOKING ID:", bookingId);
        console.log("TOKEN:", token);

        if (!token) {
            setError("Please login again before cancelling the booking.");
            setLoading(false);
            return;
        }

        if (!bookingId) {
            setError("Booking ID not found.");
            setLoading(false);
            return;
        }

        try {

            const response = await axios.post(
                `http://127.0.0.1:8000/api/bookings/${bookingId}/cancel/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("CANCEL RESPONSE:", response.data);

            setStatus("Cancelled");

            setMessage(
                response.data?.message ||
                "Booking cancelled successfully."
            );

        } catch (err) {

            console.log(
                "CANCEL STATUS:",
                err.response?.status
            );

            console.log(
                "CANCEL ERROR:",
                err.response?.data
            );

            if (err.response?.status === 401) {

                setError(
                    "Login session expired. Please login again."
                );

            } else if (err.response?.status === 404) {

                setError(
                    err.response?.data?.error ||
                    "Booking or cancel URL not found."
                );

            } else {

                setError(
                    err.response?.data?.error ||
                    "Unable to cancel booking."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <h1>Booking Confirmation</h1>

            <hr />

            <h2>Booking Details</h2>

            <p>
                <strong>Booking ID:</strong>{" "}
                {bookingId}
            </p>

            <p>
                <strong>Movie:</strong>{" "}
                {booking.movie_title || booking.movie}
            </p>

            <p>
                <strong>Show ID:</strong>{" "}
                {booking.show_id || booking.showId}
            </p>

            <p>
                <strong>Show Date:</strong>{" "}
                {booking.show_date || "-"}
            </p>

            <p>
                <strong>Show Time:</strong>{" "}
                {booking.show_time || "-"}
            </p>

            <p>
                <strong>Screen:</strong>{" "}
                {booking.screen || "-"}
            </p>

            <p>
                <strong>Seats:</strong>{" "}
                {Array.isArray(booking.seatNames)
                    ? booking.seatNames.join(", ")
                    : Array.isArray(booking.seats)
                        ? booking.seats.join(", ")
                        : "-"}
            </p>

            <p>
                <strong>Total Amount:</strong>{" "}
                ₹{booking.total_amount || booking.amount || 0}
            </p>

            <p>
                <strong>Payment Method:</strong>{" "}
                {booking.paymentMethod || "-"}
            </p>

            <p>
                <strong>Transaction ID:</strong>{" "}
                {booking.transactionId || "-"}
            </p>

            <h3>
                Status: {status}
            </h3>

            {message && (
                <p style={{
                    color: "green",
                    fontWeight: "bold",
                    backgroundColor: "#e6ffe6",
                    padding: "10px",
                    borderRadius: "5px"
                }}>
                    {message}
                </p>
            )}

            {error && (
                <p style={{
                    color: "red",
                    fontWeight: "bold",
                    backgroundColor: "#ffe6e6",
                    padding: "10px",
                    borderRadius: "5px"
                }}>
                    {error}
                </p>
            )}

            <br />

            {status !== "Cancelled" && (
                <button
                    type="button"
                    onClick={cancelBooking}
                    disabled={loading}
                >
                    {loading
                        ? "Cancelling..."
                        : "Cancel Booking"}
                </button>
            )}

            {status === "Cancelled" && (
                <p style={{
                    color: "green",
                    fontWeight: "bold"
                }}>
                    Booking Cancelled
                </p>
            )}

            <br />
            <br />

            <button
                type="button"
                onClick={() => navigate("/")}
            >
                Go Home
            </button>

        </div>
    );
}

export default BookingConfirmation;