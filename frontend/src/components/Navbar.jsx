import React, { useState, useEffect } from 'react';
import { Menu, X, Eye } from 'lucide-react';

const Navbar = ({ onViewResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Stack', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/5 bg-[#05060a]/75 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex-shrink-0">
            <span className="font-display text-2xl font-bold tracking-tight text-cyan-300 drop-shadow-[0_0_18px_rgba(0,243,255,0.35)]">
              AB.
            </span>
          </a>

          <div className="hidden md:flex md:items-center md:gap-2">
            <div className="ml-6 flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium tracking-wide text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={onViewResume}
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/35 bg-cyan-400/10 px-3 py-2 text-sm font-semibold text-cyan-200 transition-colors hover:border-cyan-300/50 hover:text-white"
            >
              <Eye size={16} />
              Resume
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onViewResume}
              className="rounded-lg border border-cyan-400/35 bg-cyan-400/10 p-2 text-cyan-200"
              aria-label="View resume"
            >
              <Eye size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg border border-white/10 p-2 text-zinc-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        aria-hidden
      />

      {isMenuOpen && (
        <div className="mt-2 border-t border-white/5 bg-[#05060a]/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-3 py-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-zinc-300 hover:bg-white/[0.04] hover:text-emerald-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
