import { Loader, ErrorDisplayer } from "./Displayers";
import { useKey } from "../Custom Hooks/useKey";
import StarRating from "./StarRating";
import { useState, useEffect, useRef } from "react";
// import KEY from "../KEY.js";

export default function MovieDetails({
  selectedId,
  onHandleCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);
  useEffect(
    function () {
      if (userRating) countRef.current += 1;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    year,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddStars(rating) {
    setUserRating(rating);
  }

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onHandleCloseMovie();
  }

  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=e5084c71&i=${selectedId}`
          );
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovie(data);
        } catch (err) {
          console.error("error loading movie" + err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovie();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "🍿 usePopcorn";
      };
    },
    [movie]
  );

  useKey("Escape", onHandleCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorDisplayer error={error} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onHandleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of the ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={handleAddStars}
                    defaultRating={Number(userRating)}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>Youve rated this movie {watchedUserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
