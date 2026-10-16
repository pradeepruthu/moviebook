import React from "react";
import SearchBar from "../../experiment1/components/SearchBar";
import MovieList from "../../experiment1/components/MovieList";
import { useMoviesContext } from "../../experiment2/MoviesContext";

function MoviesPage() {
  const {
    search,
    setSearch,
    genre,
    setGenre,
    genres,
    filteredMovies,
    loading,
    error,
  } = useMoviesContext();

  if (loading) {
    return <h2>Loading movies...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <section className="page-section">
      <h2>Available Movies</h2>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        {genres.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <MovieList movies={filteredMovies} />
    </section>
  );
}

export default MoviesPage;