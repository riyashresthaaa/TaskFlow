export default function Navbar({ onSearch }) {
  return (
    <div className="navbar">
      <strong>To DO</strong>
      <input placeholder="Search tasks…" onChange={(e) => onSearch?.(e.target.value)} />
    </div>
  );
}
