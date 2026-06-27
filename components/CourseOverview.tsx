"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 6,   suffix: " Months",   label: "Full Programme Duration",    icon: "📅" },
  { value: 55,  suffix: " Sessions",  label: "Live Expert-Led Sessions",   icon: "🎙️" },
  { value: 4,   suffix: " Mentors",   label: "Practising Senior Counsels", icon: "⚖️" },
  { value: 100, suffix: "%",          label: "Online & Cohort-Structured", icon: "🌐" },
];

const PILLS = ["Bar Council Recognised", "CLE Credits", "Certificate on Completion", "Lifetime Community Access", "1:1 Mentorship"];

function AnimatedNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      onAnimationStart={() => {
        if (!ref.current) return;
        const duration = 1500;
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          if (ref.current) ref.current.textContent = String(current);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }}
    >
      0
    </motion.span>
  );
}

export default function CourseOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative bg-[#1e3a5f] overflow-hidden py-24">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #d4a843 39px, #d4a843 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #d4a843 39px, #d4a843 40px)" }}
      />
      {/* Glowing orb (Optimized: Removed blur-3xl for massive performance gain, relying on native radial gradient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #d4a843 0%, transparent 60%)", transform: "translateZ(0)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-legal-500 uppercase font-bold">Course at a Glance</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
            India&apos;s Most Comprehensive<br />
            <span className="text-legal-500">Contract Law Programme</span>
          </h2>
          <p className="font-lora text-white/60 mt-4 text-lg max-w-2xl mx-auto italic">
            A 6-month cohort designed to take you from drafting basics to billing ₹50,000+ per contract.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 hover:border-legal-500/40 transition-colors duration-300"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="font-display text-5xl font-black text-legal-500 mb-1">
                {isInView ? <AnimatedNumber target={stat.value} /> : "0"}
                <span className="text-white/50 text-2xl font-lora font-normal">{stat.suffix}</span>
              </div>
              <div className="font-sans text-xs text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
              {/* hover accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-legal-500/0 group-hover:bg-legal-500/60 transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {PILLS.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="font-mono text-xs px-4 py-2 rounded-full border border-legal-500/30 text-legal-500 bg-legal-500/10"
            >
              ✦ {pill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
