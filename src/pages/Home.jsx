import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import styles from "./Home.module.css";

const API_URL = "https://movie-ticket-booking-ywrj.onrender.com";

function Home() {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    `${API_URL}/api/movies/`
                );

                console.log("Movies:", response.data);

                setMovies(response.data);
            } catch (err) {
                console.log("Movie API Error:", err);
                setError("Unable to load movies.");
            } finally {
                setLoading(false);
            }
        };

        getMovies();
    }, []);

    const handleBookNow = (movieId) => {
        navigate(`/shows/${movieId}`);
    };

    return (
        <div className={styles.homePage}>
            <Navbar />

            <section className={styles.hero}>
                <h1>Movie Ticket Booking</h1>
                <p>Book your favorite movie tickets online</p>
            </section>

            <section className={styles.movieSection}>
                <h2>New Movie Releases</h2>

                {loading && <p>Loading movies...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && (
                    <div className={styles.movieContainer}>
                        {movies.map((movie) => (
                            <div
                                className={styles.movieCard}
                                key={movie.id}
                            >
                                <img
                                    src={`${API_URL}${movie.poster}`}
                                    alt={movie.title}
                                    className={styles.moviePoster}
                                    onError={(event) => {
                                        console.log(
                                            "Image Error:",
                                            `${API_URL}${movie.poster}`
                                        );
                                        event.currentTarget.style.display = "none";
                                    }}
                                />

                                <div className={styles.movieInfo}>
                                    <h3>{movie.title}</h3>

                                    <p>
                                        {movie.genre} | {movie.language}
                                    </p>

                                    <p>{movie.description}</p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleBookNow(movie.id)
                                        }
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Home;
