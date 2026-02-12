export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}
