export default function Button({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <button
      className="
      rounded-lg
      bg-blue-600
      px-6
      py-3
      font-semibold
      text-white
      transition
      hover:bg-blue-700
      "
    >
      {children}
    </button>
  );
}