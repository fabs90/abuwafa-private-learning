export default function ButtonForm({ icon, text, type, color }) {
  return (
    <button
      type={type}
      className={`btn btn-success w-1/2 md:w-64 flex items-center justify-center text-accent btn-index ${
        color ? `bg-${color}` : "bg-success"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}
