export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">

        <img
          src="/logo.png"
          alt="Home Climate Systems"
          className="h-14 w-auto"
        />

        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#services"
            className="text-sm font-medium text-slate-700 hover:text-[var(--hcs-blue)]"
          >
            Services
          </a>

          <a
            href="#process"
            className="text-sm font-medium text-slate-700 hover:text-[var(--hcs-blue)]"
          >
            Process
          </a>

          <a
            href="#faq"
            className="text-sm font-medium text-slate-700 hover:text-[var(--hcs-blue)]"
          >
            FAQ
          </a>

          <a
            href="#quote"
            className="
            rounded-lg
            bg-[var(--hcs-blue)]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            hover:opacity-90
            "
          >
            Free Quote
          </a>

        </nav>

      </div>
    </header>
  );
}