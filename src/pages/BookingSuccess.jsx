import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BookingSummary.module.css";

function BookingSummary() {

    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Data coming from Seats page
    const {
        showId,
        seatIds,
        seatNames
    } = location.state || {};

    const ticketPrice = 150;

    const totalAmount =
        (seatIds?.length || 0) * ticketPrice;


    // Get show details
    useEffect(() => {

        if (!showId) {
            setError("Show information is missing.");
            return;
        }

        axios
            .get("http://127.0.0.1:8000/api/shows/")
            .then((response) => {

                console.log("SHOW DATA:", response.data);

                const showData = response.data.find(
                    (item) =>
                        item.id === Number(showId)
                );

                if (showData) {
                    setShow(showData);
                } else {
                    setError("Show not found.");
                }

            })
            .catch((err) => {

                console.log("SHOW ERROR:", err);

                setError(
                    "Unable to load show details."
                );

            });

    }, [showId]);


    // Confirm Booking
    const confirmBooking = async () => {

        const token =
            localStorage.getItem("access");

        console.log("ACCESS TOKEN:", token);
        console.log("SHOW ID:", showId);
        console.log("SEAT IDS:", seatIds);


        // Check login
        if (!token) {

            alert("Please signin first.");

            navigate("/signin");

            return;
        }


        // Check booking data
        if (
            !showId ||
            !seatIds ||
            seatIds.length === 0
        ) {

            alert(
                "Booking information is missing."
            );

            return;
        }


        try {

            setLoading(true);

            const response = await axios.post(

                "http://127.0.0.1:8000/api/bookings/",

                {
                    show: Number(showId),
                    seats: seatIds
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json"
                    }
                }

            );


            console.log(
                "BOOKING SUCCESS:",
                response.data
            );


            navigate(
                "/booking-confirmation",
                {
                    state: response.data
                }
            );


        } catch (error) {

            console.log(
                "BOOKING ERROR:",
                error
            );

            console.log(
                "STATUS:",
                error.response?.status
            );

            console.log(
                "ERROR DATA:",
                error.response?.data
            );


            if (
                error.response?.status === 401
            ) {

                alert(
                    "Login expired. Please signin again."
                );

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                navigate("/signin");

                return;
            }


            alert(
                error.response?.data?.error ||
                error.response?.data?.detail ||
                "Booking Failed!"
            );

        } finally {

            setLoading(false);

        }

    };


    // Loading show
    if (!show && !error) {

        return (
            <div className={styles.loading}>

                <h2>
                    Loading booking details...
                </h2>

            </div>
        );

    }


    // Error loading show
    if (error) {

        return (
            <div className={styles.error}>

                <h2>
                    {error}
                </h2>

                <button
                    className={styles.errorButton}
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

            </div>
        );

    }


    return (

        <div className={styles.container}>

            <h1 className={styles.title}>
                Booking Summary
            </h1>

            <hr className={styles.divider} />


            {/* Movie */}
            <h2 className={styles.sectionTitle}>
                Movie
            </h2>

            <p className={styles.info}>
                Movie ID : {show.movie}
            </p>


            {/* Date */}
            <h3 className={styles.sectionTitle}>
                Date
            </h3>

            <p className={styles.info}>
                {show.show_date}
            </p>


            {/* Time */}
            <h3 className={styles.sectionTitle}>
                Time
            </h3>

            <p className={styles.info}>
                {show.show_time}
            </p>


            {/* Screen */}
            <h3 className={styles.sectionTitle}>
                Screen
            </h3>

            <p className={styles.info}>
                {show.screen}
            </p>


            <hr className={styles.divider} />


            {/* Selected Seats */}
            <h3 className={styles.sectionTitle}>
                Selected Seats
            </h3>

            <p className={styles.seats}>
                {seatNames?.length > 0
                    ? seatNames.join(", ")
                    : "No seats selected"
                }
            </p>


            {/* Ticket Price */}
            <p className={styles.info}>
                Ticket Price : ₹{ticketPrice}
            </p>


            {/* Number of Seats */}
            <p className={styles.info}>
                Number of Seats :{" "}
                {seatIds?.length || 0}
            </p>


            {/* Total */}
            <h2 className={styles.total}>
                Total Amount : ₹{totalAmount}
            </h2>


            <br />


            {/* Confirm Booking */}
            <button
                type="button"
                className={styles.button}
                onClick={confirmBooking}
                disabled={loading}
            >

                {loading
                    ? "Booking..."
                    : "Confirm Booking"
                }

            </button>


            <br />
            <br />


            {/* Back */}
            <button
                type="button"
                className={styles.backButton}
                onClick={() => navigate(-1)}
            >
                Back to Seats
            </button>

        </div>
    );
}

export default BookingSummary;