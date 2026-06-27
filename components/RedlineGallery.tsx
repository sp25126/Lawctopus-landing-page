"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CheckCircle, AlertCircle, Info, ExternalLink, HelpCircle } from "lucide-react";
import { WATERMARK } from "../hooks/useWatermark";

interface RedlineCard {
  id: number;
  clauseType: string;
  beforeText: string;
  afterText: string;
  goldHighlights: string[]; // words/phrases to highlight gold
  alumniName: string;
  alumniFirm: string;
  alumniProfile: string;
  strategy: string;
}

const REDLINE_CARDS: RedlineCard[] = [
  {
    id: 1,
    clauseType: "Limitation of Liability",
    beforeText: "In no event shall the Contractor be liable for any damages whatsoever arising under this contract.",
    afterText: "Except for breaches of confidentiality or intellectual property infringement, Contractor's total liability under this Agreement shall be capped at the total amount of fees paid to Contractor.",
    goldHighlights: ["Except for breaches of confidentiality or intellectual property infringement", "capped at the total amount of fees paid"],
    alumniName: "Anjali Sharma",
    alumniFirm: "AZB & Partners",
    alumniProfile: "https://linkedin.com/in/mock-anjali",
    strategy: "Initial blanket exclusion is commercially unreasonable and won't hold in court. Recalibrated to a fee cap while carving out IP/confidentiality to secure reasonable terms for the client.",
  },
  {
    id: 2,
    clauseType: "Intellectual Property Transfer",
    beforeText: "All deliverables and custom work created by Vendor shall belong to the Customer upon development.",
    afterText: "Subject to full and final payment of the fees, Vendor hereby assigns to Customer all intellectual property rights in the final approved deliverables.",
    goldHighlights: ["Subject to full and final payment of the fees", "final approved deliverables"],
    alumniName: "Rahul Verma",
    alumniFirm: "Trilegal",
    alumniProfile: "https://linkedin.com/in/mock-rahul",
    strategy: "Immediate transfer upon creation removes leverage in case of payment defaults. Conditioned IP transfer strictly on final payment clearance.",
  },
  {
    id: 3,
    clauseType: "Non-Solicitation Scope",
    beforeText: "The Consultant shall not hire or solicit any employees, clients, or affiliates of the Company for 5 years.",
    afterText: "Consultant shall not, for a period of one (1) year post-termination, directly solicit any senior technical staff introduced to Consultant during the term of services.",
    goldHighlights: ["one (1) year post-termination", "senior technical staff introduced to Consultant"],
    alumniName: "Vikram Malhotra",
    alumniFirm: "Independent Counsel",
    alumniProfile: "https://linkedin.com/in/mock-vikram",
    strategy: "A 5-year absolute solicitation ban is unenforceable as restraint of trade. Narrowed the scope to 1 year and restricted strictly to staff introduced directly.",
  },
];

