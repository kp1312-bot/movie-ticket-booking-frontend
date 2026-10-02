import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Shows.module.css";

function Shows() {

    const { movieId } = useParams();
    const navigate = useNavigate();

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const getShows = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    "https://movie-ticket-booking-ywrj.onrender.com/api/shows/"
                );

                console.log("All Shows:", response.data);
                console.log("Movie ID:", movieId);

                const movieShows = response.data.filter(
                    (show) =>
                        Number(show.movie) === Number(movieId)
                );

                console.log("Movie Shows:", movieShows);

                setShows(movieShows);

            } catch (error) {

                console.log("Shows API Error:", error);
                setError("Unable to load shows.");

            } finally {

                setLoading(false);

            }
        };

        getShows();

    }, [movieId]);


    const handleSelectShow = (showId) => {

        console.log("Selected Show ID:", showId);

        navigate(`/seats/${showId}`);
    };


    return (
        <div className={styles.showsPage}>

            <div className={styles.header}>

                <h1>🎬 Movie Shows</h1>

                <p>
                    Select your preferred date and show time
                </p>

                <div className={styles.movieId}>
                    Movie ID : {movieId}
                </div>

            </div>


            <div className={styles.content}>

                <h2>Select Show Time</h2>


                {loading && (
                    <div className={styles.message}>
                        <p>Loading shows...</p>
                    </div>
                )}


                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}


                {!loading &&
                    !error &&
                    shows.length === 0 && (
                        <div className={styles.noShows}>

                            <div className={styles.noShowsIcon}>
                                🎭
                            </div>

                            <h3>
                                No Shows Available
                            </h3>

                            <p>
                                There are no shows available
                                for this movie.
                            </p>

                        </div>
                    )
                }


                <div className={styles.showContainer}>

                    {shows.map((show) => (

                        <div
                            className={styles.showCard}
                            key={show.id}
                        >

                            <div className={styles.showInfo}>

                                <div className={styles.dateBox}>

                                    <span>
                                        DATE
                                    </span>

                                    <strong>
                                        {show.show_date}
                                    </strong>

                                </div>


                                <div className={styles.details}>

                                    <p>
                                        <span>
                                            🕐 Time
                                        </span>

                                        {show.show_time}
                                    </p>

                                    <p>
                                        <span>
                                            🎦 Screen
                                        </span>

                                        {show.screen}
                                    </p>

                                </div>

                            </div>


                            <button
                                className={styles.selectButton}
                                onClick={() =>
                                    handleSelectShow(show.id)
                                }
                            >
                                Select Show
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Shows;

