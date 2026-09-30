import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Navbar from "../Components/Navbar";

import styles from "./Home.module.css";


function Home() {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [showAllMovies, setShowAllMovies] = useState(false);

    const navigate = useNavigate();


    // =========================
    // GET MOVIES
    // =========================

    useEffect(() => {
        getMovies();
    }, []);


    const getMovies = async () => {

        try {

            const response = await api.get("movies/");

            console.log("Movies:", response.data);

            setMovies(response.data);

        } catch (error) {

            console.log("Movie API Error:", error);

            setError("Unable to load movies");

        }

    };


    // =========================
    // SEARCH MOVIES
    // =========================

    const filteredMovies = movies.filter((movie) =>
        movie.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );


    // =========================
    // BOOK MOVIE
    // =========================

    const handleBookNow = (movieId) => {

        navigate(`/shows/${movieId}`);

    };


    // =========================
    // DISPLAY MOVIES
    // =========================

    const displayedMovies = showAllMovies
        ? filteredMovies
        : filteredMovies.slice(0, 4);


    return (

        <div className={styles.home}>

            {/* =========================
                NAVBAR
            ========================= */}

            <Navbar />


            {/* =========================
                HERO SECTION
            ========================= */}

            <section className={styles.hero}>

                {movies.length > 0 && movies[0].poster && (

                    <img
                        className={styles.heroPoster}
                        src={`http://127.0.0.1:8000${movies[0].poster}`}
                        alt={movies[0].title}
                    />

                )}

                <div className={styles.heroOverlay}></div>


                <div className={styles.heroContent}>

                    <p className={styles.heroSmall}>
                        NOW SHOWING
                    </p>


                    <h1>

                        {movies.length > 0
                            ? movies[0].title
                            : "Book Your Favourite Movie"}

                    </h1>


                    <p>

                        {movies.length > 0
                            ? movies[0].description
                            : "Watch the latest movies in your favourite cinema."}

                    </p>


                    {movies.length > 0 && (

                        <p className={styles.movieDetails}>

                            {movies[0].genre}
                            {" • "}
                            {movies[0].language}
                            {" • "}
                            {movies[0].duration} minutes

                        </p>

                    )}


                    <button
                        onClick={() => {

                            if (movies.length > 0) {

                                handleBookNow(movies[0].id);

                            }

                        }}
                    >

                        🎟️ Book Now

                    </button>

                </div>

            </section>


            {/* =========================
                SEARCH
            ========================= */}

            <section className={styles.searchSection}>

                <h2>
                    🔎 Search Movies
                </h2>


                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search movie..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </section>


            {/* =========================
                MOVIE SECTION
            ========================= */}

            <section className={styles.section}>

                <h2>

                    🔥 {showAllMovies
                        ? "All Movies"
                        : "New Movie Releases"}

                </h2>


                <p className={styles.subtitle}>

                    {showAllMovies
                        ? "All movies available for booking"
                        : "Latest movies available now"}

                </p>


                {error && (

                    <p className={styles.error}>
                        {error}
                    </p>

                )}


                {/* =========================
                    MOVIE CARDS
                ========================= */}

                <div className={styles.movieContainer}>

                    {displayedMovies.map((movie) => (

                        <div
                            className={styles.movieCard}
                            key={movie.id}
                        >

                            {/* POSTER */}

                            {movie.poster && (

                                <img
                                    className={styles.poster}
                                    src={`http://127.0.0.1:8000${movie.poster}`}
                                    alt={movie.title}
                                />

                            )}


                            {/* MOVIE DETAILS */}

                            <div className={styles.movieInfo}>

                                <h3>
                                    {movie.title}
                                </h3>


                                <p>
                                    {movie.genre} • {movie.language}
                                </p>


                                <p>
                                    ⏱ {movie.duration} minutes
                                </p>


                                <button
                                    className={styles.bookButton}
                                    onClick={() =>
                                        handleBookNow(movie.id)
                                    }
                                >

                                    🎟️ Book Now

                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* =========================
                    VIEW ALL BUTTON
                ========================= */}

                {filteredMovies.length > 4 && (

                    <div className={styles.viewAllContainer}>

                        <button
                            className={styles.viewAllButton}
                            onClick={() =>
                                setShowAllMovies(!showAllMovies)
                            }
                        >

                            {showAllMovies
                                ? "Show Less"
                                : "View All Movies"}

                        </button>

                    </div>

                )}


                {/* NO RESULT */}

                {search && filteredMovies.length === 0 && (

                    <p className={styles.noResult}>

                        No movies found for "{search}"

                    </p>

                )}

            </section>


            {/* =========================
                BOOK SHOWS
            ========================= */}

            <section className={styles.bookSection}>

                <h2>
                    🎟️ Book Shows
                </h2>


                <p className={styles.subtitle}>
                    Choose a movie and book your show
                </p>


                <div className={styles.showContainer}>

                    {filteredMovies.map((movie) => (

                        <div
                            className={styles.showCard}
                            key={movie.id}
                        >

                            <div>

                                <h3>
                                    {movie.title}
                                </h3>


                                <p>
                                    {movie.genre} • {movie.language}
                                </p>

                            </div>


                            <button
                                onClick={() =>
                                    handleBookNow(movie.id)
                                }
                            >

                                Book Show

                            </button>

                        </div>

                    ))}

                </div>

            </section>


            {/* =========================
                FOOTER
            ========================= */}

            <footer className={styles.footer}>

                <h3>
                    🎬 MovieBook
                </h3>


                <p>
                    Movie Ticket Booking System
                </p>


                <p>
                    © 2026 MovieBook. All Rights Reserved.
                </p>

            </footer>

        </div>

    );

}


export default Home;