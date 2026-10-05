import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Book Your Movie Tickets Easily</h1>

        <p>
          Explore latest movies, choose your theatre, select your seats and
          enjoy your favourite movie.
        </p>

        <button onClick={() => navigate("/movies")}>
          Explore Movies
        </button>
      </div>
    </section>
  );
}

export default HomePage;