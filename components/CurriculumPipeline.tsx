"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Lock, Unlock, FileText, CheckCircle2, ChevronRight, TrendingUp, ArrowRight } from "lucide-react";
import { WATERMARK } from "../hooks/useWatermark";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
interface StageData {
  id: string;
  num: number;
  phase: string;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
  panelBg: string;
  textBase: string;
  textMuted: string;
  tag: string;
  folderLabel: string;
  redline: { original: string; corrected: string; explanation: string };
}

const STAGES: StageData[] = [
  {
    id: "intake",
    num: 1,
    phase: "PHASE 01",
    title: "Drafting",
    subtitle: "Fundamentals",
    accent: "#d4a843",
    bg: "bg-[#f8f6f1]",
    panelBg: "bg-white",
    textBase: "text-[#1e3a5f]",
    textMuted: "text-[#5a7fa0]",
    tag: "bg-[#1e3a5f] text-[#d4a843]",
    folderLabel: "CASE FILE // INTAKE-01",
    redline: {
      original: "This contract is made by and between the parties hereunto on this day of…",
      corrected: "This Agreement is dated June 27, 2026. The Parties agree as follows:",
      explanation: "Strip ancient legalese. Draft plain-English preambles that establish clear entity definitions from line one.",
    },
  },
  {
    id: "review",
    num: 2,
    phase: "PHASE 02",
    title: "Redlining &",
    subtitle: "Negotiation",
    accent: "#d4a843",
    bg: "bg-[#1e3a5f]",
    panelBg: "bg-[#162d4c]",
    textBase: "text-white",
    textMuted: "text-[#8eb4d4]",
    tag: "bg-[#d4a843] text-[#1e3a5f]",
    folderLabel: "CASE FILE // REVIEW-02",
    redline: {
      original: "The Contractor shall have unlimited liability for any and all claims arising…",
      corrected: "The Contractor's aggregate liability shall not exceed the total fees paid under this Agreement.",
      explanation: "Master liability capping, indemnity exclusions, and high-stakes negotiation markups that protect your client.",
    },
  },
  {
    id: "execute",
    num: 3,
    phase: "PHASE 03",
    title: "Client Billing &",
    subtitle: "Onboarding",
    accent: "#d4a843",
    bg: "bg-[#0f1f3a]",
    panelBg: "bg-[#0a1628]",
    textBase: "text-white",
    textMuted: "text-[#7090b0]",
    tag: "bg-[#d4a843]/20 text-[#d4a843] border border-[#d4a843]/30",
    folderLabel: "CASE FILE // EXECUTION-03",
    redline: {
      original: "Client will pay the freelancer when they are fully satisfied with the work.",
      corrected: "Client shall pay ₹40,000 within seven (7) business days of Milestone 1 completion.",
      explanation: "Eliminate payment disputes. Write bulletproof milestone triggers, retainer structures, and late fee clauses.",
    },
  },
  {
    id: "scale",
    num: 4,
    phase: "PHASE 04",
    title: "Building a",
    subtitle: "Legal Practice",
    accent: "#d4a843",
    bg: "bg-[#080f1c]",
    panelBg: "bg-[#0d1b30]",
    textBase: "text-white",
    textMuted: "text-[#6080a0]",
    tag: "bg-[#d4a843] text-[#080f1c]",
    folderLabel: "CASE FILE // SCALE-04",
    redline: {
      original: "Work on low-cost gig platforms for ₹500/hour and compete on price.",
      corrected: "Offer premium legal counsel subscriptions starting at ₹50,000/month.",
      explanation: "Escape the hourly trap. Package legal services into retainer programs and attract high-ticket global clients.",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function CurriculumPipeline() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Lead-capture / calculator state
  const [isUnlocked,  setIsUnlocked]  = useState(false);
  const [userName,    setUserName]    = useState("");
  const [userEmail,   setUserEmail]   = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [contracts,   setContracts]   = useState(5);
  const [avgFee,      setAvgFee]      = useState(30000);

  const monthly = contracts * avgFee;
  const annual  = monthly  * 12;

  // ── GSAP pin + horizontal translate ──────────────────────────────────────
  useGSAP(
    () => {
      if (!wrapperRef.current || !trackRef.current) return;

      const panels      = trackRef.current.querySelectorAll<HTMLElement>(".cp-panel");
      const totalPanels = panels.length;
      // Travel distance = width of all panels except the last (which stays in view)
      const travelX = () => trackRef.current!.scrollWidth - wrapperRef.current!.clientWidth;

      const ctx = gsap.context(() => {
        const tween = gsap.to(trackRef.current, {
          x: () => -travelX(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            scrub: 1,            // scrub=1 → 1-second lag = buttery feel
            start: "top top",
            end: () => `+=${travelX()}`,
            invalidateOnRefresh: true,
            onUpdate(self) {
              // Drive active dot indicator
              const idx = Math.min(
                totalPanels - 1,
                Math.floor(self.progress * totalPanels)
              );
              setActiveIdx(idx);
            },
          },
        });

        return () => { tween.scrollTrigger?.kill(); tween.kill(); };
      });

      return () => ctx.revert();
    },
    { scope: wrapperRef }
  );

  // Sync Lenis ↔ ScrollTrigger on every Lenis tick
  useEffect(() => {
    const id = setInterval(() => ScrollTrigger.update(), 16);
    return () => clearInterval(id);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      setUnlockError("Please fill out both fields.");
      return;
    }
    if (!userEmail.includes("@")) {
      setUnlockError("Enter a valid email.");
      return;
    }
    setIsUnlocked(true);
    setUnlockError("");
  };

  return (
    <div ref={wrapperRef} className="relative h-screen overflow-hidden">
      {/* ── Progress breadcrumb ────────────────────────────────────────────── */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {STAGES.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  width:  i === activeIdx ? 24 : 8,
                  backgroundColor: i <= activeIdx ? "#d4a843" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.4 }}
                className="h-2 rounded-full"
              />
              <span className={`font-mono text-[10px] font-bold transition-opacity duration-300 ${i === activeIdx ? "opacity-100 text-[#d4a843]" : "opacity-30 text-white"}`}>
                {s.phase}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <ArrowRight className={`w-3 h-3 transition-opacity duration-300 ${i < activeIdx ? "opacity-60 text-[#d4a843]" : "opacity-20 text-white"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── Horizontal track ──────────────────────────────────────────────── */}
      <div ref={trackRef} className="flex h-full will-change-transform">
        {STAGES.map((stage, i) => (
          <Panel
            key={stage.id}
            stage={stage}
            isActive={i === activeIdx}
            isUnlocked={isUnlocked}
            userName={userName}
            userEmail={userEmail}
            unlockError={unlockError}
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            handleUnlock={handleUnlock}
            contracts={contracts}
            setContracts={setContracts}
            avgFee={avgFee}
            setAvgFee={setAvgFee}
            monthly={monthly}
            annual={annual}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PANEL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
interface PanelProps {
  stage: StageData;
  isActive: boolean;
  isUnlocked: boolean;
  userName: string; userEmail: string; unlockError: string;
  setUserName: (v: string) => void; setUserEmail: (v: string) => void;
  handleUnlock: (e: React.FormEvent) => void;
  contracts: number; setContracts: (v: number) => void;
  avgFee: number; setAvgFee: (v: number) => void;
  monthly: number; annual: number;
}

function Panel({ stage, isActive, isUnlocked, userName, userEmail, unlockError, setUserName, setUserEmail, handleUnlock, contracts, setContracts, avgFee, setAvgFee, monthly, annual }: PanelProps) {
  return (
    <div className={`cp-panel w-screen h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden ${stage.bg}`}>
      {/* subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #d4a843 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* ── Panel content grid ────────────────────────────────────────────── */}
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-20 items-center z-10 pt-16 sm:pt-0">

        {/* LEFT — narrative column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.4, x: -20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 sm:space-y-6"
        >
          {/* Phase tag */}
          <span className={`inline-block font-mono text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${stage.tag}`}>
            {stage.phase} of 04
          </span>

          {/* Heading */}
          <div>
            <h2 className={`font-serif text-3xl sm:text-5xl md:text-6xl xl:text-7xl leading-none font-bold ${stage.textBase}`}>
              {stage.title}
              <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
            </h2>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-7xl leading-none font-bold" style={{ color: stage.accent }}>
              {stage.subtitle}
            </h2>
          </div>

          {/* Description */}
          <p className={`font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-sm ${stage.textMuted}`}>
            Syllabus Phase {stage.num} covers the exact drafting standards and professional practices to construct high-quality, commercially-resilient legal deliverables.
            <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
          </p>

          {/* Step counter */}
          <div className="hidden sm:flex items-center gap-4 pt-2">
            <div className="text-7xl font-serif font-bold opacity-10 leading-none select-none" style={{ color: stage.accent }}>
              0{stage.num}
            </div>
            <div className={`w-px h-12 ${stage.textMuted} opacity-30 bg-current`} />
            <div className={`font-mono text-[11px] uppercase tracking-widest ${stage.textMuted}`}>
              Scroll to advance
            </div>
          </div>
        </motion.div>

        {/* RIGHT — interactive folder card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Folder tab */}
          <div className="inline-flex items-center gap-2 font-mono text-[9px] sm:text-[10px] font-bold px-3 sm:px-4 py-1.5 rounded-t-lg"
            style={{ backgroundColor: stage.accent, color: "#1e3a5f" }}>
            <FileText className="w-3 h-3" />
            {stage.folderLabel}
          </div>

          {/* Card */}
          <div className={`rounded-b-2xl rounded-tr-2xl border shadow-2xl overflow-hidden ${stage.panelBg}`}
            style={{ borderColor: stage.accent + "30" }}>

            {/* Card header bar */}
            <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 border-b" style={{ borderColor: stage.accent + "15" }}>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className={`font-mono text-[9px] sm:text-[10px] ml-3 ${stage.textMuted}`}>LAWCTOPUS // CONTRACT_DRAFT_v{stage.num}.md</span>
            </div>

            {/* Card body */}
            <div className="p-4 sm:p-5 md:p-7 min-h-[260px] sm:min-h-[360px] flex flex-col">
              {stage.id === "scale" && !isUnlocked ? (
                /* ── Lock screen ── */
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-2" style={{ borderColor: stage.accent, color: stage.accent }}>
                    <Lock className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <h4 className={`font-serif font-bold text-xl ${stage.textBase}`}>Earnings Calculator</h4>
                    <p className={`text-xs mt-1 max-w-xs ${stage.textMuted}`}>Unlock Stage 4 to estimate your freelance legal revenue potential.</p>
                  </div>
                  <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-2.5 text-left">
                    <input type="text" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:ring-1 focus:ring-[#d4a843] outline-none font-mono" />
                    <input type="email" placeholder="Professional Email" value={userEmail} onChange={e => setUserEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:ring-1 focus:ring-[#d4a843] outline-none font-mono" />
                    {unlockError && <p className="text-[10px] text-red-400 font-mono">{unlockError}</p>}
                    <button type="submit" className="w-full py-2.5 rounded-lg font-serif font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#d4a843", color: "#1e3a5f" }}>
                      Unlock Stage 4 <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

              ) : stage.id === "scale" && isUnlocked ? (
                /* ── Earnings calculator ── */
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col gap-5">
                  <div className="flex items-center gap-2 text-green-400 font-mono text-[10px] font-bold">
                    <Unlock className="w-3.5 h-3.5" /> STAGE 4 CALCULATOR UNLOCKED
                  </div>

                  <div className="space-y-5 flex-1">
                    {[
                      { label: "Contracts Drafted / Month", min: 1, max: 15, step: 1, value: contracts, set: setContracts, display: String(contracts) },
                      { label: "Average Fee / Contract (INR)", min: 10000, max: 200000, step: 5000, value: avgFee, set: setAvgFee, display: `₹${avgFee.toLocaleString()}` },
                    ].map(ctrl => (
                      <div key={ctrl.label} className="space-y-2">
                        <div className="flex justify-between font-mono text-xs">
                          <span className={stage.textMuted}>{ctrl.label}</span>
                          <span style={{ color: "#d4a843" }} className="font-bold">{ctrl.display}</span>
                        </div>
                        <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.value}
                          onChange={e => ctrl.set(parseInt(e.target.value))}
                          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#d4a843]"
                          style={{ background: `linear-gradient(to right, #d4a843 ${((ctrl.value - ctrl.min) / (ctrl.max - ctrl.min)) * 100}%, rgba(255,255,255,0.1) 0%)` }} />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Monthly Revenue", value: `₹${monthly.toLocaleString()}` },
                      { label: "Annual Revenue",  value: `₹${annual.toLocaleString()}`  },
                    ].map(r => (
                      <div key={r.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <div className={`font-mono text-[9px] uppercase tracking-wider mb-1 ${stage.textMuted}`}>{r.label}</div>
                        <div className="font-serif text-2xl font-bold" style={{ color: "#d4a843" }}>{r.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#d4a843" }} />
                    <p className={`text-[11px] leading-relaxed ${stage.textMuted}`}>
                      Freelancers drafting 5 commercial contracts/month out-earn junior law firm associates by <strong style={{ color: "#d4a843" }}>2.4×</strong> on average.
                    </p>
                  </div>
                </motion.div>

              ) : (
                /* ── Redline document ── */
                <div className="flex-1 flex flex-col gap-5">
                  {/* Document header */}
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="font-mono text-[9px] text-white/30 font-bold tracking-widest">LAWCTOPUS ACADEMIC DRAFT</span>
                    <span className="font-mono text-[9px] text-white/20">PAGE 0{stage.num}</span>
                  </div>

                  {/* Before */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] font-bold text-red-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" /> CRUDE BOILERPLATE [REDLINED]
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/60 rounded-l-lg" />
                      <p className="font-serif text-sm leading-relaxed text-red-300 line-through decoration-red-500/60">
                        {stage.redline.original}
                      </p>
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] font-bold flex items-center gap-1.5" style={{ color: "#d4a843" }}>
                      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#d4a843" }} /> EXPERT-LEVEL PRO DRAFT
                    </div>
                    <div className="rounded-lg px-4 py-3 relative border" style={{ backgroundColor: "#d4a84310", borderColor: "#d4a84330" }}>
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ backgroundColor: "#d4a843" }} />
                      <p className="font-serif text-sm leading-relaxed" style={{ color: "#e8c870" }}>
                        {stage.redline.corrected}
                      </p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className={`flex items-start gap-2 text-[11px] leading-relaxed font-sans border-t border-white/10 pt-3 ${stage.textMuted}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#d4a843" }} />
                    {stage.redline.explanation}
                  </div>

                  {/* Footer */}
                  <div className={`flex justify-between items-center text-[9px] font-mono border-t border-white/10 pt-3 ${stage.textMuted}`}>
                    <span>PRACTICAL LAB READY</span>
                    <span>LAWCTOPUS ACADEMY © 2026</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
