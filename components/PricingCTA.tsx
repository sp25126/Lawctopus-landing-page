"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const INCLUSIONS = [
  { icon: "🎙️", label: "55 Live Sessions" },
  { icon: "📁", label: "30+ Contract Templates" },
  { icon: "🔴", label: "15 Redlining Assignments" },
  { icon: "🧑‍⚖️", label: "1:1 Mentorship Calls" },
  { icon: "🏅", label: "Verifiable Certificate" },
  { icon: "🌐", label: "Alumni Network Access" },
  { icon: "📞", label: "WhatsApp Cohort Group" },
  { icon: "♾️", label: "12-Month Recording Access" },
];

export default function PricingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleEnrol = () => {
    window.open("https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20enrol%20in%20the%20Lawctopus%20Contract%20Drafting%20course.", "_blank");
  };

  return (
    <section ref={sectionRef} id="section-pricing" className="relative bg-[#f8f6f1] py-24 overflow-hidden">
      {/* Watermark diagonal text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <div className="font-display text-[18vw] font-black text-legal-900/[0.025] whitespace-nowrap -rotate-12">
          ENROL NOW
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-legal-500 uppercase font-bold">Cohort Pricing</span>
          <h2 className="font-display text-5xl md:text-6xl font-black text-legal-900 mt-3 tracking-tight leading-[1.05]">
            One Investment.<br />
            <span className="text-legal-500">Lifetime Returns.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* Early bird card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="relative bg-legal-900 rounded-3xl p-8 border border-legal-700 overflow-hidden"
          >
            {/* Shimmer border top */}
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #d4a843, transparent)" }} />

            <div className="font-mono text-xs text-legal-500 uppercase tracking-widest mb-2">Early Bird — Ends June 30</div>
            <div className="flex items-end gap-3 mb-1">
              <span className="font-display text-6xl font-black text-white">₹15,000</span>
              <span className="font-lora text-white/40 text-lg mb-2 line-through">₹20,000</span>
            </div>
            <div className="font-lora text-white/50 text-sm italic mb-8">EMI available: ₹5,000 × 3 months via Razorpay</div>

            {/* Inclusions */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {INCLUSIONS.map((item) => (
                <div key={item.label} className="flex items-center gap-2 font-sans text-xs text-white/70">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnrol}
              className="w-full py-4 rounded-xl font-display font-bold text-lg text-legal-900 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #d4a843, #e8c870)" }}
            >
              <span className="relative z-10">Enrol Now — July 1 Cohort →</span>
            </motion.button>
            <p className="font-mono text-center text-[10px] text-white/30 mt-3 uppercase tracking-widest">
              Cohort starts July 1, 2026 · Only 30 seats
            </p>
          </motion.div>

          {/* What&apos;s included detail + guarantee */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Seat urgency */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-mono text-xs text-red-600 uppercase tracking-widest font-bold">Limited Seats</span>
              </div>
              <p className="font-lora text-red-700 text-sm leading-relaxed">
                Only <strong>30 participants</strong> per cohort to maintain mentor-to-student ratio. The July 2026 cohort is <strong>68% filled</strong> as of today.
              </p>
              {/* Fake progress bar */}
              <div className="mt-4 h-2 bg-red-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 0.68 } : {}}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  style={{ originX: 0 }}
                  className="h-full bg-red-500 rounded-full will-change-transform"
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-red-500 mt-1">
                <span>0 seats</span><span>68% filled</span><span>30 seats</span>
              </div>
            </div>

            {/* Scholarship */}
            <div className="bg-legal-50 border border-legal-200 rounded-2xl p-5">
              <div className="font-display font-bold text-legal-900 text-lg mb-1">🎓 Merit Scholarship Available</div>
              <p className="font-lora text-legal-600 text-sm leading-relaxed">
                Students from Tier 3 law schools or with demonstrated financial need can apply for a partial scholarship covering up to 30% of the fee. Email <span className="font-mono text-legal-500">admissions@lawctopus.com</span>.
              </p>
            </div>

            {/* Refund guarantee */}
            <div className="bg-white border border-legal-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">🛡️</div>
              <div>
                <div className="font-display font-bold text-legal-900 text-lg mb-1">7-Day Refund Guarantee</div>
                <p className="font-lora text-legal-500 text-sm leading-relaxed">
                  Attend the first 3 sessions. If it&apos;s not the most practical legal course you&apos;ve taken, get a full refund. No questions asked.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
