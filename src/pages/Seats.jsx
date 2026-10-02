import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Seats.module.css";

function Seats() {

    const { showId } = useParams();
    const navigate = useNavigate();

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [error, setError] = useState("");

    // Get seats from Django
    useEffect(() => {

        axios
            .get(`https://movie-ticket-booking-ywrj.onrender.com/api/seats/${showId}/`)
            .then((response) => {

                console.log("SHOW ID:", showId);
                console.log("SEATS API:", response.data);

                setSeats(response.data);

            })
            .catch((err) => {

                console.log("SEAT ERROR:", err);

                setError("Unable to load seats.");

            });

    }, [showId]);


    // Select / Unselect seat
    const selectSeat = (seat) => {

        // Already booked seat
        if (seat.is_booked) {

            alert(
                seat.seat_number + " is already booked"
            );

            return;
        }

        setSelectedSeats((previousSeats) => {

            // If already selected → remove
            if (previousSeats.includes(seat.id)) {

                return previousSeats.filter(
                    (id) => id !== seat.id
                );

            }

            // Otherwise → select
            return [
                ...previousSeats,
                seat.id
            ];

        });

    };


    // Continue to Payment
    const continueBooking = () => {

        // Check seat selection
        if (selectedSeats.length === 0) {

            alert(
                "Please select at least one seat."
            );

            return;
        }

        // Get selected seat names
        const selectedSeatNames = seats
            .filter((seat) =>
                selectedSeats.includes(seat.id)
            )
            .map((seat) =>
                seat.seat_number
            );


        // Price for one seat
        const ticketPrice = 150;


        // Calculate total amount
        const amount =
            selectedSeats.length * ticketPrice;


        console.log(
            "Selected Seat IDs:",
            selectedSeats
        );

        console.log(
            "Selected Seat Names:",
            selectedSeatNames
        );

        console.log(
            "Ticket Price:",
            ticketPrice
        );

        console.log(
            "Total Amount:",
            amount
        );


        // Go to Payment page
        navigate("/payment", {

            state: {

                showId: Number(showId),

                seatIds: selectedSeats,

                seatNames: selectedSeatNames,

                amount: amount

            }

        });

    };


    return (

        <div className={styles.seatsPage}>

            <h1>Select Seats</h1>


            {/* Show ID */}

            <h2 className={styles.showId}>
                Show ID : {showId}
            </h2>


            {/* Error */}

            {error && (

                <p className={styles.error}>
                    {error}
                </p>

            )}


            {/* Screen */}

            <div className={styles.screen}>
                SCREEN
            </div>


            <h3>
                Available Seats
            </h3>


            {/* Seats */}

            <div className={styles.seatContainer}>

                {seats.map((seat) => {

                    const isSelected =
                        selectedSeats.includes(
                            seat.id
                        );


                    const isBooked =
                        seat.is_booked === true;


                    return (

                        <button
                            key={seat.id}
                            type="button"
                            onClick={() =>
                                selectSeat(seat)
                            }
                            disabled={isBooked}
                            className={`
                                ${styles.seat}
                                ${
                                    isBooked
                                        ? styles.booked
                                        : isSelected
                                            ? styles.selected
                                            : ""
                                }
                            `}
                        >

                            {seat.seat_number}

                        </button>

                    );

                })}

            </div>


            {/* Seat Legend */}

            <div className={styles.legend}>

                <div>

                    <span
                        className={`
                            ${styles.legendSeat}
                            ${styles.available}
                        `}
                    ></span>

                    Available

                </div>


                <div>

                    <span
                        className={`
                            ${styles.legendSeat}
                            ${styles.selectedLegend}
                        `}
                    ></span>

                    Selected

                </div>


                <div>

                    <span
                        className={`
                            ${styles.legendSeat}
                            ${styles.bookedLegend}
                        `}
                    ></span>

                    Booked

                </div>

            </div>


            {/* Selected Seats Information */}

            <div className={styles.selectedInfo}>

                <h3>
                    Selected Seats :{" "}
                    {selectedSeats.length}
                </h3>


                <p>

                    Selected Seat Names :{" "}

                    {seats
                        .filter((seat) =>
                            selectedSeats.includes(
                                seat.id
                            )
                        )
                        .map((seat) =>
                            seat.seat_number
                        )
                        .join(", ")
                    }

                </p>


                {/* Ticket Price */}

                <p>
                    Ticket Price : ₹150 per seat
                </p>


                {/* Total Amount */}

                <h3>
                    Total Amount : ₹
                    {selectedSeats.length * 150}
                </h3>

            </div>


            {/* Continue Button */}

            <button
                type="button"
                disabled={
                    selectedSeats.length === 0
                }
                onClick={continueBooking}
                className={styles.continueButton}
            >
                Continue to Payment
            </button>

        </div>

    );

}

export default Seats;