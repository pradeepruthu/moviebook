import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import MovieDetail from "../../experiment1/components/MovieDetail";

import { useMoviesContext } from "../../experiment2/MoviesContext";
import { useBookingContext } from "../../experiment2/BookingContext";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { findMovie } = useMoviesContext();
  const { selectMovie } = useBookingContext();

  const movie = findMovie(id);

  if (!movie) {
    return (
      <section className="page-section">
        <h2>Movie not found</h2>
      </section>
    );
  }

  function handleBook() {
    selectMovie(movie);
    navigate("/booking/theatre");
  }

  return (
    <section className="page-section">
      <MovieDetail movie={movie} onBook={handleBook} />
    </section>
  );
}

export default MovieDetailsPage;