"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, Calendar, Award, CheckCircle, Video, BookOpen, Clock, User, X, ChevronRight } from "lucide-react";
import { WATERMARK } from "../hooks/useWatermark";

interface Hotspot {
  time: number; // in seconds
  label: string;
  explanation: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    time: 45,
    label: "0:45 // The Indemnity Trap",
    explanation: "Tanuj explains why the phrase 'indemnify, defend, and hold harmless' should be negotiated out of standard freelance contracts. The word 'defend' forces you to pay for the client's lawyers before any court establishes liability.",
  },
  {
    time: 80,
    label: "1:20 // Consequential Damages Waiver",
    explanation: "Without a waiver of consequential damages, you could be sued for the client's lost revenue or marketing expenses if a server goes down due to your code. Always exclude indirect losses.",
  },
  {
    time: 130,
    label: "2:10 // Hard Caps on Liability",
    explanation: "Always link your maximum financial exposure to the value of the contract. If your contract is worth ₹40,000, your total liability must be capped at ₹40,000, preventing bankruptcy over minor breaches.",
  },
];

export default function InstructorDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // in seconds (0 to 180)
  const [activeTab, setActiveTab] = useState<"credentials" | "cases" | "wins">("credentials");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  
  // Cal.com Modal states
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedName, setBookedName] = useState("");
  const [bookedEmail, setBookedEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated video player ticking logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          
          // Check if next second matches a hotspot and has not been cleared
          const hotspot = HOTSPOTS.find(h => h.time === next);
          if (hotspot) {
            setIsPlaying(false);
            setActiveHotspot(hotspot);
          }

          if (next >= 180) {
            setIsPlaying(false);
            return 0; // Loop or stop
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Format time (e.g. 75s -> 1:15)
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // Get active text code typing simulation based on video time
  const getDraftingCode = () => {
    if (currentTime < 45) {
      return `// DRAFTING MUTUAL SERVICE AGREEMENT
SECTION 8. INDEMNITY
8.1 Contractor agrees to indemnify, defend, and hold harmless Client...
█`;
    } else if (currentTime < 80) {
      return `SECTION 8. INDEMNITY (AMENDED BY INSTRUCTOR)
8.1 Subject to Section 9 (Liability Cap), Contractor shall indemnify 
Client only for direct losses caused by gross negligence...
█`;
    } else if (currentTime < 130) {
      return `SECTION 9. LIMITATION OF LIABILITY
9.1 CONTRACTOR'S TOTAL LIABILITY ARISING OUT OF OR IN CONNECTION 
WITH THIS AGREEMENT SHALL BE CAPPED AT FEES PAID...
█`;
    } else {
      return `SECTION 9.2 WAIVER OF CONSEQUENTIAL DAMAGES
IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT, SPECIAL, 
INCIDENTAL, OR CONSEQUENTIAL LOSSES (LOST REVENUES)...
█`;
    }
  };

  const handlePlayPause = () => {
    if (activeHotspot) setActiveHotspot(null);
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentTime(val);
    
    // Auto-clear active hotspots if seeking past them
    setActiveHotspot(null);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !bookedName.trim() || !bookedEmail.trim()) return;

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowCalendar(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setBookedName("");
      setBookedEmail("");
    }, 2500);
  };

  return (
    <section className="py-24 bg-[#0f1f3a] text-white relative overflow-hidden border-b border-legal-950">
      <div className="absolute inset-0 bg-paper-grain opacity-[0.02] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Video Player Mock */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Player Frame */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
              
              {/* Header bar */}
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between font-mono text-[10px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span>LIVE DEMO // CONTRACT_DRAFTING_AMENDMENT.md</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {formatTime(currentTime)} / 3:00</span>
                  <span className="flex items-center"><Volume2 className="w-3.5 h-3.5" /></span>
                </div>
              </div>

              {/* simulated screen video feed */}
              <div className="h-64 md:h-80 flex flex-col items-center justify-center p-6 relative bg-slate-900 font-mono text-xs md:text-sm text-green-400 leading-relaxed overflow-hidden">
                
                {/* Typing console code */}
                <div className="w-full text-left space-y-4 font-mono select-none">
                  <pre className="whitespace-pre-wrap text-slate-300">
                    {getDraftingCode()}
                  </pre>
                </div>

                {/* Hotspot overlay popping up over simulated screen */}
                <AnimatePresence>
                  {activeHotspot && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-4 bg-slate-950/95 border border-legal-500/50 rounded-lg p-6 flex flex-col justify-between z-20 text-white"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-legal-500 font-bold uppercase text-[10px] tracking-wider">
                          <CheckCircle className="w-4 h-4" />
                          <span>PAUSE & EXPLAIN // HOTSPOT</span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-slate-100">
                          {activeHotspot.label}
                        </h4>
                        <p className="font-sans text-xs text-slate-300 leading-relaxed">
                          {activeHotspot.explanation}
                        </p>
                      </div>

                      <button
                        onClick={handlePlayPause}
                        className="bg-legal-500 hover:bg-legal-600 text-legal-900 font-serif font-bold text-xs py-2 px-4 rounded w-fit self-end mt-4 shadow"
                      >
                        Resume Drafting Simulation
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simulated center Play button overlay when paused */}
                {!isPlaying && !activeHotspot && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute p-4 rounded-full bg-legal-500 text-legal-900 shadow-xl hover:scale-110 transition duration-300 z-10"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 fill-current" />
                  </button>
                )}
              </div>

              {/* Player controls */}
              <div className="bg-slate-900 p-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePlayPause}
                    className="text-slate-200 hover:text-white p-1"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  {/* Seek Bar */}
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-grow accent-legal-500 bg-slate-700 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                  
                  <span className="font-mono text-xs text-slate-400">
                    3:00
                  </span>
                </div>

                {/* Hotspot Indicators overlaying timeline */}
                <div className="flex justify-between px-2 sm:px-8 text-[8px] sm:text-[9px] font-mono text-slate-500 pt-1">
                  <span className="hidden sm:inline">0:00</span>
                  <span className={`cursor-pointer hover:text-legal-500 ${currentTime >= 45 ? 'text-legal-500' : ''}`} onClick={() => setCurrentTime(45)}>● Indemnity<span className="hidden sm:inline"> (0:45)</span></span>
                  <span className={`cursor-pointer hover:text-legal-500 ${currentTime >= 80 ? 'text-legal-500' : ''}`} onClick={() => setCurrentTime(80)}>● Waiver<span className="hidden sm:inline"> (1:20)</span></span>
                  <span className={`cursor-pointer hover:text-legal-500 ${currentTime >= 130 ? 'text-legal-500' : ''}`} onClick={() => setCurrentTime(130)}>● Cap<span className="hidden sm:inline"> (2:10)</span></span>
                </div>
              </div>

            </div>

            {/* Credential tabs below player */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-y-2 border-b border-slate-800">
                {(["credentials", "cases", "wins"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2.5 px-3 sm:px-6 font-serif text-xs sm:text-sm transition-all relative ${
                      activeTab === tab
                        ? "text-legal-500 font-bold border-b-2 border-legal-500"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab === "credentials" && "Instructor Credentials"}
                    {tab === "cases" && "Notable Work"}
                    {tab === "wins" && "Cohort Wins"}
                  </button>
                ))}
              </div>

              <div className="min-h-[100px] text-sm text-slate-300 font-sans leading-relaxed">
                {activeTab === "credentials" && (
                  <p>
                    Led by Tanuj Kalia, corporate legal veteran (Ex-AZB & Partners). Over 15 years experience drafting, reviewing, and negotiating contracts for major domestic and international tech firms. Educated over 5,000 legal students.
                  </p>
                )}
                {activeTab === "cases" && (
                  <p>
                    Advised on a $50M cross-border technology licensing agreement. Redlined and restructured master services agreement portfolios for 3 domestic unicorns. Negotiated commercial liability caps against Fortune 500 counsels.
                  </p>
                )}
                {activeTab === "wins" && (
                  <p>
                    Alumni placed at Shardul Amarchand, AZB & Partners, Trilegal, and Khaitan & Co. Freelancing graduates report a median revenue increase of 98.4% within 6 months of program completion.
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Instructor Bio & Cal.com Scheduling CTA */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <span className="font-mono text-legal-500 text-xs font-bold uppercase tracking-widest block">
              INSTRUCTOR AUTHORITY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-100 leading-tight">
              Draft Under a Partner-Level Expert
              <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
            </h2>
            <p className="font-sans text-slate-300 text-sm leading-relaxed">
              Don&apos;t learn from academic professors who have never marked up a commercial tech agreement. Learn directly from Tanuj Kalia, who has negotiated legal risk on behalf of global enterprises.
              <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
            </p>

            <div className="bg-[#172d4a] border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-[#0f1f3a] p-3 rounded-full border border-slate-800">
                  <User className="w-6 h-6 text-legal-500" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-100">Tanuj Kalia</h3>
                  <p className="text-xs text-slate-400 font-mono">FOUNDER & LEGAL ADVISOR</p>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs text-slate-300">
                <div className="flex items-start space-x-2.5">
                  <Award className="w-4 h-4 text-legal-500 flex-shrink-0 mt-0.5" />
                  <span>Ex-AZB & Partners, Tier-1 Law Counsel</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <BookOpen className="w-4 h-4 text-legal-500 flex-shrink-0 mt-0.5" />
                  <span>Reviewed 1,500+ commercial and software agreements</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Video className="w-4 h-4 text-legal-500 flex-shrink-0 mt-0.5" />
                  <span>Drafting live in interactive weekly cohort laboratories</span>
                </div>
              </div>

              <button
                onClick={() => setShowCalendar(true)}
                className="w-full bg-legal-500 hover:bg-legal-600 text-legal-900 font-serif font-bold py-3.5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a 1:1 Consultation</span>
              </button>

              <div className="text-center">
                <span className="text-[10px] font-mono text-legal-300">
                  Or join the July batch — 1 of 12 seats remaining
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Mock Cal.com Modal Scheduler */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white text-legal-900 max-w-xl w-full p-6 md:p-8 shadow-2xl rounded-xl relative overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-paper-grain opacity-[0.03] pointer-events-none" />

              <button
                onClick={() => setShowCalendar(false)}
                className="absolute top-4 right-4 p-2 text-legal-400 hover:text-legal-900 rounded-full hover:bg-legal-50 transition"
                aria-label="Close Scheduling"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-legal-100 pb-4 mb-6">
                <h3 className="font-serif font-bold text-xl text-legal-900 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-legal-500" />
                  <span>Book 1:1 Drafting Review</span>
                </h3>
                <p className="text-xs text-legal-400 font-mono mt-1">CAL.COM INTEGRATION SIMULATOR</p>
              </div>

              {bookingSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-50 text-green-600 border border-green-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-legal-900">Consultation Scheduled!</h4>
                  <p className="text-xs text-legal-400 font-sans max-w-xs mx-auto leading-relaxed">
                    A confirmation email and Cal.com Google Calendar invite have been dispatched to <span className="font-bold text-legal-900">{bookedEmail}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-6">
                  {/* Select Date */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold text-legal-500 uppercase tracking-wider block">
                      Select Available Date (June/July 2026):
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Jun 29", "Jun 30", "Jul 01", "Jul 02"].map((date) => (
                        <button
                          key={date}
                          type="button"
                          onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                          className={`py-2 rounded border text-xs font-mono transition ${
                            selectedDate === date
                              ? "bg-legal-700 text-white border-legal-850 font-bold"
                              : "bg-legal-50 text-legal-700 hover:bg-legal-100 border-legal-200"
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Time Slot */}
                  {selectedDate && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <label className="font-mono text-[10px] font-bold text-legal-500 uppercase tracking-wider block">
                        Select Available Time (IST):
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["10:00 AM", "2:30 PM", "4:00 PM"].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 rounded border text-xs font-mono transition ${
                              selectedTime === time
                                ? "bg-legal-500 text-legal-900 border-legal-600 font-bold"
                                : "bg-legal-50 text-legal-700 hover:bg-legal-100 border-legal-200"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Name and Email */}
                  {selectedTime && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3 pt-2 border-t border-legal-100"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={bookedName}
                          onChange={(e) => setBookedName(e.target.value)}
                          className="w-full bg-legal-50 text-legal-900 border border-legal-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-legal-500 outline-none font-mono"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={bookedEmail}
                          onChange={(e) => setBookedEmail(e.target.value)}
                          className="w-full bg-legal-50 text-legal-900 border border-legal-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-legal-500 outline-none font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-legal-700 hover:bg-legal-900 text-white font-serif font-bold py-3 rounded-lg shadow-md transition duration-200 flex items-center justify-center space-x-1"
                      >
                        <span>Confirm 1:1 Strategy Meeting</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
