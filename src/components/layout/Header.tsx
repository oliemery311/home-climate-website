"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition-all duration-300">
      <div 
        className={`container flex items-center justify-between px-4 transition-all duration-300 ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        <a href="#">
          <img
            src="/logo.png"
            alt="Home Climate Systems"
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-10" : "h-16"
            }`}
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