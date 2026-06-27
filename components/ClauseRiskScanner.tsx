"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon, Mail, Sparkles, Check, ArrowRight, FileText } from "lucide-react";
import { WATERMARK } from "../hooks/useWatermark";

interface SampleClause {
  title: string;
  category: string;
  clause: string;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  riskColor: string;
  leverage: number;
  missing: string[];
  improved: string;
  redlines: string[];
}

const SAMPLE_CLAUSES: SampleClause[] = [
  {
    title: "Uncapped Service Liability",
    category: "Liability / Indemnity",
    clause: "The Contractor shall indemnify, defend, and hold harmless the Client from and against any and all claims, actions, suits, demands, damages, liabilities, obligations, losses, settlements, judgments, costs, and expenses arising out of or relating to the services performed under this Agreement, without limitation.",
    riskLevel: "HIGH",
    riskColor: "text-red-600 bg-red-50 border-red-200",
    leverage: 2,
    missing: [
      "No cap on aggregate financial liability.",
      "Lack of reciprocal (mutual) indemnification protections.",
      "No waiver of indirect, consequential, or punitive damages.",
    ],
    improved: "Contractor's aggregate liability under this Agreement shall be strictly limited to the total fees paid to Contractor during the twelve (12) months preceding the claim. In no event shall either party be liable for any indirect, incidental, or consequential damages.",
    redlines: [
      "Struck down 'without limitation'.",
      "Added mutual waiver of consequential damages.",
      "Capped exposure to 12-month trailing fees.",
    ],
  },
  {
    title: "Immediate IP Assignment",
    category: "Intellectual Property",
    clause: "The Vendor agrees that all deliverables, work product, source code, designs, and documentation created under this Agreement shall be considered 'works made for hire' and all right, title, and interest shall vest immediately and exclusively in the Customer upon creation.",
    riskLevel: "HIGH",
    riskColor: "text-red-600 bg-red-50 border-red-200",
    leverage: 3,
    missing: [
      "IP transfers before payment is received.",
      "No explicit reservation of Vendor's pre-existing intellectual property.",
      "Absence of a license back to the Vendor for standard utility scripts.",
    ],
    improved: "Upon receipt of full payment by Customer, Vendor hereby assigns all intellectual property rights in the final deliverables. Vendor retains exclusive ownership of all pre-existing tools, code libraries, and materials utilized in the performance of services.",
    redlines: [
      "Conditioned transfer 'upon receipt of full payment'.",
      "Carved out Vendor's pre-existing proprietary code libraries.",
      "Specified transfer applies only to 'final deliverables'.",
    ],
  },
  {
    title: "Convenience Termination",
    category: "Term / Termination",
    clause: "The Client may, at its sole discretion, terminate this Agreement for convenience at any time, in whole or in part, by providing written notice to the Provider. Upon receipt of notice, Provider shall immediately cease all drafting work.",
    riskLevel: "MEDIUM",
    riskColor: "text-amber-600 bg-amber-50 border-amber-200",
    leverage: 4,
    missing: [
      "No minimum notice period (immediate termination risk).",
      "Lack of payment guarantees for work-in-progress.",
      "No demobilization fee or termination penalty to protect cash flow.",
    ],
    improved: "Client may terminate this Agreement for convenience upon thirty (30) days prior written notice. In the event of such termination, Client shall pay Provider for all services rendered up to the effective date of termination, plus a demobilization fee equal to 15% of the remaining project fee.",
    redlines: [
      "Implemented a 30-day notice cooling-off period.",
      "Guaranteed payment for all services rendered.",
      "Added a 15% demobilization fee penalty.",
    ],
  },
];

