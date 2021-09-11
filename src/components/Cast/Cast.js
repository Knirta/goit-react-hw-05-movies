import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    actors && (
      <ul className={s.List}>
        {actors.map(({ id, name, profile_path, character }) => (
          <li key={id} className={s.ListItem}>
            <img
              src={`https://image.tmdb.org/t/p/original/${profile_path}`}
              width="150"
              alt={name}
            />
            <p className={s.Name}> {name}</p>
            <p>character: {character}</p>
          </li>
        ))}
      </ul>
    )
  );
};

export default Cast;
