import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetail from "../../experiment1/components/MovieDetail";
import { useBookingContext } from "../../experiment2/BookingContext";

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectMovie } = useBookingContext();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError("");

        console.log(`Fetching movie details for ID: ${id}`);

        const response = await fetch(
          `https://api.tvmaze.com/shows/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();

        console.log("Individual Movie API Data:", data);

        const formattedMovie = {
          id: data.id,
          title: data.name,
          description: data.summary
            ? data.summary.replace(/<[^>]+>/g, "")
            : "No description available",
          genre: data.genres?.[0] || "Other",
          language: data.language || "Unknown",
          rating: data.rating?.average || 0,
          duration: data.runtime
            ? `${data.runtime} min`
            : "Unknown",
          image: data.image?.medium || "",
        };

        setMovie(formattedMovie);
      } catch (err) {
        console.error("Movie Details API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  function handleBook() {
    selectMovie(movie);
    navigate("/booking/theatre");
  }

  if (loading) {
    return (
      <section className="page-section">
        <h2>Loading movie details...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section">
        <h2>Error: {error}</h2>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="page-section">
        <h2>Movie not found</h2>
      </section>
    );
  }

  return (
    <section className="page-section">
      <MovieDetail
        movie={movie}
        onBook={handleBook}
      />
    </section>
  );
}

export default MovieDetailsPage;