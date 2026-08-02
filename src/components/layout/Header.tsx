export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      {/* Reduced height from h-20 to h-16, added px-4 */}
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* Floating Logo Badge Container */}
        <a 
          href="#" 
          className="relative z-10 -mb-6 flex items-center rounded-b-xl border border-t-0 border-slate-200 bg-white px-4 py-3 shadow-md transition-transform hover:scale-[1.02]"
        >
          <img
            src="/logo.png"
            alt="Home Climate Systems"
            className="h-12 w-auto object-contain"
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
            className="rounded-lg bg-[var(--hcs-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Free Quote
          </a>
        </nav>
      </div>
    </header>
  );
}