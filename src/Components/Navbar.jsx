import { useKey } from "../Custom Hooks/useKey";
import { useRef } from "react";

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, onSetQuery }) {
  const inputElement = useRef(null);

  useKey("Enter", () => {
    inputElement.current.focus();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

function NumResults({ length }) {
  return (
    <p className="num-results">
      Found <strong>{length}</strong> results
    </p>
  );
}

export { Navbar, Search, NumResults };
