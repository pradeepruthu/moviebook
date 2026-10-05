import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <div className="movie-card">
      <div className="movie-content">
        <h3>{movie.title}</h3>
        <p>Genre: {movie.genre}</p>
        <p>Language: {movie.language}</p>
        <p> {movie.rating}</p>
        <button onClick={() => navigate(`/movie/${movie.id}`)}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default MovieCard;