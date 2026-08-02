export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-6 px-4">
        <a
          href="#"
          className="relative z-10 flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100 transition-transform hover:scale-[1.02]"
        >
          <img
            src="/logo.png"
            alt="Home Climate Systems"
            className="h-14 w-auto max-w-[220px] object-contain md:h-16"
          />
        </a>

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
            className="rounded-lg bg-[var(--hcs-blue)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Free Quote
          </a>
        </nav>
      </div>
    </header>
  );
}