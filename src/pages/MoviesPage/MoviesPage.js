import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import * as moviesAPI from "../../services/movies-api";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const { url } = useRouteMatch();

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input);
    setInput("");
    setMovies([]);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    moviesAPI.searchMovieByQuery(query).then(({ results }) => {
      setMovies((prev) => [...prev, ...results]);
    });
  }, [query]);

  return (
    <>
      <form onSubmit={handleSubmit} className={s.Form}>
        <input
          type="text"
          name="title"
          placeholder="Search movie"
          onChange={handleChange}
          value={input}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies &&
          movies.map(({ id, original_title }) => (
            <li key={id} className={s.ListItem}>
              <Link to={`${url}/${id}`} className={s.Link}>
                {original_title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MoviesPage;
