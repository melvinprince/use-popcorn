export default function ToggleButton({ onSetIsOpen, isOpen }) {
  return (
    <button className="btn-toggle" onClick={() => onSetIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
