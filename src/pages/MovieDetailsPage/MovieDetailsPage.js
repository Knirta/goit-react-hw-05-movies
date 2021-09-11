import React, { useState, useEffect } from "react";
import { useParams, NavLink, useRouteMatch, Route } from "react-router-dom";
import Cast from "../../components/Cast";
import Reviews from "../../components/Reviews";
import * as moviesAPI from "../../services/movies-api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <div className={s.Wrapper}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            width="300"
          />
          <div className={s.Details}>
            <h1 className={s.Title}>{movie.title}</h1>
            <p>Popularity: {movie.popularity}</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h2>Genres</h2>
            <p>
              {movie.genres.map((genre) => (
                <span>{genre.name} </span>
              ))}
            </p>
          </div>
        </div>
      )}

      <h2>Additional information</h2>
      <ul>
        <li>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/reviews`}>Reviews</NavLink>
        </li>
      </ul>

      <Route path={`${path}/cast`}>
        <Cast />
      </Route>
      <Route path={`${path}/reviews`}>
        <Reviews />
      </Route>
    </>
  );
};

export default MovieDetailsPage;