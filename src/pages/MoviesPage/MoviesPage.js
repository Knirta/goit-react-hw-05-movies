import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import MoviesList from "../../components/MoviesList";
import * as moviesAPI from "../../services/movies-api";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const { url } = useRouteMatch();

  const location = useLocation();
  const history = useHistory();

  const queryParam = new URLSearchParams(location.search).get("query") ?? "";

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      history.push({ ...location, search: `query=${input}` });
    } else {
      history.push({ ...location, search: null });
    }
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

  useEffect(() => {
    if (queryParam === "") {
      return;
    }
    setQuery(queryParam);
  }, [queryParam]);

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
      <MoviesList movies={movies} url={url} location={location} />
    </>
  );
};

export default MoviesPage;
