export default function Button({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <button
      className="
      rounded-lg
      bg-[var(--hcs-blue)]
      px-6
      py-3
      font-semibold
      text-white
      transition
      hover:opacity-90
      "
    >
      {children}
    </button>
  );
}