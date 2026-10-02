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
    const [search, setSearch] = useState("");

    const [currentSlide, setCurrentSlide] = useState(0);

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

    /* =========================
       HERO MOVIES
    ========================= */

    const heroMovies = movies
        .filter((movie) => movie.poster)
        .slice(0, 4);

    /* =========================
       AUTO SLIDER
    ========================= */

    useEffect(() => {
        if (heroMovies.length <= 1) {
            return;
        }

        const slider = setInterval(() => {
            setCurrentSlide((previous) =>
                (previous + 1) % heroMovies.length
            );
        }, 5000);

        return () => clearInterval(slider);
    }, [heroMovies.length]);

    /* =========================
       NEXT SLIDE
    ========================= */

    const nextSlide = () => {
        if (heroMovies.length === 0) return;

        setCurrentSlide(
            (previous) =>
                (previous + 1) % heroMovies.length
        );
    };

    /* =========================
       PREVIOUS SLIDE
    ========================= */

    const previousSlide = () => {
        if (heroMovies.length === 0) return;

        setCurrentSlide(
            (previous) =>
                (previous - 1 + heroMovies.length) %
                heroMovies.length
        );
    };

    /* =========================
       BOOK NOW
    ========================= */

    const handleBookNow = (movieId) => {
        navigate(`/shows/${movieId}`);
    };

    /* =========================
       SEARCH
    ========================= */

    const filteredMovies = movies.filter((movie) =>
        movie.title
            ?.toLowerCase()
            .includes(search.toLowerCase().trim())
    );

    const visibleMovies = showAll
        ? filteredMovies
        : filteredMovies.slice(0, 4);

    const currentMovie = heroMovies[currentSlide];

    return (
        <div className={styles.homePage}>

            <Navbar />


            {/* =========================
                HERO CAROUSEL
            ========================= */}

            <section className={styles.hero}>

                {currentMovie ? (

                    <>

                        {/* HERO POSTER */}

                        <img
                            src={`${API_URL}${currentMovie.poster}`}
                            alt={currentMovie.title}
                            className={styles.heroPoster}
                        />

                        {/* DARK OVERLAY */}

                        <div className={styles.heroOverlay}></div>


                        {/* HERO CONTENT */}

                        <div className={styles.heroContent}>

                            <span className={styles.heroSmall}>
                                NOW SHOWING
                            </span>

                            <h1>
                                {currentMovie.title}
                            </h1>

                            <div className={styles.heroMeta}>

                                <span>
                                    {currentMovie.genre}
                                </span>

                                <span className={styles.metaDot}>
                                    •
                                </span>

                                <span>
                                    {currentMovie.language}
                                </span>

                                <span className={styles.metaDot}>
                                    •
                                </span>

                                <span>
                                    {currentMovie.duration}
                                </span>

                            </div>

                            <p>
                                {currentMovie.description}
                            </p>

                            <div className={styles.heroButtons}>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleBookNow(
                                            currentMovie.id
                                        )
                                    }
                                >
                                    Book Tickets
                                </button>

                                <button
                                    type="button"
                                    className={
                                        styles.exploreButton
                                    }
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

                        </div>


                        {/* PREVIOUS */}

                        {heroMovies.length > 1 && (
                            <button
                                type="button"
                                className={`${styles.sliderButton} ${styles.previousButton}`}
                                onClick={previousSlide}
                                aria-label="Previous movie"
                            >
                                ‹
                            </button>
                        )}


                        {/* NEXT */}

                        {heroMovies.length > 1 && (
                            <button
                                type="button"
                                className={`${styles.sliderButton} ${styles.nextButton}`}
                                onClick={nextSlide}
                                aria-label="Next movie"
                            >
                                ›
                            </button>
                        )}


                        {/* SLIDE INDICATORS */}

                        {heroMovies.length > 1 && (

                            <div className={styles.sliderDots}>

                                {heroMovies.map(
                                    (movie, index) => (

                                        <button
                                            key={movie.id}
                                            type="button"
                                            className={
                                                index ===
                                                currentSlide
                                                    ? styles.activeDot
                                                    : styles.dot
                                            }
                                            onClick={() =>
                                                setCurrentSlide(
                                                    index
                                                )
                                            }
                                            aria-label={`Go to ${movie.title}`}
                                        />

                                    )
                                )}

                            </div>

                        )}

                    </>

                ) : (

                    /* HERO LOADING */

                    <div className={styles.heroLoading}>
                        <h1>Movie Ticket Booking</h1>

                        <p>
                            Book your favorite movies and
                            enjoy your show.
                        </p>
                    </div>

                )}

            </section>


            {/* =========================
                MOVIES
            ========================= */}

            <section
                className={styles.movieSection}
                id="movies"
            >

                {/* MOVIE HEADER */}

                <div className={styles.movieHeader}>

                    <h2>
                        New Movie Releases
                    </h2>


                    {/* SEARCH */}

                    <div className={styles.searchBox}>

                        <span className={styles.searchIcon}>
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setShowAll(false);
                            }}
                        />

                        {search && (

                            <button
                                type="button"
                                className={styles.clearButton}
                                onClick={() => {
                                    setSearch("");
                                    setShowAll(false);
                                }}
                            >
                                ×
                            </button>

                        )}

                    </div>

                </div>


                {/* LOADING */}

                {loading && (

                    <p className={styles.statusMessage}>
                        Loading movies...
                    </p>

                )}


                {/* ERROR */}

                {error && (

                    <p className={styles.errorMessage}>
                        {error}
                    </p>

                )}


                {/* NO MOVIES */}

                {!loading &&
                    !error &&
                    movies.length === 0 && (

                        <p className={styles.statusMessage}>
                            No movies available.
                        </p>

                    )}


                {/* NO SEARCH RESULTS */}

                {!loading &&
                    !error &&
                    movies.length > 0 &&
                    filteredMovies.length === 0 && (

                        <div className={styles.noResults}>

                            <div className={styles.noResultsIcon}>
                                🎬
                            </div>

                            <h3>
                                No movies found
                            </h3>

                            <p>
                                Try searching with another
                                movie name.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    setSearch("")
                                }
                            >
                                Clear Search
                            </button>

                        </div>

                    )}


                {/* MOVIE CARDS */}

                {!loading &&
                    !error &&
                    visibleMovies.length > 0 && (

                        <>

                            <div
                                className={
                                    styles.movieContainer
                                }
                            >

                                {visibleMovies.map(
                                    (movie) => (

                                        <div
                                            className={
                                                styles.movieCard
                                            }
                                            key={movie.id}
                                        >

                                            <div
                                                className={
                                                    styles.posterWrapper
                                                }
                                            >

                                                <img
                                                    src={`${API_URL}${movie.poster}`}
                                                    alt={
                                                        movie.title
                                                    }
                                                    className={
                                                        styles.moviePoster
                                                    }
                                                    onError={(
                                                        event
                                                    ) => {
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
                                                    {
                                                        movie.description
                                                    }
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

                                    )
                                )}

                            </div>


                            {/* VIEW ALL */}

                            {!search &&
                                movies.length > 4 && (

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
                                                setShowAll(
                                                    !showAll
                                                )
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


            {/* =========================
                FOOTER
            ========================= */}

            <footer className={styles.footer}>

                <div
                    className={
                        styles.footerContainer
                    }
                >

                    <div
                        className={
                            styles.footerColumn
                        }
                    >

                        <h3>
                            🎬 Movie Ticket Booking
                        </h3>

                        <p>
                            Book your favorite movies,
                            select your seats and enjoy
                            your show.
                        </p>

                    </div>


                    <div
                        className={
                            styles.footerColumn
                        }
                    >

                        <h3>
                            Quick Links
                        </h3>

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


                    <div
                        className={
                            styles.footerColumn
                        }
                    >

                        <h3>
                            Contact
                        </h3>

                        <p>
                            Email:
                            support@movieticket.com
                        </p>

                        <p>
                            Available online 24/7
                        </p>

                    </div>

                </div>


                <div
                    className={
                        styles.footerBottom
                    }
                >

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