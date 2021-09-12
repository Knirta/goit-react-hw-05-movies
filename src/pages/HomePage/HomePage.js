import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesList from "../../components/MoviesList";
import * as moviesAPI from "../../services/movies-api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    moviesAPI.fetchTrendingMovies().then(({ results }) => {
      setMovies((prev) => [...prev, ...results]);
    });
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <MoviesList movies={movies} url={"movies"} location={location} />
    </>
  );
};

export default HomePage;
