/* eslint-disable react/prop-types */
import { Navbar, Search, NumResults } from "./Components/Navbar";
import { Main, Box, Loader, ErrorDisplayer } from "./Components/Displayers";
import { MovieList } from "./Components/DisplayMovies";
import MovieDetails from "./Components/MovieDetails";
import WatchedMovieSummery from "./Components/WatchedMovieSummary";
import WatchedMovieList from "./Components/WatchedMoviesList";
import { useEffect, useState } from "react";
import { useMovies } from "./Custom Hooks/useMovies";
import { useLocalStorageState } from "./Custom Hooks/useLocalStorageState";

// const KEY = "ea5cad69";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState(function () {
  //   const storedMovies = localStorage.getItem("watched");
  //   return storedMovies ? JSON.parse(storedMovies) : [];
  // });
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(newMovie) {
    setWatched((watched) => [...watched, newMovie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <Navbar>
        <Search query={query} onSetQuery={setQuery} />
        <NumResults length={movies?.length} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && movies && (
            <MovieList movies={movies} onSelectedId={handleSelectedId} />
          )}
          {error && <ErrorDisplayer error={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onHandleCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMovieSummery watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
        {/* <WatchedBox /> */}
      </Main>
    </>
  );
}
