import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = async () => {

        const token = localStorage.getItem("access");

        if (!token) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/bookings/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("MY BOOKINGS:", response.data);

            setBookings(response.data);

        } catch (err) {

            console.log("BOOKINGS ERROR:", err.response?.data);

            if (err.response?.status === 401) {
                setError("Login session expired. Please login again.");
            } else {
                setError("Unable to load bookings.");
            }

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading bookings...</h2>;
    }

    return (
        <div>

            <h1>My Bookings</h1>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {!error && bookings.length === 0 && (
                <div>
                    <h3>No bookings found.</h3>

                    <button onClick={() => navigate("/")}>
                        Book a Movie
                    </button>
                </div>
            )}

            {bookings.map((booking) => (

                <div
                    key={booking.booking_id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        margin: "20px 0",
                        borderRadius: "10px"
                    }}
                >

                    <h2>
                        {booking.movie}
                    </h2>

                    <p>
                        <strong>Booking ID:</strong>{" "}
                        {booking.booking_id}
                    </p>

                    <p>
                        <strong>Date:</strong>{" "}
                        {booking.show_date}
                    </p>

                    <p>
                        <strong>Time:</strong>{" "}
                        {booking.show_time}
                    </p>

                    <p>
                        <strong>Screen:</strong>{" "}
                        {booking.screen}
                    </p>

                    <p>
                        <strong>Seats:</strong>{" "}
                        {booking.seats.join(", ")}
                    </p>

                    <p>
                        <strong>Total:</strong>{" "}
                        ₹{booking.total_amount}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {booking.status}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default MyBookings;