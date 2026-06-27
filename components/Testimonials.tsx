"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  { name: "Priya Menon",       college: "NALSAR Hyderabad",       outcome: "Now drafting SaaS MSAs for a Singapore startup at ₹45,000/contract", stars: 5, quote: "The redlining modules were a revelation. I went from generic boilerplate to commercial-grade drafts in 8 weeks." },
  { name: "Arjun Sharma",      college: "NLU Delhi",              outcome: "Placed at Cyril Amarchand Mangaldas as a Contract Specialist",          stars: 5, quote: "No other course taught me how to actually negotiate an indemnity cap. Tanuj sir's sessions are gold." },
  { name: "Sneha Iyer",        college: "Symbiosis Law School",   outcome: "Earning ₹60,000/month from 3 freelance tech clients",                  stars: 5, quote: "The freelancing module alone recovered the course fee within 2 months." },
  { name: "Rohan Gupta",       college: "ILS Law College",        outcome: "In-house counsel role at a Series B startup",                           stars: 5, quote: "I could finally understand what the other side's lawyers were actually trying to hide in the fine print." },
  { name: "Ananya Krishnan",   college: "GNLU Gandhinagar",       outcome: "International arbitration team at a top-10 law firm",                  stars: 5, quote: "Force majeure drafting and dispute resolution clauses — I never understood them until this programme." },
  { name: "Vikram Singh",      college: "Campus Law Centre, DU",  outcome: "Built a 12-client retainer practice billing ₹1.2L/month",              stars: 5, quote: "The retainer structure they taught me changed everything. I stopped billing hourly within 3 months." },
  { name: "Divya Nair",        college: "School of Law, Christ",  outcome: "Legal advisor to 2 early-stage founders",                              stars: 5, quote: "As a fresh graduate, this course gave me more practical skill than 6 months at a firm." },
  { name: "Aakash Patel",      college: "UILS Chandigarh",        outcome: "Contract manager at a pharma MNC",                                     stars: 5, quote: "The IP assignment clauses and licensing modules are incredibly well structured for someone entering contracts late." },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="#d4a843" className="w-4 h-4">
          <path d="M8 1l2.06 4.18L15 6.27l-3.5 3.41.83 4.82L8 12.08l-4.33 2.42.83-4.82L1 6.27l4.94-.09L8 1z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white border border-legal-200/60 rounded-2xl p-6 mx-3 shadow-sm flex flex-col gap-4">
      <Stars n={t.stars} />
      <p className="font-lora text-legal-700 text-sm leading-relaxed italic flex-grow">&ldquo;{t.quote}&rdquo;</p>
      <div className="border-t border-legal-100 pt-4">
        <div className="font-display font-bold text-legal-900 text-base">{t.name}</div>
        <div className="font-mono text-[11px] text-legal-400 mt-0.5">{t.college}</div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-legal-500 flex-shrink-0" />
          <span className="font-sans text-xs text-legal-500">{t.outcome}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} id="section-testimonials" className="relative bg-[#1e3a5f] py-24 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #d4a843, transparent)" }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #d4a843, transparent)" }} />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center px-6 mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-legal-500 uppercase font-bold">Alumni Voices</span>
          <h2 className="font-display text-5xl font-black text-white mt-3 tracking-tight leading-[1.1]">
            2,000+ Lawyers.<br />
            <span className="text-legal-500">Real Outcomes.</span>
          </h2>
          <p className="font-lora text-white/50 mt-4 text-lg italic tracking-wide">What happens after you join the cohort.</p>
        </motion.div>

        {/* Marquee row 1 — left to right */}
        <div className="relative overflow-hidden mb-5">
          <div className="flex will-change-transform" style={{ animation: "marquee 35s linear infinite", transform: "translateZ(0)" }}>
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

        {/* Marquee row 2 — right to left */}
        <div className="relative overflow-hidden">
          <div className="flex will-change-transform" style={{ animation: "marquee-reverse 40s linear infinite", transform: "translateZ(0)" }}>
            {[...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        div:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
