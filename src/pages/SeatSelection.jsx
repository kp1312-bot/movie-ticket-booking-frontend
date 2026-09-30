import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function SeatSelection() {
    const { showId } = useParams();

    const [seats, setSeats] = useState([]);

    useEffect(() => {
        api.get(`seats/${showId}/`)
            .then((response) => {
                setSeats(response.data);
            })
            .catch((error) => {
                console.log("Seat API Error:", error);
            });
    }, [showId]);

    return (
        <div>
            <h1>Select Your Seat</h1>

            {seats.length === 0 ? (
                <p>No seats available.</p>
            ) : (
                seats.map((seat) => (
                    <button
                        key={seat.id}
                        disabled={seat.is_booked}
                        style={{
                            margin: "5px",
                            padding: "10px",
                        }}
                    >
                        {seat.seat_number}
                        {seat.is_booked ? " Booked" : ""}
                    </button>
                ))
            )}
        </div>
    );
}

export default SeatSelection;