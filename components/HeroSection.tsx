"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import confetti from "canvas-confetti";
import { Lock, Unlock, CheckCircle, RotateCcw, AlertTriangle, ChevronRight, HelpCircle } from "lucide-react";
import { WATERMARK } from "../hooks/useWatermark";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
      }
    }, 15);
    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayedText}</span>;
};

// Clause types and data
interface Clause {
  id: string;
  label: string;
  zone: string;
  text: string;
  placeholder: string;
  insight?: string;
}

const CLAUSES: Clause[] = [
  {
    id: "confidentiality",
    label: "Confidentiality",
    zone: "nda",
    placeholder: "SECTION 1. Confidential Information. [Drop Confidentiality Clause Here]",
    text: "The Receiving Party shall maintain the strictly confidential nature of all Proprietary Information and shall not disclose it to any third party without prior written consent.",
    insight: "Pro-Tip: Always carve out 'publicly known information' to prevent the clause from being struck down as overly broad in court.",
  },
  {
    id: "indemnity",
    label: "Indemnity",
    zone: "indemnity",
    placeholder: "SECTION 2. Liability & Indemnity. [Drop Indemnity Clause Here]",
    text: "The Consultant agrees to indemnify, defend, and hold harmless the Client from and against any and all claims, liabilities, losses, or damages arising out of negligence.",
    insight: "Pro-Tip: As a freelancer, always fight to include a Liability Cap (e.g., capped at the total fees paid) so one mistake doesn't bankrupt you.",
  },
  {
    id: "termination",
    label: "Termination",
    zone: "termination",
    placeholder: "SECTION 3. Term & Termination. [Drop Termination Clause Here]",
    text: "Either party may terminate this Agreement upon thirty (30) days written notice to the other party in the event of a material breach that remains uncured.",
    insight: "Pro-Tip: Ensure your 'cure period' is clearly defined (e.g., 15 days to fix a breach) before the client can abruptly terminate the contract.",
  },
  {
    id: "non-compete",
    label: "Non-Compete",
    zone: "none", // Distractor
    placeholder: "",
    text: "The Consultant shall not engage in any business activity that directly competes with the Client's business during the term of this engagement.",
  },
  {
    id: "ip-assignment",
    label: "IP Assignment",
    zone: "none", // Distractor
    placeholder: "",
    text: "All intellectual property rights created during the performance of services under this Agreement shall belong solely and exclusively to the Client.",
  },
];

const ZONES = [
  { id: "nda", label: "NDA Zone", expected: "confidentiality" },
  { id: "indemnity", label: "Indemnity Zone", expected: "indemnity" },
  { id: "termination", label: "Termination Zone", expected: "termination" },
];

