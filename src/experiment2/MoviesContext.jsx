import React, { createContext, useContext } from "react";
import useMovies from "./useMovies";

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const movieData = useMovies();

  return (
    <MoviesContext.Provider value={movieData}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMoviesContext() {
  return useContext(MoviesContext);
}