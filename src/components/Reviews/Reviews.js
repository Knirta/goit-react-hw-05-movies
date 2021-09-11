import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as moviesAPI from "../../services/movies-api";
import s from "./Reviews.module.css";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI
      .fetchMovieReviews(movieId)
      .then(({ results }) => setReviews(results));
  }, [movieId]);

  return reviews.length ? (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={s.ListItem}>
          <p className={s.Author}>Author: {author}</p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>We don't have any reviews on this movie</p>
  );
};

export default Reviews;
