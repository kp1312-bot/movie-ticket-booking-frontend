import { Link } from "react-router-dom";

function MovieCard({ movie }) {

  return (
    <div className="movie-card">

      <img
        src={movie.poster}
        alt={movie.title}
      />

      <h2>{movie.title}</h2>

      <p>Genre: {movie.genre}</p>

      <p>Language: {movie.language}</p>

      <p>Duration: {movie.duration}</p>

      <Link to={`/movie/${movie.id}`}>
        <button>
          View Details
        </button>
      </Link>

    </div>
  );
}

export default MovieCard;