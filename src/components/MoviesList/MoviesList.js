import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import s from "./MoviesList.module.css";

const MoviesList = ({ movies, url }) => {
  return (
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
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
};

export default MoviesList;