function CountUp({ end, start = 0, duration = 1500 }: { end: number; start?: number; duration?: number }) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, end, start, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function RedlineGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredNotes, setHoveredNotes] = useState<number | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Helper to highlight specific strings inside text
  const renderHighlightedText = (text: string, highlights: string[]) => {
    let result = text;
    // We want to wrap each highlight in a gold span.
    // To do this simply, we replace highlights with custom tags
    highlights.forEach((hl, i) => {
      result = result.replace(hl, `##GOLD_${i}##`);
    });

    const parts = result.split(/(##GOLD_\d+##)/g);

    return parts.map((part, index) => {
      const match = part.match(/##GOLD_(\d+)##/);
      if (match) {
        const highlightIndex = parseInt(match[1], 10);
        const originalText = highlights[highlightIndex];
        return (
          <span 
            key={index} 
            className="bg-legal-100/70 border-b-2 border-legal-500 px-1 font-semibold text-legal-900 transition-colors duration-300"
          >
            {originalText}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden border-b border-legal-200/50">
      <div className="absolute inset-0 bg-paper-grain opacity-[0.02] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header with Counter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 text-left">
            <span className="font-mono text-legal-500 text-xs font-bold uppercase tracking-widest block">
              PROOF OF MASTERY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-legal-900">
              Redline Before/After Gallery
              <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
            </h2>
            <p className="font-sans text-legal-400 text-sm max-w-xl">
              Compare crude legal templates against clean commercial contracts. Hover over any card to reveal the underlying negotiation strategy.
              <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
            </p>
          </div>

          <div className="bg-legal-50 border border-legal-200 px-5 py-3.5 rounded-xl flex items-center space-x-3.5 w-fit h-fit shadow-sm">
            <div className="text-3xl font-serif font-bold text-legal-700">
              <CountUp end={847} />
            </div>
            <div className="font-mono text-[10px] text-legal-400 font-bold uppercase leading-snug tracking-wider">
              Contracts Drafted <br />
              <span className="text-legal-500">By Alumni This Month</span>
            </div>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {REDLINE_CARDS.map((card, index) => {
            const showNotes = hoveredNotes === card.id;
            const tooltipOpen = activeTooltip === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredNotes(card.id)}
                onMouseLeave={() => setHoveredNotes(null)}
                className="bg-legal-50/40 border border-legal-200/60 rounded-xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all duration-300 relative group min-h-[380px]"
              >
                <div className="space-y-5">
                  
                  {/* Category & Tooltip */}
                  <div className="flex justify-between items-center pb-3 border-b border-legal-200/50">
                    <span className="font-mono text-[10px] font-bold text-legal-400 uppercase tracking-wide">
                      {card.clauseType}
                    </span>
                    
                    {/* Alumni Tooltip */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setActiveTooltip(card.id)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        onClick={() => setActiveTooltip(tooltipOpen ? null : card.id)}
                        className="flex items-center space-x-1 text-[10px] font-mono text-legal-500 hover:text-legal-700 bg-legal-100/60 hover:bg-legal-100 px-2 py-1 rounded transition border border-legal-200/30"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Who drafted?</span>
                      </button>

                      <AnimatePresence>
                        {tooltipOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-7 z-30 bg-legal-900 text-white rounded-lg p-3 w-48 shadow-xl border border-legal-800 text-left space-y-1.5"
                          >
                            <div className="font-serif text-xs font-bold text-legal-500">
                              {card.alumniName}
                            </div>
                            <div className="font-mono text-[9px] text-slate-300 uppercase">
                              {card.alumniFirm}
                            </div>
                            <div className="h-[1px] bg-slate-800 my-1" />
                            <a
                              href={card.alumniProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] font-mono text-legal-300 hover:text-white flex items-center space-x-1"
                            >
                              <span>View Alumni Profile</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* BEFORE clause */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 font-mono text-[9px] text-red-500 font-bold uppercase">
                      <AlertCircle className="w-3 h-3" />
                      <span>Before (Crude Template):</span>
                    </div>
                    <p className="text-xs font-serif text-neutral-400 bg-neutral-100/60 p-3 rounded border border-neutral-200/40 line-through decoration-red-400/50 leading-relaxed">
                      {card.beforeText}
                    </p>
                  </div>

                  {/* AFTER clause */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 font-mono text-[9px] text-green-700 font-bold uppercase">
                      <CheckCircle className="w-3 h-3" />
                      <span>After (Alumni Redline):</span>
                    </div>
                    <p className="text-xs font-sans text-neutral-900 bg-white p-3 rounded border border-legal-200/50 leading-relaxed shadow-sm">
                      {renderHighlightedText(card.afterText, card.goldHighlights)}
                    </p>
                  </div>
                </div>

                {/* Negotiation Notes Strategy Hover Overlay */}
                <div className="mt-5 pt-3.5 border-t border-legal-200/40 flex items-center justify-between">
                  <a
                    href="#master-section"
                    className="text-[10px] font-serif font-bold text-legal-700 hover:text-legal-900 flex items-center space-x-1 group/link"
                  >
                    <span>Learn to draft like this</span>
                    <span className="transition-transform group-hover/link:translate-x-1">→</span>
                  </a>

                  {/* Hover explanation indicator */}
                  <div className="relative">
                    <div className="flex items-center space-x-1 text-[10px] font-mono text-legal-400 font-bold uppercase cursor-help select-none">
                      <Info className="w-3.5 h-3.5 text-legal-500" />
                      <span className="hidden group-hover:inline">Strategy Active</span>
                    </div>

                    <AnimatePresence>
                      {showNotes && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          className="absolute bottom-6 right-0 z-20 bg-white border border-legal-200 rounded-lg p-3.5 w-64 shadow-xl text-left"
                        >
                          <div className="font-mono text-[9px] text-legal-500 font-bold uppercase tracking-wider mb-1">
                            NEGOTIATION NOTES
                          </div>
                          <p className="text-[10px] font-sans text-legal-700 leading-relaxed">
                            {card.strategy}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
