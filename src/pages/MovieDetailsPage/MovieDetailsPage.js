import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import Loader from "react-loader-spinner";
import * as moviesAPI from "../../services/movies-api";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() =>
  import("../../components/Cast" /* webpackChunkName: 'cast' */)
);

const Reviews = lazy(() =>
  import("../../components/Reviews" /* webpackChunkName: 'reviews' */)
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  return (
    <>
      <button type="button" className={s.Btn} onClick={onGoBack}>
        Go back &#8592;
      </button>
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
              {movie.genres.map(({ id, name }) => (
                <span key={id}>{name} </span>
              ))}
            </p>
          </div>
        </div>
      )}

      <h2>Additional information</h2>
      <ul>
        <li>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location.state.from },
            }}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location.state.from },
            }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense
        fallback={
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        }
      >
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