export default function ClauseRiskScanner() {
  const [inputText, setInputText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<SampleClause | null>(null);
  const [showGate, setShowGate] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const selectSample = (sample: SampleClause) => {
    setInputText(sample.clause);
    setScanResult(null);
    setShowGate(false);
  };

  const handleScan = () => {
    if (!inputText.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    // Simulate AI Scan
    setTimeout(() => {
      // Find matching sample clause or fallback to first one if custom input
      const matched = SAMPLE_CLAUSES.find(s => inputText.toLowerCase().includes(s.title.toLowerCase().split(" ")[0])) || SAMPLE_CLAUSES[0];
      
      setScanResult(matched);
      setIsScanning(false);
      setShowGate(true); // Show lead capture gate immediately after scan
    }, 1500);
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadEmail.trim()) return;

    setLeadSubmitted(true);
    
    // Simulate short delay then redirect to WhatsApp
    setTimeout(() => {
      window.open("https://chat.whatsapp.com/invite/lawctopus-contract-drafting-2026", "_blank");
      setShowGate(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-legal-50 border-b border-legal-200/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-paper-grain opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1 bg-red-100 text-red-800 border border-red-200 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
            <AlertOctagon className="w-3 h-3" />
            <span>Free Contract Health Check</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-legal-900">
            Clause Risk Scanner
            <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
          </h2>
          <p className="font-sans text-legal-400 text-sm max-w-xl mx-auto">
            Paste a clause below or select one of our pre-built samples to run our simulated AI diagnostics for immediate risk level, leverage, and missing protections.
            <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
          </p>
        </div>

        {/* Scanner Widget Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Console */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border-2 border-legal-200 rounded-xl p-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-xs text-legal-700 font-bold uppercase tracking-wider">
                    Select a Risky Contract Clause:
                  </label>
                </div>
                
                <div className="grid grid-cols-3 gap-2.5">
                  {SAMPLE_CLAUSES.map((sample) => (
                    <button
                      key={sample.title}
                      onClick={() => selectSample(sample)}
                      className={`p-2.5 rounded-lg border text-left text-[11px] font-mono transition-all duration-200 ${
                        inputText === sample.clause
                          ? "bg-legal-700 text-white border-legal-800 font-bold shadow-md"
                          : "bg-legal-50 text-legal-700 hover:text-legal-900 border-legal-200 hover:border-legal-300"
                      }`}
                    >
                      <div className="font-bold border-b border-current/20 pb-1 mb-1 truncate">
                        {sample.title}
                      </div>
                      <span className="opacity-75">{sample.category}</span>
                    </button>
                  ))}
                </div>

                <div className="w-full h-px bg-legal-100" />

                <div className="space-y-2">
                  <label className="font-mono text-xs text-legal-400 font-bold uppercase tracking-wider block">
                    Or Paste Custom Clause Draft:
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste liability, IP, indemnification, or termination terms here..."
                    className="w-full h-44 bg-legal-50 border border-legal-200 rounded-lg p-4 font-serif text-sm focus:ring-1 focus:ring-legal-500 outline-none resize-none leading-relaxed text-legal-900"
                  />
                </div>

                <button
                  onClick={handleScan}
                  disabled={isScanning || !inputText.trim()}
                  className={`w-full py-4 rounded-lg font-serif font-bold text-white shadow-lg transition duration-200 flex items-center justify-center space-x-2 border border-legal-800 ${
                    isScanning || !inputText.trim()
                      ? "bg-legal-200 cursor-not-allowed"
                      : "bg-legal-700 hover:bg-legal-900 transform hover:-translate-y-0.5"
                  }`}
                >
                  {isScanning ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="font-mono text-xs">Simulating Risk Audit...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-legal-500" />
                      <span>Diagnostic Scan for Risks</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Output Diagnostic Terminal */}
          <div className="lg:col-span-6 relative min-h-[460px]">
            <AnimatePresence mode="wait">
              {isScanning ? (
                /* Scanning placeholder */
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border-2 border-legal-200 rounded-xl p-8 shadow-xl flex flex-col items-center justify-center absolute inset-0 text-center space-y-4"
                >
                  <Sparkles className="w-12 h-12 text-legal-500 animate-spin" />
                  <h3 className="font-serif text-lg font-bold text-legal-900">Scanning Clause Registry...</h3>
                  <p className="text-xs text-legal-400 font-mono max-w-xs">
                    Cross-referencing liability provisions against market standards and precedent library.
                  </p>
                </motion.div>
              ) : scanResult ? (
                /* Diagnostic Report Memo */
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#fcfbf9] border-2 border-legal-200 rounded-xl p-6 md:p-8 shadow-2xl relative flex flex-col justify-between"
                >
                  {/* Memo Header */}
                  <div className="space-y-4 font-serif text-sm">
                    <div className="border-b border-double border-legal-200 pb-4">
                      <div className="text-center font-bold font-mono text-[10px] tracking-widest text-legal-500 uppercase mb-2">
                        MEMORANDUM OF RISK ASSESSMENT
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-legal-700">
                        <div><span className="font-bold text-legal-900">DATE:</span> June 27, 2026</div>
                        <div><span className="font-bold text-legal-900">TO:</span> Legal Advisory Desk</div>
                        <div><span className="font-bold text-legal-900">DEPT:</span> Contract Review</div>
                        <div><span className="font-bold text-legal-900">REF:</span> MOCK-SCAN-01X</div>
                      </div>
                    </div>

                    {/* Results Details */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-legal-400 uppercase">RISK LEVEL:</span>
                        <span className={`font-mono text-xs font-bold px-3 py-1 rounded border uppercase ${scanResult.riskColor}`}>
                          ⚠ {scanResult.riskLevel} RISK
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-legal-400 uppercase">NEGOTIATION LEVERAGE:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-legal-700">{scanResult.leverage}/10</span>
                          <div className="w-24 h-2 bg-legal-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-600 rounded-full" 
                              style={{ width: `${scanResult.leverage * 10}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Missing protections */}
                      <div className="space-y-2">
                        <span className="block font-mono text-[10px] font-bold text-legal-400 uppercase">MISSING PROTECTIONS (REDLINES):</span>
                        <ul className="space-y-1.5 pl-4 list-disc text-xs text-red-600 font-sans font-medium">
                          {scanResult.missing.map((miss, i) => (
                            <li key={i}>{miss}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Before/After comparison teaser */}
                      <div className="bg-white border border-legal-200 rounded-lg p-4 space-y-3 shadow-inner">
                        <span className="block font-mono text-[9px] text-legal-500 font-bold uppercase tracking-wider">
                          ★ ALUMNI PRO REDLINE FIX:
                        </span>
                        <p className="text-xs italic text-legal-400 font-serif leading-relaxed line-through decoration-red-400/40">
                          {scanResult.clause}
                        </p>
                        <p className="text-xs font-sans text-legal-900 font-medium bg-legal-50/50 p-2.5 rounded border-l-2 border-legal-500 leading-relaxed">
                          {scanResult.improved}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {scanResult.redlines.map((rl, i) => (
                            <span key={i} className="text-[9px] font-mono bg-legal-100 text-legal-700 px-2 py-0.5 rounded border border-legal-200">
                              ✓ {rl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lead Magnet Gate overlay */}
                  {showGate && (
                    <div className="absolute inset-0 bg-[#fcfbf9]/95 backdrop-blur-sm rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-5 z-20">
                      <div className="bg-legal-100 p-3 rounded-full text-legal-700 shadow-sm border border-legal-200/50 animate-bounce">
                        <Sparkles className="w-6 h-6 text-legal-500" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-serif font-bold text-xl text-legal-900">Unlock Full 10-Point Analysis Report</h4>
                        <p className="text-xs text-legal-400 max-w-sm font-sans leading-normal">
                          Submit your email to unlock the complete contract diagnostic dossier, including liability cap worksheets, negotiation transcripts, and direct templates.
                        </p>
                      </div>

                      {leadSubmitted ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="space-y-4 text-center"
                        >
                          <div className="flex items-center justify-center space-x-1.5 text-green-700 text-xs font-mono font-bold bg-green-50 px-4 py-2 rounded-full border border-green-200">
                            <Check className="w-4 h-4" />
                            <span>ANALYSIS SENT! REDIRECTING...</span>
                          </div>
                          <p className="text-[10px] text-legal-400 font-mono">
                            If not redirected, click below to join the WhatsApp Cohort group.
                          </p>
                          <a 
                            href="https://chat.whatsapp.com/invite/lawctopus-contract-drafting-2026"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white font-mono text-xs font-bold px-4 py-2.5 rounded shadow"
                          >
                            <span>Join Cohort WhatsApp Group</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleGateSubmit} className="w-full max-w-xs space-y-2.5">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            className="w-full bg-white text-legal-900 border border-legal-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-legal-500 outline-none font-mono"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Professional Email Address"
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            className="w-full bg-white text-legal-900 border border-legal-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-legal-500 outline-none font-mono"
                          />
                          
                          <button
                            type="submit"
                            className="w-full bg-legal-700 hover:bg-legal-900 text-white font-serif font-bold py-2.5 rounded text-xs transition duration-200 flex items-center justify-center space-x-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Unlock 10-Point Analysis</span>
                          </button>

                          <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-legal-200"></div>
                            <span className="flex-shrink mx-3 text-[9px] font-mono text-legal-300">OR REGISTER VIA</span>
                            <div className="flex-grow border-t border-legal-200"></div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => { setLeadName("Google Professional"); setLeadEmail("user@gmail.com"); setLeadSubmitted(true); setTimeout(() => window.open("https://chat.whatsapp.com/invite/lawctopus-contract-drafting-2026", "_blank"), 1000); }}
                              className="flex items-center justify-center space-x-1.5 bg-white hover:bg-legal-50 border border-legal-200 rounded py-1.5 text-[10px] font-mono text-legal-700 transition"
                            >
                              <svg className="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.513 0-6.386-2.873-6.386-6.386s2.873-6.386 6.386-6.386c1.697 0 3.237.669 4.397 1.76l3.053-3.053C18.66 1.79 15.656 1 12.24 1 5.922 1 1 5.922 1 12.24s4.922 11.24 11.24 11.24c5.897 0 10.87-4.243 10.87-10.285 0-.75-.083-1.405-.224-1.91H12.24z" />
                              </svg>
                              <span>Google</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => { setLeadName("LinkedIn Professional"); setLeadEmail("user@linkedin.com"); setLeadSubmitted(true); setTimeout(() => window.open("https://chat.whatsapp.com/invite/lawctopus-contract-drafting-2026", "_blank"), 1000); }}
                              className="flex items-center justify-center space-x-1.5 bg-white hover:bg-legal-50 border border-legal-200 rounded py-1.5 text-[10px] font-mono text-legal-700 transition"
                            >
                              <svg className="w-3 h-3 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                              <span>LinkedIn</span>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Initial placeholder */
                <motion.div
                  key="initial"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-legal-200 border-dashed rounded-xl p-8 shadow-xl flex flex-col items-center justify-center absolute inset-0 text-center space-y-4"
                >
                  <FileText className="w-12 h-12 text-legal-200" />
                  <h3 className="font-serif text-lg font-bold text-legal-900">Awaiting Clause Input</h3>
                  <p className="text-xs text-legal-400 font-mono max-w-xs">
                    Select a sample card or paste your draft, then click &quot;Diagnostic Scan&quot; to run health check.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
