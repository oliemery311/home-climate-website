export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">

        <a
          href="/"
          className="text-xl font-bold text-slate-900"
        >
          Home Climate Solutions
        </a>

        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#services"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Services
          </a>

          <a
            href="#process"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Process
          </a>

          <a
            href="#faq"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            FAQ
          </a>

          <a
            href="#quote"
            className="
            rounded-lg
            bg-blue-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            hover:bg-blue-700
            "
          >
            Free Quote
          </a>

        </nav>

      </div>
    </header>
  );
}