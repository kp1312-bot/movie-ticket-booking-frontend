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
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    `${API_URL}/api/movies/`
                );

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

    const visibleMovies = showAll
        ? movies
        : movies.slice(0, 4);

    return (
        <div className={styles.homePage}>

            <Navbar />

            {/* ================= HERO ================= */}

            <section className={styles.hero}>

                <img
                    src={`${API_URL}/Media/photo/KGF_Rg67MKX.jpg`}
                    alt="Movie Ticket Booking"
                    className={styles.heroPoster}
                />

                <div className={styles.heroOverlay}></div>

                <div className={styles.heroContent}>

                    <span className={styles.heroSmall}>
                        WELCOME TO
                    </span>

                    <h1>Movie Ticket Booking</h1>

                    <p>
                        Book your favorite movies and enjoy
                        your show with an easy and simple
                        online booking experience.
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            document
                                .getElementById("movies")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                });
                        }}
                    >
                        Explore Movies
                    </button>

                </div>

            </section>


            {/* ================= MOVIES ================= */}

            <section
                className={styles.movieSection}
                id="movies"
            >

                <h2>New Movie Releases</h2>

                {loading && (
                    <p className={styles.statusMessage}>
                        Loading movies...
                    </p>
                )}

                {error && (
                    <p className={styles.errorMessage}>
                        {error}
                    </p>
                )}

                {!loading &&
                    !error &&
                    movies.length === 0 && (
                        <p className={styles.statusMessage}>
                            No movies available.
                        </p>
                    )}

                {!loading &&
                    !error &&
                    movies.length > 0 && (

                        <>
                            <div className={styles.movieContainer}>

                                {visibleMovies.map((movie) => (

                                    <div
                                        className={styles.movieCard}
                                        key={movie.id}
                                    >

                                        <div
                                            className={
                                                styles.posterWrapper
                                            }
                                        >

                                            <img
                                                src={`${API_URL}${movie.poster}`}
                                                alt={movie.title}
                                                className={
                                                    styles.moviePoster
                                                }

                                                onError={(event) => {
                                                    event.currentTarget.style.display =
                                                        "none";
                                                }}
                                            />

                                        </div>


                                        <div
                                            className={
                                                styles.movieInfo
                                            }
                                        >

                                            <h3>
                                                {movie.title}
                                            </h3>

                                            <p
                                                className={
                                                    styles.movieMeta
                                                }
                                            >
                                                {movie.genre} |{" "}
                                                {movie.language}
                                            </p>

                                            <p
                                                className={
                                                    styles.description
                                                }
                                            >
                                                {movie.description}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleBookNow(
                                                        movie.id
                                                    )
                                                }
                                            >
                                                Book Now
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>


                            {/* ================= VIEW ALL ================= */}

                            {movies.length > 4 && (

                                <div
                                    className={
                                        styles.viewAllContainer
                                    }
                                >

                                    <button
                                        type="button"
                                        className={
                                            styles.viewAllButton
                                        }
                                        onClick={() =>
                                            setShowAll(!showAll)
                                        }
                                    >
                                        {showAll
                                            ? "Show Less"
                                            : "View All Movies"}
                                    </button>

                                </div>

                            )}

                        </>

                    )}

            </section>


            {/* ================= FOOTER ================= */}

            <footer className={styles.footer}>

                <div className={styles.footerContainer}>

                    <div className={styles.footerColumn}>

                        <h3>
                            🎬 Movie Ticket Booking
                        </h3>

                        <p>
                            Book your favorite movies,
                            select your seats and enjoy
                            your show.
                        </p>

                    </div>


                    <div className={styles.footerColumn}>

                        <h3>Quick Links</h3>

                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("movies")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                            }
                        >
                            Movies
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/my-bookings")
                            }
                        >
                            My Bookings
                        </button>

                    </div>


                    <div className={styles.footerColumn}>

                        <h3>Contact</h3>

                        <p>
                            Email: support@movieticket.com
                        </p>

                        <p>
                            Available online 24/7
                        </p>

                    </div>

                </div>


                <div className={styles.footerBottom}>

                    <p>
                        © 2026 Movie Ticket Booking.
                        All Rights Reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;