import React from "react";

function MovieDetail({ movie, onBook }) {
  return (
    <div className="detail-card">
        <h2>{movie.title}</h2>

        <p>{movie.description}</p>
        <p>
          <b>Genre:</b> {movie.genre}
        </p>
        <p>
          <b>Language:</b> {movie.language}
        </p>
        <p>
          <b>Duration:</b> {movie.duration}
        </p>
        <p>
          <b>Rating:</b>  {movie.rating}
        </p>

        <button onClick={onBook}>Book Now</button>

    </div>
  );
}

export default MovieDetail;