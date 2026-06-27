"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const DEADLINE = new Date("2026-06-30T23:59:00+05:30");

const FAQS = [
  { q: "Who is this course for?", a: "Law students (3rd year+), junior associates, and practising lawyers who want to develop commercial drafting skills and build an independent freelance practice." },
  { q: "What is the course duration?", a: "6 months, from July 1 to December 31, 2026. It includes 55 live sessions scheduled over weekends and a few weekday evenings." },
  { q: "Is there any prerequisite?", a: "No. Basic familiarity with contract law concepts is helpful but we start from the ground up with fundamentals before advancing to complex deal structures." },
  { q: "Will I receive a certificate?", a: "Yes. Lawctopus Law School issues a digitally verifiable certificate upon successful completion of assessments and minimum session attendance." },
  { q: "What is the fee structure?", a: "Early-bird fee is ₹15,000 (valid until June 30). Standard fee post-deadline is ₹20,000. EMI options available via Razorpay at ₹5,000/month." },
  { q: "Are sessions recorded?", a: "Yes. All 55 live sessions are recorded and available for 12 months post-completion for enrolled participants." },
  { q: "Can I get a refund?", a: "A full refund is available within 7 days of registration if you have attended fewer than 3 sessions. After that, a 50% refund is issued up to 30 days." },
  { q: "How do I enrol?", a: "Click 'Enrol Now', complete the registration form, and pay the fee via Razorpay. You will receive an onboarding email within 24 hours." },
];

function useCountdown(deadline: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, deadline.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);
  return time;
}

function AccordionItem({ q, a, index, isInView }: { q: string; a: string; index: number; isInView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07 }}
      className="border border-legal-200/60 rounded-xl overflow-hidden bg-white will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-legal-50/60 transition-colors"
      >
        <span className="font-display font-bold text-legal-900 text-base pr-4">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${open ? "bg-legal-500 border-legal-500 rotate-45" : "border-legal-300 group-hover:border-legal-500"}`}>
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
            <path d="M7 1v12M1 7h12" stroke={open ? "#fff" : "#9a8768"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className={open ? "block" : "hidden"}>
        <div className="pt-2">
          <p className="font-lora text-legal-600 text-sm leading-relaxed px-6 pb-5">
            {a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CountdownBanner({ isInView }: { isInView: boolean }) {
  const time = useCountdown(DEADLINE);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.2 }}
      className="mb-12 p-6 rounded-2xl bg-legal-900 border border-legal-700 text-center will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="font-mono text-xs text-legal-500 uppercase tracking-widest mb-3">⚡ Early-Bird Ends In</div>
      <div className="flex justify-center gap-6">
        {[
          { val: time.d, label: "Days" },
          { val: time.h, label: "Hours" },
          { val: time.m, label: "Mins" },
          { val: time.s, label: "Secs" },
        ].map(({ val, label }) => (
          <div key={label} className="text-center">
            <div className="font-display text-4xl font-black text-white tabular-nums w-14">{String(val).padStart(2, "0")}</div>
            <div className="font-mono text-[10px] text-legal-500 uppercase tracking-widest mt-1">{label}</div>
          </div>
        ))}
      </div>
      <p className="font-lora text-white/50 text-sm mt-4 italic">Register by June 30 at ₹15,000. Standard price ₹20,000 after.</p>
    </motion.div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} id="section-faq" className="relative bg-[#f8f6f1] py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #1e3a5f 0%, transparent 60%), radial-gradient(circle at 70% 50%, #d4a843 0%, transparent 60%)", transform: "translateZ(0)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-legal-500 uppercase font-bold">FAQ</span>
          <h2 className="font-display text-5xl font-black text-legal-900 mt-3 tracking-tight leading-none">
            Questions? <span className="text-legal-500 italic">Answered.</span>
          </h2>
          <p className="font-lora text-legal-500 mt-4 text-lg italic tracking-wide">Everything you need to decide with confidence.</p>
        </motion.div>

        {/* Deadline countdown banner */}
        <CountdownBanner isInView={isInView} />

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <AccordionItem key={item.q} q={item.q} a={item.a} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
