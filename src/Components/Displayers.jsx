import ToggleButton from "./ToggleButton.jsx";
import { useState } from "react";

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorDisplayer({ error }) {
  return <p className="error">{error}</p>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

// BOX
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton onSetIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen && children}
    </div>
  );
}

export { Main, Box, Loader, ErrorDisplayer };
