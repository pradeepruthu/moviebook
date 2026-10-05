import React from "react";
import SearchBar from "../../experiment1/components/SearchBar";
import MovieList from "../../experiment1/components/MovieList";
import { useMoviesContext } from "../../experiment2/MoviesContext";
function MoviesPage() {
  const { search, setSearch, filteredMovies } = useMoviesContext();
  return (
    <section className="page-section">
      <h2>Available Movies</h2>

      <SearchBar search={search} setSearch={setSearch} />

      <MovieList movies={filteredMovies} />
    </section>
  );
}
export default MoviesPage;