"use client";

const FOOTER_LINKS = {
  Course: [
    { label: "Programme Overview", href: "#section-hero" },
    { label: "What You&apos;ll Learn", href: "#section-curriculum" },
    { label: "Faculty", href: "#section-experts" },
    { label: "Outcomes", href: "#section-outcomes" },
    { label: "Free Clause Tool", href: "#section-tool" },
    { label: "Enrol Now", href: "#section-pricing" },
  ],
  Institution: [
    { label: "Lawctopus Law School", href: "https://www.lawctopus.com" },
    { label: "All Courses", href: "https://www.lawctopus.com/lawschool" },
    { label: "About Lawctopus", href: "https://www.lawctopus.com/about" },
    { label: "Contact Us", href: "mailto:hello@lawctopus.com" },
  ],
  Social: [
    { label: "Instagram", href: "https://www.instagram.com/lawctopus.official" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/lawctopus" },
    { label: "YouTube", href: "https://www.youtube.com/lawctopus" },
    { label: "Twitter / X", href: "https://x.com/lawctopus" },
  ],
};

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        const lenis = window.__lenis;
        if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
        else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      }
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <footer className="relative bg-[#0a1628] overflow-hidden">
      {/* Gold gradient line at top */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #d4a843 30%, #d4a843 70%, transparent 100%)" }} />

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #d4a843, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* Top row: logo + tagline */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 pb-16 border-b border-white/10">

          {/* Brand */}
          <div className="lg:w-1/3 space-y-4">
            <div className="flex items-center h-12">
              <img src="/logo.png" alt="Lawctopus" className="h-full w-auto object-contain brightness-0 invert" />
            </div>
            <p className="font-lora text-white/40 text-sm leading-relaxed tracking-wide">
              India&apos;s largest platform for law students and young lawyers. Building the next generation of commercially fluent legal professionals.
            </p>
            <div className="font-mono text-[11px] text-legal-500/70 leading-relaxed">
              Lawctopus Law School<br />
              Expert-Level Mastering Contract<br />
              Drafting &amp; Freelancing — July 2026 Cohort
            </div>
          </div>

          {/* Links */}
          <div className="lg:flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-legal-500 font-bold mb-4">{category}</div>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-200 text-left"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-white/20">
            © 2026 Lawctopus.com · All rights reserved · Page designed by{" "}
            <a href="https://linkedin.com/in/saumya-rajeshbhai-patel-857290372" target="_blank" rel="noopener noreferrer" className="text-legal-500/60 hover:text-legal-500 transition-colors">
              Saumya Patel
            </a>
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">Built with Next.js · Framer Motion · GSAP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
