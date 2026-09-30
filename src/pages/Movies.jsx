import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Movies() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("movies/")
            .then((response) => {
                setMovies(response.data);
            })
            .catch((error) => {
                console.log("Movie API Error:", error);
            });
    }, []);

    return (
        <div>
            <h1>Movies</h1>

            {movies.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>

                    <p>{movie.description}</p>
                    <p>Genre: {movie.genre}</p>
                    <p>Language: {movie.language}</p>
                    <p>Duration: {movie.duration} minutes</p>

                    <button onClick={() => navigate(`/shows/${movie.id}`)}>
                        View Shows
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Movies;