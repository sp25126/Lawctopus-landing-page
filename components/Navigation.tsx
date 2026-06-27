"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { id: "section-overview",     label: "Overview"   },
  { id: "section-skills",       label: "Skills"     },
  { id: "section-curriculum",   label: "Curriculum" },
  { id: "section-testimonials", label: "Alumni"     },
  { id: "section-pricing",      label: "Pricing"    },
  { id: "section-faq",          label: "FAQ"        },
];

export default function Navigation() {
  const [scrolled,       setScrolled]       = useState(false);
  const [pastHero,       setPastHero]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("section-hero");
  const [menuOpen,       setMenuOpen]       = useState(false);

  // ── Scroll state ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setPastHero(y > (window.innerHeight * 0.8));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section tracker (IntersectionObserver) ─────────────────────────
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Smooth scroll helper ──────────────────────────────────────────────────
  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    // Try Lenis first; fall back to native smooth scroll
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-legal-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between gap-6">

          {/* ── Logo ───────────────────────────────────────────────────── */}
          <button
            onClick={() => scrollTo("section-hero")}
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="Back to top"
          >
            {/* Image Logo */}
            <motion.div
              animate={{ height: scrolled ? 36 : 44 }}
              transition={{ duration: 0.35 }}
              className="relative flex-shrink-0 flex items-center"
            >
              <img 
                src="/logo.png" 
                alt="Lawctopus" 
                className="h-full w-auto object-contain"
              />
            </motion.div>
          </button>

          {/* ── Desktop Nav Links ──────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-300 rounded-md ${
                  scrolled ? "text-legal-700 hover:text-legal-900" : "text-white/80 hover:text-white"
                } ${activeSection === link.id ? (scrolled ? "!text-legal-700" : "!text-white") : ""}`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-legal-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── CTA Button ────────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("section-enroll")}
              className={`relative hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg transition-all duration-500 ${
                pastHero
                  ? "bg-red-600 text-white shadow-red-500/30"
                  : "bg-legal-500 text-legal-900 shadow-legal-500/40"
              }`}
            >
              {/* pulsing ring when past hero */}
              {pastHero && (
                <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
              )}
              <span className="relative z-10">
                {pastHero ? "⚡ 12 Seats Left" : "Enroll Now →"}
              </span>
            </motion.button>

            {/* ── Mobile Hamburger ──────────────────────────────────── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-md transition-colors ${
                scrolled ? "text-legal-900 hover:bg-legal-50" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.path
                      key="close"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      strokeLinecap="round"
                      d="M6 6l12 12M6 18L18 6"
                    />
                  ) : (
                    <motion.g key="burger">
                      <line x1="3" y1="7"  x2="21" y2="7"  strokeLinecap="round" />
                      <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                      <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Full-Screen Overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-legal-900/97 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Close hint */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Logo repeat */}
            <div className="flex items-center justify-center mb-4 h-12">
              <img src="/logo.png" alt="Lawctopus" className="h-full w-auto object-contain brightness-0 invert" />
            </div>

            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                onClick={() => scrollTo(link.id)}
                className={`font-serif text-3xl font-bold transition-colors duration-200 ${
                  activeSection === link.id
                    ? "text-legal-500"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 + 0.15 }}
              onClick={() => scrollTo("section-enroll")}
              className="mt-4 bg-legal-500 text-legal-900 font-bold font-serif text-lg px-10 py-4 rounded-full shadow-lg shadow-legal-500/30"
            >
              Enroll Now →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
