import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as moviesAPI from "../../services/movies-api";
import s from "./HomePage.module.css";

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

      <ul>
        {movies &&
          movies.map((movie) => (
            <li key={movie.id} className={s.ListItem}>
              <Link to={`movies/${movie.id}`} className={s.Link}>
                {movie.original_title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
