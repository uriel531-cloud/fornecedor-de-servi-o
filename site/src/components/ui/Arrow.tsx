export function Arrow({ className = "", dir = "right" }: { className?: string; dir?: "right" | "up-right" | "down" | "left" }) {
  const rot = { right: 0, "up-right": -45, down: 90, left: 180 }[dir];
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`btn-arrow ${className}`}
      style={{ rotate: `${rot}deg` }}
    >
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  );
}
