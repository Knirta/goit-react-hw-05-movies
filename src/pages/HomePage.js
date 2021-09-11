import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as moviesAPI from "../services/movies-api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesAPI.fetchTrendingMovies().then(({ results }) => {
      setMovies((prev) => [...prev, ...results]);
    });
  }, []);

  return (
    <>
      <h1>Trending movies</h1>

      <ul>
        {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`}>
                {movie.original_title ?? "no name"}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
