import React, { useState, useEffect } from "react";
import MoviesList from "../../components/MoviesList";
import * as moviesAPI from "../../services/movies-api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesAPI.fetchTrendingMovies().then(({ results }) => {
      setMovies((prev) => [...prev, ...results]);
    });
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <MoviesList movies={movies} url={"movies"} />
    </>
  );
};

export default HomePage;
