"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-lg shadow-premium border-b border-gold-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-18 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#inicio")}
          className="flex items-center gap-3 group"
          aria-label="Concierge Brasil - Ir ao topo"
        >
          <div className="relative w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
              <circle cx="20" cy="20" r="19" fill="white" stroke="#F5A800" strokeWidth="1.5"/>
              <path
                d="M20 8a12 12 0 100 24A12 12 0 0020 8zm0 2a10 10 0 110 20A10 10 0 0120 10z"
                fill="#F5A800"
                opacity="0.2"
              />
              <path
                d="M20 6c-1.1 0-2 .9-2 2v1.1A8.9 8.9 0 0012.1 11L11 10.3c-.95-.55-2.17-.22-2.72.73l-2 3.46c-.55.95-.22 2.17.73 2.72l1.1.64A9 9 0 008 20c0 .7.08 1.38.2 2.04l-1.1.64c-.95.55-1.28 1.77-.73 2.72l2 3.46c.55.95 1.77 1.28 2.72.73l1.1-.64A8.9 8.9 0 0018 30.9V32c0 1.1.9 2 2 2s2-.9 2-2v-1.1a8.9 8.9 0 005.9-2.9l1.1.64c.95.55 2.17.22 2.72-.73l2-3.46c.55-.95.22-2.17-.73-2.72l-1.1-.64c.12-.66.2-1.34.2-2.04 0-.7-.08-1.38-.2-2.04l1.1-.64c.95-.55 1.28-1.77.73-2.72l-2-3.46c-.55-.95-1.77-1.28-2.72-.73l-1.1.64A8.9 8.9 0 0022 9.1V8c0-1.1-.9-2-2-2zm0 7a7 7 0 110 14A7 7 0 0120 13z"
                fill="#F5A800"
              />
              <rect x="16" y="17" width="8" height="10" rx="1" fill="#0F1D5C"/>
              <rect x="17.5" y="13" width="5" height="4" rx="0.5" fill="#0F1D5C"/>
              <rect x="19" y="13" width="2" height="2" rx="0.5" fill="#F5A800"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-white text-xl leading-tight tracking-wide group-hover:text-gold-400 transition-colors">
              CONCIERGE BRASIL
            </span>
            <span className="text-gold-500 text-[9px] tracking-[0.25em] uppercase font-body font-semibold leading-none">
              Facilities Services
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 relative group ${
                  activeSection === link.href.replace("#", "")
                    ? "text-gold-500"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gold-500 rounded-full transition-all duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "w-4/5"
                      : "w-0 group-hover:w-4/5"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); handleNav("#contato"); }}
            className="hidden sm:flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-gold hover:scale-105 active:scale-95"
          >
            <Phone size={15} />
            Solicitar Orçamento
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-navy-900/98 backdrop-blur-lg border-t border-gold-500/10"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left text-white/90 hover:text-gold-500 px-4 py-3 rounded-lg hover:bg-white/5 transition-all font-semibold"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-2"
              >
                <button
                  onClick={() => handleNav("#contato")}
                  className="w-full bg-gold-500 text-navy-900 font-bold py-3 rounded-lg hover:bg-gold-400 transition-all"
                >
                  Solicitar Orçamento
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