export default function HeroSection() {
  const [placed, setPlaced] = useState<Record<string, string>>({}); // zoneId -> clauseId
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seats, setSeats] = useState(12);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Refs for drop zones to calculate bounding boxes during drag
  const zoneRefs = {
    nda: useRef<HTMLDivElement>(null),
    indemnity: useRef<HTMLDivElement>(null),
    termination: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    setMounted(true);

    // Live seats decrement
    const seatsTimer = setInterval(() => {
      setSeats((prev) => (prev > 3 ? prev - 1 : prev));
    }, 45000);

    // Cohort countdown timer (Targeting July 15, 2026)
    const targetDate = new Date("2026-07-15T00:00:00Z").getTime();
    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(countdownTimer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(seatsTimer);
      clearInterval(countdownTimer);
    };
  }, []);

  // Check if all 3 zones are correctly filled
  useEffect(() => {
    const isAllFilled = 
      placed.nda === "confidentiality" &&
      placed.indemnity === "indemnity" &&
      placed.termination === "termination";

    if (isAllFilled && !isCompleted) {
      setIsCompleted(true);
      setIsPulsing(true);
      setSuccessMessage("Agreement fully assembled! Enrollment unlocked.");
      
      // Confetti animation
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#1e3a5f", "#d4a843", "#2d5a8a", "#f8f6f1"],
      });

      // Stop pulsing after 10 seconds
      setTimeout(() => {
        setIsPulsing(false);
      }, 10000);

      // Smooth scroll to target after 2 seconds
      setTimeout(() => {
        const section = document.getElementById("master-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);
    }
  }, [placed, isCompleted]);

  // Handle Drag End (Desktop)
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, clauseId: string) => {
    const clause = CLAUSES.find((c) => c.id === clauseId);
    if (!clause) return;

    let pointerX = 0;
    let pointerY = 0;

    // 1. Get accurate VIEWPORT-relative coordinates
    if ('changedTouches' in event && event.changedTouches.length > 0) {
      pointerX = event.changedTouches[0].clientX;
      pointerY = event.changedTouches[0].clientY;
    } else if ('clientX' in event && event.clientX !== undefined && 'clientY' in event && event.clientY !== undefined) {
      pointerX = event.clientX;
      pointerY = event.clientY;
    } else {
      // Fallback: Framer's info.point is PAGE-relative, so subtract scroll offset
      pointerX = info.point.x - window.scrollX;
      pointerY = info.point.y - window.scrollY;
    }

    let closestZone = null;
    let minDistance = Infinity;

    // Find the closest drop zone to the pointer
    for (const zone of ZONES) {
      const ref = zoneRefs[zone.id as keyof typeof zoneRefs].current;
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const zoneCenterX = rect.left + rect.width / 2;
        const zoneCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(pointerX - zoneCenterX, 2) + Math.pow(pointerY - zoneCenterY, 2)
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          closestZone = zone;
        }
      }
    }

    // If the pointer is within a massive 350px radius of the closest zone's center, snap it in!
    if (closestZone && minDistance < 350) {
      if (closestZone.expected === clauseId) {
        setPlaced((prev) => ({ ...prev, [closestZone.id]: clauseId }));
        setErrorMessage(null);
      } else {
        setErrorMessage(`Incorrect Placement: The ${clause.label} clause doesn't belong in the ${closestZone.label}.`);
        if (navigator.vibrate) navigator.vibrate(100);
      }
    } else {
      setErrorMessage(null);
    }
  };

  // Handle Tap (Mobile & Tablet)
  const handleCardTap = (clauseId: string) => {
    setSelectedCard(clauseId === selectedCard ? null : clauseId);
    setErrorMessage(null);
  };

  const handleZoneTap = (zoneId: string) => {
    if (!selectedCard) {
      setErrorMessage("Please select a clause card from the options below first.");
      return;
    }

    const zone = ZONES.find((z) => z.id === zoneId);
    const clause = CLAUSES.find((c) => c.id === selectedCard);

    if (zone && clause) {
      if (zone.expected === selectedCard) {
        setPlaced((prev) => ({ ...prev, [zoneId]: selectedCard }));
        setSelectedCard(null);
        setErrorMessage(null);
      } else {
        setErrorMessage(`Cannot place ${clause.label} in ${zone.label}. Read the contract outline carefully.`);
        if (navigator.vibrate) navigator.vibrate(100);
      }
    }
  };

  const resetSimulator = () => {
    setPlaced({});
    setSelectedCard(null);
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsCompleted(false);
  };

  const handleEnrollClick = () => {
    if (isCompleted) {
      alert("Redirecting you to the Lawctopus payment gateway... Welcome aboard!");
    } else {
      setErrorMessage("Please complete the Clause Assembly simulator to unlock enrollment.");
      const simulator = document.getElementById("simulator-widget");
      if (simulator) {
        simulator.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-legal-50 overflow-hidden pt-12 pb-32 flex flex-col justify-center border-b border-legal-200">
      {/* Background paper texture & oscilloscope animation */}
      <div className="absolute inset-0 bg-paper-grain opacity-[0.04] pointer-events-none z-0" />
      
      {/* Oscilloscope SVG */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 overflow-hidden flex items-center justify-center translate-z-0 will-change-transform">
        <svg className="w-full h-full max-h-[800px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 600" fill="none">
          <path 
            d="M0,300 C150,280 200,450 350,450 C500,450 550,150 700,150 C850,150 900,400 1050,400 C1200,400 1250,290 1440,300" 
            stroke="#1e3a5f" 
            strokeWidth="2" 
            strokeDasharray="8,8"
            className="animate-[dash_60s_linear_infinite]"
          />
          <path 
            d="M0,280 C200,320 250,100 450,100 C650,100 600,480 800,480 C1000,480 1100,200 1300,200 C1400,200 1440,270 1440,280" 
            stroke="#d4a843" 
            strokeWidth="1" 
            className="animate-[pulse_10s_ease-in-out_infinite]"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col flex-grow justify-center">
        {/* Course badge */}
        <div className="flex items-center space-x-2 bg-legal-100/60 border border-legal-200/80 px-4 py-1.5 rounded-full w-fit mb-6 shadow-sm mx-auto md:mx-0">
          <span className="w-2.5 h-2.5 rounded-full bg-legal-500 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-legal-700 font-semibold">
            Cohort-based Interactive Masterclass
          </span>
        </div>

        {/* Hero Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-legal-900 leading-[1.1] tracking-tight">
              Master Contract
              <span className="text-legal-500 relative inline-block px-1">
                Drafting
                <span className="absolute bottom-1.5 left-0 w-full h-1 bg-legal-500/30 -z-10" />
                <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
              </span>
              <br />& Freelancing
            </h1>
            <p className="font-sans text-legal-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              The premier masterclass designed by corporate counsels. Work through mock scenarios, assemble legal clauses live, and launch a successful global legal freelancing practice.
              <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={handleEnrollClick}
                className="w-full sm:w-auto bg-legal-700 hover:bg-legal-900 text-white font-serif px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 border border-legal-800"
              >
                <span>Enroll in Course</span>
                <ChevronRight className="w-5 h-5 text-legal-500" />
              </button>
              <a 
                href="#master-section"
                className="w-full sm:w-auto text-center font-mono text-sm font-bold text-legal-700 hover:text-legal-900 px-6 py-4 transition duration-300"
              >
                Explore Syllabus
              </a>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-legal-400 text-xs font-mono pt-4 border-t border-legal-200/50">
              <div>₹40,000 INR</div>
              <div className="w-1.5 h-1.5 rounded-full bg-legal-200" />
              <div>12-Week Curriculum</div>
              <div className="w-1.5 h-1.5 rounded-full bg-legal-200" />
              <div>1-on-1 Mentorship</div>
            </div>
          </div>

          {/* Interactive Simulator Column */}
          <div className="lg:col-span-7" id="simulator-widget">
            <div className="bg-white border-2 border-legal-200 rounded-xl p-5 md:p-8 shadow-xl relative overflow-hidden flex flex-col translate-z-0">
              {/* Paper texture overlay specifically on widget */}
              <div className="absolute inset-0 bg-paper-grain opacity-[0.02] pointer-events-none" />

              {/* Widget Header */}
              <div className="flex items-center justify-between border-b border-legal-100 pb-4 mb-6 z-10">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isCompleted ? 'bg-legal-500/20 text-legal-600' : 'bg-legal-100 text-legal-400'}`}>
                    {isCompleted ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-legal-900">Clause Assembly Simulator</h3>
                    <p className="text-xs text-legal-400 font-mono">DRAG & DROP TO BUILD CONTRACT SKELETON</p>
                  </div>
                </div>
                <button 
                  onClick={resetSimulator}
                  className="flex items-center space-x-1.5 text-xs text-legal-400 hover:text-legal-700 bg-legal-50 hover:bg-legal-100 px-3 py-1.5 rounded-lg border border-legal-100 transition"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-mono">Reset</span>
                </button>
              </div>

              {/* Instructions */}
              <div className="bg-legal-50 border border-legal-100 rounded-lg p-3.5 mb-6 text-xs text-legal-400 z-10 font-mono flex items-start space-x-2.5">
                <HelpCircle className="w-4 h-4 text-legal-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-legal-900">Challenge:</span> Drop the three correct clause cards into their matching contract placeholders. Gray zones indicate zones to be filled. Distractor clauses will fail.
                  <span className="block mt-1 font-semibold text-legal-700 sm:hidden">👉 Tap a card, then tap its corresponding zone to place.</span>
                  <span className="hidden sm:block mt-1 font-semibold text-legal-700">👉 Drag cards onto their corresponding zones in the contract document.</span>
                </div>
              </div>

              {/* The Contract Document */}
              <div className="bg-[#fcfbf7] border border-[#e5dfd3] rounded-xl p-6 md:p-8 font-serif relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] flex-grow mb-6 max-h-[400px] overflow-y-auto">
                <div className="absolute inset-0 bg-paper-grain opacity-[0.03] pointer-events-none" />
                <div className="absolute left-6 top-0 bottom-0 w-px bg-red-800/10" />
                <div className="absolute left-[28px] top-0 bottom-0 w-px bg-red-800/10" />
                
                <div className="pl-10 space-y-6 text-sm text-legal-900 leading-relaxed relative z-10">
                  <div className="text-center font-bold tracking-widest font-mono text-xs text-legal-700 uppercase mb-6 border-b border-legal-200 pb-4">
                    MUTUAL SERVICES & CONFIDENTIALITY AGREEMENT
                  </div>
                  <p className="text-sm italic text-legal-500 font-lora">
                    This Agreement is entered into by and between the parties hereto on this 27th day of June 2026...
                  </p>

                  {/* Zone 1: NDA */}
                  <div 
                    ref={zoneRefs.nda}
                    onClick={() => handleZoneTap("nda")}
                    className={`relative p-5 border rounded-xl transition-all cursor-pointer ${
                      placed.nda 
                        ? "border-transparent bg-white shadow-sm" 
                        : selectedCard && CLAUSES.find(c => c.id === selectedCard)?.zone === "nda"
                        ? "border-legal-500/50 border-dashed bg-legal-100/40 animate-pulse"
                        : "border-dashed border-legal-200/80 bg-white/40 hover:bg-white/80 hover:border-legal-300"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {placed.nda ? (
                        <motion.div 
                          key="nda-filled"
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-legal-100 pb-2">
                            <div className="font-mono text-[11px] font-bold text-legal-700 tracking-wider">
                              SECTION 1. CONFIDENTIALITY
                            </div>
                            <motion.div 
                              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                              className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200/60 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider"
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>Approved</span>
                            </motion.div>
                          </div>
                          <p className="text-[15px] font-serif leading-relaxed text-legal-900 pl-1">
                            <TypewriterText text={CLAUSES.find(c => c.id === placed.nda)?.text || ""} />
                          </p>
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5 }}
                            className="bg-legal-100/50 border border-legal-200 p-3 rounded-lg mt-3"
                          >
                            <p className="text-xs font-sans text-legal-700 font-medium">
                              <span className="font-bold text-legal-900">💡 Mentor Insight:</span> {CLAUSES.find(c => c.id === placed.nda)?.insight}
                            </p>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <div key="nda-empty" className="text-center py-3 text-xs text-legal-400 font-mono">
                          {CLAUSES[0].placeholder}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Zone 2: Indemnity */}
                  <div 
                    ref={zoneRefs.indemnity}
                    onClick={() => handleZoneTap("indemnity")}
                    className={`relative p-5 border rounded-xl transition-all cursor-pointer ${
                      placed.indemnity 
                        ? "border-transparent bg-white shadow-sm" 
                        : selectedCard && CLAUSES.find(c => c.id === selectedCard)?.zone === "indemnity"
                        ? "border-legal-500/50 border-dashed bg-legal-100/40 animate-pulse"
                        : "border-dashed border-legal-200/80 bg-white/40 hover:bg-white/80 hover:border-legal-300"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {placed.indemnity ? (
                        <motion.div 
                          key="indemnity-filled"
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-legal-100 pb-2">
                            <div className="font-mono text-[11px] font-bold text-legal-700 tracking-wider">
                              SECTION 2. LIABILITY & INDEMNIFICATION
                            </div>
                            <motion.div 
                              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                              className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200/60 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider"
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>Approved</span>
                            </motion.div>
                          </div>
                          <p className="text-[15px] font-serif leading-relaxed text-legal-900 pl-1">
                            <TypewriterText text={CLAUSES.find(c => c.id === placed.indemnity)?.text || ""} />
                          </p>
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5 }}
                            className="bg-legal-100/50 border border-legal-200 p-3 rounded-lg mt-3"
                          >
                            <p className="text-xs font-sans text-legal-700 font-medium">
                              <span className="font-bold text-legal-900">💡 Mentor Insight:</span> {CLAUSES.find(c => c.id === placed.indemnity)?.insight}
                            </p>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <div key="indemnity-empty" className="text-center py-3 text-xs text-legal-400 font-mono">
                          {CLAUSES[1].placeholder}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Zone 3: Termination */}
                  <div 
                    ref={zoneRefs.termination}
                    onClick={() => handleZoneTap("termination")}
                    className={`relative p-5 border rounded-xl transition-all cursor-pointer ${
                      placed.termination 
                        ? "border-transparent bg-white shadow-sm" 
                        : selectedCard && CLAUSES.find(c => c.id === selectedCard)?.zone === "termination"
                        ? "border-legal-500/50 border-dashed bg-legal-100/40 animate-pulse"
                        : "border-dashed border-legal-200/80 bg-white/40 hover:bg-white/80 hover:border-legal-300"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {placed.termination ? (
                        <motion.div 
                          key="termination-filled"
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-legal-100 pb-2">
                            <div className="font-mono text-[11px] font-bold text-legal-700 tracking-wider">
                              SECTION 3. TERM & TERMINATION
                            </div>
                            <motion.div 
                              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                              className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200/60 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider"
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>Approved</span>
                            </motion.div>
                          </div>
                          <p className="text-[15px] font-serif leading-relaxed text-legal-900 pl-1">
                            <TypewriterText text={CLAUSES.find(c => c.id === placed.termination)?.text || ""} />
                          </p>
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5 }}
                            className="bg-legal-100/50 border border-legal-200 p-3 rounded-lg mt-3"
                          >
                            <p className="text-xs font-sans text-legal-700 font-medium">
                              <span className="font-bold text-legal-900">💡 Mentor Insight:</span> {CLAUSES.find(c => c.id === placed.termination)?.insight}
                            </p>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <div key="termination-empty" className="text-center py-3 text-xs text-legal-400 font-mono">
                          {CLAUSES[2].placeholder}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-mono flex items-center space-x-2"
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
                {successMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-xs font-mono flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{successMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Draggable Clause Cards Deck */}
              <div className="space-y-3 z-10">
                <div className="font-mono text-xs text-legal-400 font-bold uppercase tracking-wider">
                  Available Clauses ({CLAUSES.filter(c => !Object.values(placed).includes(c.id)).length})
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {CLAUSES.map((clause) => {
                    const isPlaced = Object.values(placed).includes(clause.id);
                    if (isPlaced) return null;

                    const isSelected = selectedCard === clause.id;

                    return (
                      <motion.div
                        key={clause.id}
                        drag
                        dragSnapToOrigin
                        onDragEnd={(e, info) => handleDragEnd(e, info, clause.id)}
                        onClick={() => handleCardTap(clause.id)}
                        whileDrag={{ scale: 1.08, rotate: 2, zIndex: 50, cursor: "grabbing" }}
                        className={`px-4 py-3 rounded-xl border text-[11px] sm:text-xs font-mono cursor-grab shadow-sm transition-all select-none ${
                          isSelected 
                            ? "bg-legal-900 text-white border-legal-800 scale-[1.03] shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-2 ring-legal-500 ring-offset-2 font-bold" 
                            : "bg-white/95 text-legal-700 hover:text-legal-900 border-legal-200/80 hover:border-legal-300 hover:shadow-md hover:bg-white"
                        }`}
                      >
                        <span className="font-bold mr-1.5">{clause.label}</span>
                        <span className="opacity-40 text-[10px] hidden md:inline tracking-wider">[DRAG ME]</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {mounted && (
        <div className="fixed bottom-0 left-0 right-0 bg-legal-900 border-t border-legal-800 text-white py-3.5 px-6 z-50 shadow-lg flex flex-col md:flex-row justify-between items-center gap-3 translate-z-0 will-change-transform">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="flex items-center space-x-2 text-xs font-mono text-legal-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>JULY 2026 COHORT CLOSES IN:</span>
              <span className="text-legal-500 font-bold text-sm tracking-widest min-w-[120px]">
                {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-legal-800" />
            <div className="text-xs font-mono text-legal-300">
              Only <span className="text-legal-500 font-bold text-sm">{seats}</span> seats left
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
            <div className="hidden lg:block text-right font-serif text-xs pr-2 text-legal-300">
              Complete Clause Assembly to unlock
            </div>
            <button 
              onClick={handleEnrollClick}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-serif text-sm font-bold flex items-center justify-center space-x-2 shadow-lg transition-all duration-300 ${
                isCompleted 
                  ? `bg-legal-500 text-legal-900 hover:bg-legal-600 hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer ${isPulsing ? 'animate-pulse' : 'shadow-[0_0_20px_rgba(212,168,67,0.4)] ring-2 ring-legal-500/50'}` 
                  : "bg-legal-800 text-legal-400 border border-legal-700 cursor-not-allowed"
              }`}
            >
              {isCompleted ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>Enroll Now — ₹40,000</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
