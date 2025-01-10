function MovieList({ movies, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectedId={onSelectedId} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedId }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export { MovieList };
