import { useState, useEffect, useMemo, useCallback } from "react";

const movieData = [

 {

   id: 1,

  title: "Leo",

   genre: "Action",

   language: "Tamil",

   rating: 4.5,
   duration: "2h 44m",

 },

 {

    id: 2,

    title: "Vikram",

    genre: "Thriller",

    language: "Tamil",

    rating: 4.8,

    duration: "2h 55m",

  },

  {

    id: 3,

    title: "Interstellar",

    genre: "Sci-Fi",

 language: "English",

rating: 4.7,

duration: "2h 49m",

 },

{

    id: 4,

    title: "Jailer",

    genre: "Action",

    language: "Tamil",

    rating: 4.3,

    duration: "2h 48m",

  },

];

function useMovies() {

  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    setMovies(movieData);

  }, []);

  const filteredMovies = useMemo(() => {

    return movies.filter((movie) =>

      movie.title.toLowerCase().includes(search.toLowerCase())

    );

  }, [movies, search]);

  const findMovie = useCallback(

    (id) => {

      return movies.find((movie) => movie.id === Number(id));

    },

    [movies]

  );

  return {

    movies,

    search,

    setSearch,

    filteredMovies,

    findMovie,

  };

}

export default useMovies;