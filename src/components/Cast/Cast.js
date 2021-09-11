import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import * as moviesAPI from "../../services/movies-api";
import s from "./Cast.module.css";

const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieActors(movieId).then(({ cast }) => {
      setActors(cast);
    });
  }, [movieId]);

  return (
    <ul>
      {actors &&
        actors.map(({ id, name, profile_path, character }) => (
          <li key={id}>
            <p>{name}</p>
            <img
              src={`https://image.tmdb.org/t/p/original/${profile_path}`}
              width="100"
              alt={name}
            />
            <p>character: {character}</p>
          </li>
        ))}
    </ul>
  );
};

export default Cast;
