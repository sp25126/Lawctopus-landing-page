"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MODULES = [
  { num: "01", title: "Anatomy of a Contract",        desc: "Preamble, recitals, operative clauses, signature blocks, boilerplate — from first principles." },
  { num: "02", title: "Commercial Clause Drafting",   desc: "Indemnification caps, IP allocation, limitation of liability, termination triggers." },
  { num: "03", title: "Litigation-Proofing",           desc: "Dispute resolution, arbitration, governing law, force majeure, and severability." },
  { num: "04", title: "Corporate Transactions",        desc: "SHA, SSA, MoU, NDA, ESOP, and cross-border acquisition agreement structures." },
  { num: "05", title: "Employment & IP Contracts",    desc: "Service agreements, IP assignment, non-competes, and consultant arrangements." },
  { num: "06", title: "Tech & SaaS Agreements",       desc: "SaaS MSAs, API terms, data processing addenda, and software licensing structures." },
  { num: "07", title: "Freelancing & Client Growth",  desc: "Proposal structuring, global platforms, retainer design, and rate-setting mastery." },
];

const OUTCOMES = [
  "Draft commercial-grade contracts from scratch",
  "Negotiate like a Big 4 legal counsel",
  "Charge ₹20,000–₹80,000 per engagement",
  "Build a 100% online freelance legal practice",
  "Review and redline real acquisition agreements",
  "Understand cross-border governing law choices",
];

export default function WhatYouLearn() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative bg-[#f8f6f1] py-24 overflow-hidden">
      {/* decorative quote marks */}
      <div className="absolute top-8 left-8 font-display text-[200px] leading-none text-legal-900/[0.03] select-none pointer-events-none font-black">&ldquo;</div>
      <div className="absolute bottom-8 right-8 font-display text-[200px] leading-none text-legal-900/[0.03] select-none pointer-events-none font-black">&rdquo;</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="will-change-transform"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-legal-500 uppercase font-bold">What You&apos;ll Learn</span>
            <h2 className="font-display text-5xl md:text-6xl font-black text-legal-900 mt-3 leading-[1.1]">
              7 Skill Modules.<br />
              <span className="text-legal-500">One Career Transformation.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 will-change-transform"
          >
            <p className="font-lora text-legal-700 text-lg leading-relaxed italic">
              &ldquo;By the end of this programme, you won&apos;t just read contracts — you&apos;ll craft ones that protect, perform, and pay.&rdquo;
            </p>
            <div className="grid grid-cols-1 gap-2 mt-6">
              {OUTCOMES.map((outcome, i) => (
                <motion.div
                  key={outcome}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 font-sans text-sm text-legal-700 will-change-transform"
                >
                  <span className="w-5 h-5 rounded-full bg-legal-500/20 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M2 6l3 3 5-5" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {outcome}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Modules grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className={`group relative p-6 rounded-2xl border transition-colors transition-shadow duration-300 cursor-default will-change-transform ${
                i === 6
                  ? "md:col-span-2 lg:col-span-1 bg-legal-900 border-legal-700 text-white"
                  : "bg-white border-legal-200/60 hover:border-legal-500/40 hover:shadow-xl"
              }`}
              style={{ transform: "translateZ(0)" }}
            >
              {/* Hover shimmer */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.05) 0%, transparent 60%)" }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className={`font-mono text-3xl font-black leading-none ${i === 6 ? "text-legal-500" : "text-legal-200"}`}>
                    {mod.num}
                  </span>
                  <span className={`font-mono text-[10px] px-2 py-1 rounded-full ${i === 6 ? "bg-legal-500/20 text-legal-500" : "bg-legal-50 text-legal-400 border border-legal-200"}`}>
                    MODULE
                  </span>
                </div>
                <h3 className={`font-display text-xl font-bold mb-2 ${i === 6 ? "text-white" : "text-legal-900"}`}>
                  {mod.title}
                </h3>
                <p className={`font-lora text-sm leading-relaxed ${i === 6 ? "text-legal-300" : "text-legal-500"}`}>
                  {mod.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
