import { useParams, useNavigate } from "react-router-dom";

function MovieDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <div className="movie-details">

      <h1>Movie Details</h1>

      <h2>Movie ID: {id}</h2>

      <p>
        Movie information will come from Django API.
      </p>

      <p>
        Genre: Action
      </p>

      <p>
        Language: Hindi
      </p>

      <p>
        Duration: 2h 30m
      </p>

      <button
        onClick={() => navigate(`/seats/${id}`)}
      >
        Select Seats
      </button>

    </div>
  );
}

export default MovieDetails;