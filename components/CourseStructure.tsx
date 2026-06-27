"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const MODULES = [
  {
    week: "Module 01",
    title: "Anatomy of a Commercial Contract",
    description: "Master the foundational architecture of any commercial agreement before drafting a single word.",
    topics: [
      "Understanding Preamble, Recitals, and Definitions",
      "Operative Clauses vs. Boilerplate Clauses",
      "Execution protocols and Signature blocks",
      "Drafting clear, unambiguous obligations"
    ],
    outcome: "You will draft the structural skeleton of a standard Non-Disclosure Agreement (NDA).",
  },
  {
    week: "Module 02",
    title: "Representations, Warranties & Covenants",
    description: "Learn to allocate risk and protect your client before the contract is even signed.",
    topics: [
      "Core differences between Covenants, Rights, and Reps",
      "Drafting Qualifiers: Materiality, Knowledge, and Time",
      "Survival of Representations post-closing",
      "Sandbagging and Anti-sandbagging provisions"
    ],
    outcome: "You will draft and redline complex Reps & Warranties for a Master Service Agreement.",
  },
  {
    week: "Module 03",
    title: "Indemnification & Limitation of Liability (LoL)",
    description: "The most heavily negotiated clauses in any deal. Learn how to draft them bulletproof.",
    topics: [
      "Structuring indemnification clauses logically",
      "Third-party claims vs. Direct claims coverage",
      "Drafting Caps, Baskets, and Carve-outs in LoL",
      "Consequential vs. Direct damages"
    ],
    outcome: "You will negotiate liability caps and defend an indemnity clause in a mock scenario.",
  },
  {
    week: "Module 04",
    title: "Termination, Breach & Remedies",
    description: "How to safely exit a bad deal and secure remedies without triggering litigation.",
    topics: [
      "Termination for Cause vs. Convenience",
      "Drafting cure periods and material breach definitions",
      "Liquidated damages vs. Penalty clauses",
      "Specific performance and injunctive relief"
    ],
    outcome: "You will draft watertight termination triggers for a complex Co-founder agreement.",
  },
  {
    week: "Module 05",
    title: "Boilerplate Clauses Unpacked",
    description: "They aren't just 'copy-paste'. Learn how courts actually interpret standard provisions.",
    topics: [
      "Drafting Force Majeure (Post-COVID standards)",
      "Severability, Waiver, and Assignment rights",
      "Governing Law and Dispute Resolution (Arbitration)",
      "Entire Agreement and Integration clauses"
    ],
    outcome: "You will build a personalized, reusable library of litigation-proof boilerplate clauses.",
  },
  {
    week: "Module 06",
    title: "Freelancing & Client Acquisition",
    description: "Translate your drafting skills into a scalable, independent freelance practice.",
    topics: [
      "Setting up Upwork & LinkedIn for inbound legal work",
      "Pricing models: Hourly billing vs. Value-based flat fees",
      "Drafting winning proposals and retaining clients",
      "Ethics, malpractice risks, and borderless practice"
    ],
    outcome: "You will launch your optimized freelance profile and send out your first client pitch.",
  },
];

function ModuleItem({ module, index, isOpen, onToggle }: { module: typeof MODULES[0], index: number, isOpen: boolean, onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
      className={`border ${isOpen ? "border-legal-500 bg-white shadow-xl" : "border-legal-200 bg-legal-50/30 hover:bg-white hover:border-legal-300"} rounded-2xl overflow-hidden transition-colors transition-shadow duration-300 will-change-transform`}
      style={{ transform: "translateZ(0)" }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-8 py-6 flex items-center justify-between group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-left">
          <div className={`font-mono text-lg sm:text-xl font-bold transition-colors duration-300 ${isOpen ? "text-legal-500" : "text-legal-300 group-hover:text-legal-400"}`}>
            {module.week}
          </div>
          <div className="pr-4 sm:pr-0">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-legal-900 leading-tight">{module.title}</h3>
            {/* Show short description only when closed */}
            <div className={!isOpen ? "block" : "hidden"}>
              <div className="pt-1">
                <p className="font-lora text-legal-500 italic text-xs sm:text-sm">
                  {module.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Icon */}
        <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors transition-transform duration-300 ${isOpen ? "bg-legal-500 border-legal-500 text-white rotate-45" : "border-legal-200 text-legal-400 group-hover:border-legal-500"}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      {/* Expanded Content */}
      <div className={isOpen ? "block" : "hidden"}>
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 sm:pt-4 sm:pl-[112px]"> {/* Aligned with title text on desktop */}
          <p className="font-lora text-legal-600 text-sm sm:text-base leading-relaxed mb-6">
            {module.description}
          </p>
          
          <div className="mb-6">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-legal-400 font-bold mb-3">Key Topics Covered</h4>
            <ul className="space-y-2">
              {module.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-legal-500 mt-1">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="font-sans text-legal-700 text-sm">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-legal-50 border border-legal-200 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl">✍️</span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-legal-500 font-bold mb-1">Practical Outcome</div>
              <div className="font-lora text-legal-900 font-medium italic text-sm">{module.outcome}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CourseStructure() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number>(0); // First module open by default

  return (
    <section ref={sectionRef} id="section-curriculum" className="relative py-24 bg-[#f8f6f1] overflow-hidden border-t border-legal-200/60">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 will-change-transform"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-legal-500 uppercase font-bold">Curriculum Breakdown</span>
          <h2 className="font-display text-5xl md:text-6xl font-black text-legal-900 mt-4 tracking-tight leading-[1.05]">
            12 Weeks to <br />
            <span className="text-legal-500">Drafting Mastery.</span>
          </h2>
          <p className="font-lora text-legal-600 mt-4 text-lg italic tracking-wide">
            A step-by-step framework designed to take you from structural basics to negotiating million-dollar deals.
          </p>
        </motion.div>

        <div className="space-y-4">
          {MODULES.map((module, i) => (
            <ModuleItem 
              key={module.week} 
              module={module} 
              index={i} 
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
