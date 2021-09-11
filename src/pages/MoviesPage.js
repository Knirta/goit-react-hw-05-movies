import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import * as moviesAPI from "../services/movies-api";

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Search movie"
          onChange={handleChange}
          value={input}
        />
        <button type="submit">Search</button>
      </form>
      <h1>results</h1>
      <ul>
        {movies &&
          movies.map(({ id, original_title }) => (
            <li key={id}>
              <Link to={`${url}/${id}`}>{original_title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MoviesPage;
