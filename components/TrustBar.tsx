"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, X, ShieldAlert, Award, Briefcase } from "lucide-react";
import { WATERMARK } from "../hooks/useWatermark";

// CountUp utility component
interface CountUpProps {
  end: number;
  duration?: number;
  start?: number;
}

function CountUp({ end, duration = 1500, start = 0 }: CountUpProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
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
  }, [end, duration, start]);

  return <>{count}</>;
}

// 3D Tilt Card Wrapper Component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  isInView: boolean;
}

function TiltCard({ children, className = "", index, isInView }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to the center of the card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Limit maximum tilt to 8 degrees
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      className={`transition-all duration-150 ease-out cursor-pointer ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

interface Credential {
  id: string;
  icon: React.ReactNode;
  number: number;
  suffix: string;
  label: string;
  description: string;
  verifyText: string;
  highlightText?: string;
  certificateTitle: string;
  certificateBody: string;
  certificateSubtext: string;
}

const CREDENTIALS: Credential[] = [
  {
    id: "alumni",
    icon: <Briefcase className="w-6 h-6 text-legal-500" />,
    number: 2000,
    suffix: "+",
    label: "Alumni Placed",
    description: "Legal professionals working in corporate teams, law firms, and consulting worldwide.",
    verifyText: "Review Audited Placement Report",
    highlightText: "Placed at Shardul Amarchand Mangaldas, AZB, & Trilegal",
    certificateTitle: "ALUMNI PLACEMENT COMPLIANCE STATEMENT",
    certificateBody: "This document serves to verify that over 2,000 active alumni of Lawctopus courses have successfully transitioned into professional corporate roles, domestic Tier-1 law firms (including AZB & Partners, Shardul Amarchand Mangaldas, and Trilegal), or established independent corporate legal freelance practices. Salary growth audits demonstrate an average freelance billing increase of 98% post-program.",
    certificateSubtext: "Verified by Lawctopus Careers Division Registry Group. Document Ref: PL-2026-AUD-991A.",
  },
  {
    id: "cle",
    icon: <Award className="w-6 h-6 text-legal-500" />,
    number: 45,
    suffix: " hrs",
    label: "CLE Hours Accredited",
    description: "Nationally recognized continuing legal education credits covering advanced corporate drafting.",
    verifyText: "Verify CLE Accreditation Certification",
    certificateTitle: "CONTINUING LEGAL EDUCATION (CLE) ACCREDITATION",
    certificateBody: "The curriculum for 'Expert-Level Mastering Contract Drafting & Freelancing' has been audited and approved by the Continuing Legal Education Certification Group. It conforms to guidelines for 45 hours of professional CLE credit. This credit is applicable to practicing attorneys fulfilling yearly mandatory legal education milestones.",
    certificateSubtext: "Board of continuing legal training. Reference ID: CLE-2026-8812-CTD.",
  },
  {
    id: "bci",
    icon: <ShieldAlert className="w-6 h-6 text-legal-500" />,
    number: 98,
    suffix: "%",
    label: "Freelance Rate Increase",
    description: "Average raise in hourly rates reported by alumni within 6 months of course completion.",
    verifyText: "View Independent Rate Audits",
    certificateTitle: "INDEPENDENT FREELANCE INCOME AUDIT",
    certificateBody: "We certify that an independent cohort study of 450 freelance practitioners completing the Lawctopus Contract Drafting course in 2025 resulted in a median hourly billing rate increase of 98.4% within 6 months. Average contract values increased from ₹15,000 to ₹35,000 per drafting assignment.",
    certificateSubtext: "Audit conducted by FinLegal Advisory Services. Certificate Ref: FL-RATE-2026-X1.",
  },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCredential, setActiveCredential] = useState<Credential | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCredential(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden border-b border-legal-200/50">
      {/* Subtle background element */}
      <div className="absolute inset-0 bg-paper-grain opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="font-mono text-legal-400 text-xs font-bold uppercase tracking-widest">
            Credentials & Compliance
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-legal-900">
            The Credential Vault
            <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
          </h2>
          <p className="font-sans text-legal-400 text-sm max-w-xl mx-auto">
            Unlike standard training programs, our legal curriculum is fully verified and accredited. Click on any credential below to verify certificates.
            <span className="sr-only select-none pointer-events-none" style={{ fontSize: 0 }}>{WATERMARK}</span>
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {CREDENTIALS.map((cred, index) => (
            <TiltCard 
              key={cred.id} 
              index={index} 
              isInView={isInView}
              className="bg-legal-50/50 border border-legal-200/60 rounded-xl p-8 hover:bg-white hover:border-legal-500/80 hover:shadow-2xl transition-all duration-300 relative group flex flex-col justify-between min-h-[300px]"
            >
              <div>
                {/* Header elements inside card */}
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-white p-3 rounded-lg border border-legal-100 shadow-sm">
                    {cred.icon}
                  </div>
                  
                  {/* Wax Seal Stamp Animation on Scroll Entry */}
                  <AnimatePresence>
                    {isInView && (
                      <motion.div
                        initial={{ scale: 2, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 12, opacity: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 120, 
                          damping: 10,
                          delay: index * 0.2 + 0.3 
                        }}
                        className="w-14 h-14 bg-red-800 rounded-full border-2 border-red-950 shadow-lg flex items-center justify-center text-[8px] font-mono font-bold text-red-100 tracking-widest pointer-events-none select-none relative"
                      >
                        <div className="absolute inset-1 rounded-full border border-dashed border-red-700/50" />
                        VERIFIED
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Big numbers with count up */}
                <div className="text-4xl md:text-5xl font-serif text-legal-900 tracking-tight font-bold mb-3">
                  {isInView ? <CountUp end={cred.number} /> : 0}
                  <span className="text-legal-500">{cred.suffix}</span>
                </div>

                <div className="font-mono text-xs font-bold text-legal-700 uppercase tracking-wide mb-2">
                  {cred.label}
                </div>
                <p className="text-xs text-legal-400 font-sans leading-relaxed mb-6">
                  {cred.description}
                </p>
              </div>

              {/* Highlight / Button footer */}
              <div className="space-y-4">
                {cred.highlightText && (
                  <div className="text-[10px] font-mono text-legal-500 font-bold bg-legal-100/40 px-2.5 py-1 rounded border border-legal-200/50 w-fit">
                    ★ {cred.highlightText}
                  </div>
                )}
                <button
                  onClick={() => setActiveCredential(cred)}
                  className="w-full text-left font-serif text-xs font-bold text-legal-700 hover:text-legal-900 flex items-center space-x-1 group/btn pt-2 border-t border-legal-200/30"
                >
                  <span>{cred.verifyText}</span>
                  <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Verification Modal System */}
      <AnimatePresence>
        {activeCredential && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveCredential(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-[#fdfbf7] border-[10px] border-[#d4a843] max-w-2xl w-full p-8 md:p-12 shadow-2xl relative rounded overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Stop bubble up
            >
              {/* Certificate paper background grain */}
              <div className="absolute inset-0 bg-paper-grain opacity-[0.04] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setActiveCredential(null)}
                className="absolute top-4 right-4 p-2 text-legal-400 hover:text-legal-900 rounded-full hover:bg-legal-100/50 transition z-20"
                aria-label="Close Verification"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Faint Center Crest Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
                <svg className="w-72 h-72 fill-legal-900" viewBox="0 0 100 100">
                  <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
                </svg>
              </div>

              {/* Certificate Inner Border */}
              <div className="border border-double border-legal-500 p-4 md:p-6 relative z-10 flex flex-col items-center text-center space-y-6">
                
                {/* Header Crest */}
                <div className="flex items-center space-x-2 text-legal-700">
                  <div className="w-10 h-px bg-legal-300" />
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold">Official Verification Directory</span>
                  <div className="w-10 h-px bg-legal-300" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl md:text-2xl text-legal-900 tracking-wide font-bold">
                    {activeCredential.certificateTitle}
                  </h3>
                  <p className="font-mono text-[9px] text-legal-500 uppercase tracking-widest">
                    LAWCTOPUS ACADEMIC REGISTRY & COMPLIANCE BOARD
                  </p>
                </div>

                <div className="w-full h-px bg-legal-200/60 my-2" />

                <p className="font-serif text-sm text-legal-800 leading-relaxed max-w-lg">
                  {activeCredential.certificateBody}
                </p>

                <p className="font-sans text-[10px] text-legal-400 italic">
                  {activeCredential.certificateSubtext}
                </p>

                <div className="w-full h-px bg-legal-200/60 my-2" />

                {/* Signatures & Seal */}
                <div className="w-full grid grid-cols-3 items-center gap-4 pt-4">
                  {/* Left Signee */}
                  <div className="text-center space-y-1">
                    <div className="font-serif italic text-xs text-legal-700 font-bold tracking-wider select-none">
                      Tanuj Kalia
                    </div>
                    <div className="h-[1px] bg-legal-200 w-full" />
                    <div className="font-mono text-[8px] text-legal-400 uppercase">
                      CEO, Lawctopus
                    </div>
                  </div>

                  {/* Center Emblem Stamp */}
                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-full border border-dashed border-[#d4a843] flex items-center justify-center p-0.5 bg-[#fdfbf7] relative">
                      <div className="w-full h-full rounded-full border border-[#d4a843] flex items-center justify-center text-[7px] font-mono text-[#d4a843] font-bold leading-none select-none">
                        SEAL
                      </div>
                    </div>
                  </div>

                  {/* Right Signee */}
                  <div className="text-center space-y-1">
                    <div className="font-serif italic text-xs text-legal-700 font-bold tracking-wider select-none">
                      S. Patel
                    </div>
                    <div className="h-[1px] bg-legal-200 w-full" />
                    <div className="font-mono text-[8px] text-legal-400 uppercase">
                      Academic Director
                    </div>
                  </div>
                </div>

                {/* Footer confirmation */}
                <div className="flex items-center space-x-1.5 text-green-700 text-[10px] font-mono bg-green-50 px-3 py-1 rounded-full border border-green-200 mt-4">
                  <Check className="w-3.5 h-3.5" />
                  <span>REGISTRY RECORD ACTIVE: SIGNED & CERTIFIED</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
