
import { useState, useEffect, useMemo, useCallback } from "react";

const MOVIE_API = "/api/movies";

function useMovies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(MOVIE_API);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      const formattedMovies = data.map((movie) => ({
        id: movie.id,
        title: movie.title || movie.name || "Untitled",
        description: movie.description || "No description available",
        genre: Array.isArray(movie.genre)
          ? movie.genre
          : [movie.genre || "Other"],
        language: movie.language || "Unknown",
        rating: movie.rating || 0,
        duration: movie.duration || "Unknown",
        image: movie.image || "",
      }));

      setMovies(formattedMovies);
    } catch (err) {
      console.error("Movie API Error:", err);
      setError(err.message || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesGenre =
        genre === "All" || movie.genre.includes(genre);

      return matchesSearch && matchesGenre;
    });
  }, [movies, search, genre]);

  const findMovie = useCallback(
    (id) => movies.find((movie) => String(movie.id) === String(id)),
    [movies]
  );

  const genres = useMemo(() => {
    const allGenres = movies.flatMap((movie) => movie.genre);

    return ["All", ...new Set(allGenres)].sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      return a.localeCompare(b);
    });
  }, [movies]);

  return {
    movies,
    search,
    setSearch,
    genre,
    setGenre,
    genres,
    filteredMovies,
    findMovie,
    loading,
    error,
    fetchMovies,
  };
}

export default useMovies;
