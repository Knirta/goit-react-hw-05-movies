import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import AppBar from "./components/AppBar";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomePage = lazy(() =>
  import("./pages/HomePage" /* webpackChunkName: 'home-page' */)
);
const MoviesPage = lazy(() =>
  import("./pages/MoviesPage" /* webpackChunkName: 'movies-page' */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./pages/MovieDetailsPage" /* webpackChunkName: 'movie-details-page' */
  )
);
const NotFoundView = lazy(() =>
  import("./pages/NotFoundView.js" /* webpackChunkName: 'not-found' */)
);

function App() {
  return (
    <Container>
      <AppBar />

      <Suspense
        fallback={
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
