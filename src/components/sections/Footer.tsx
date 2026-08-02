export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container py-14">
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.8fr_0.8fr]">
          <div>
            <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-sm">
              <img
                src="/logo.png"
                alt="Home Climate Systems"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
              Trusted residential air conditioning specialists delivering comfortable,
              efficient and beautifully installed heating and cooling solutions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--hcs-orange-light)]">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li><a href="#services" className="transition hover:text-white">Services</a></li>
              <li><a href="#process" className="transition hover:text-white">Process</a></li>
              <li><a href="#faq" className="transition hover:text-white">FAQ</a></li>
              <li><a href="#quote" className="transition hover:text-white">Free Quote</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--hcs-orange-light)]">
              Service area
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Home Climate Systems serves residential properties across North West Leicestershire and the Midlands.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Home Climate Systems. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#quote" className="font-medium text-white transition hover:text-[var(--hcs-orange-light)]">
              Free Quote
            </a>
            <span className="text-white/25">|</span>
            <a href="#services" className="font-medium text-white transition hover:text-[var(--hcs-orange-light)]">
              View Services
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
