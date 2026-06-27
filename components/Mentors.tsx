"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const MENTORS = [
  { name: "Shashank Sardesai", role: "Partner, EverTrust Legal", image: "/image.png" },
  { name: "Akanksha Mishra", role: "Senior Corporate Counsel", image: "/image copy.png" },
  { name: "Pranjal Doshi", role: "LLM, Cambridge", image: "/image copy 2.png" },
  { name: "Arunima Jha", role: "Legal Counsel, K Raheja", image: "/image copy 3.png" },
  { name: "Jaibatruka Mohanta", role: "Advocate", image: "/image copy 4.png" },
  { name: "H. B Keshava", role: "Baskaran and Associates", image: "/image copy 5.png" },
  { name: "Gourav Mohanty", role: "Disputes Partner", image: "/image copy 6.png" },
  { name: "Anup Menon V", role: "Legal Expert", image: "/image copy 7.png" },
  { name: "Tanuj Kalia", role: "CEO, Lawctopus", image: "/image copy 8.png" },
  { name: "Bhumesh Verma", role: "Legal Expert", image: "/image copy 9.png" },
  { name: "Shayonee Dasgupta", role: "Legal Expert", image: "/image copy 10.png" },
  { name: "Debanshu Khettry", role: "Legal Expert", image: "/image copy 11.png" },
];

function MentorCard({ mentor, index }: { mentor: typeof MENTORS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse tracking
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Rotate the card itself
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Translate the image to create parallax
  const imgTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const imgTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  // Translate the badge more extremely for higher depth
  const badgeTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-25px", "25px"]);
  const badgeTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-25px", "25px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="relative w-full aspect-[4/5] rounded-2xl cursor-pointer group will-change-transform z-10 hover:z-50"
    >
      {/* Background card with matching orange/yellow to blend with the images */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500"
        style={{ 
          transform: "translateZ(-20px)",
          // A solid orange to match the image backgrounds, allowing mix-blend-mode to hide the box
          backgroundColor: "#fca311"
        }}
      />
      
      {/* Mentor Image with pop-out scale and parallax translate */}
      <motion.div 
        className="absolute inset-0 flex items-end justify-center pointer-events-none"
        style={{ 
          x: imgTranslateX, 
          y: imgTranslateY,
          transform: "translateZ(40px)"
        }}
      >
        <img 
          src={mentor.image} 
          alt={mentor.name}
          className="w-[125%] h-auto max-h-[115%] object-cover object-bottom transition-transform duration-500 group-hover:scale-[1.15] group-hover:-translate-y-6 drop-shadow-2xl"
        />
      </motion.div>

      {/* Info Badge */}
      <motion.div 
        className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 text-center shadow-2xl pointer-events-none transition-all duration-500 group-hover:bg-white"
        style={{ 
          x: badgeTranslateX,
          y: badgeTranslateY,
          transform: "translateZ(80px)" 
        }}
      >
        <h3 className="font-display font-bold text-legal-900 text-lg leading-tight">{mentor.name}</h3>
        <p className="font-mono text-[10px] uppercase tracking-widest text-legal-500 mt-1">{mentor.role}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Mentors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} id="section-faculty" className="relative py-32 bg-[#0a1628] overflow-hidden">
      {/* Dark background for contrast, making the orange pop intensely */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #d4a843 0%, transparent 60%)", transform: "translateZ(0)" }}
      />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-legal-500 uppercase font-bold">The Faculty</span>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white mt-4 tracking-tight leading-[1.05]">
            Learn from those <br />
            <span className="text-legal-500">who draft the deals.</span>
          </h2>
          <p className="font-lora text-white/50 mt-6 text-xl italic tracking-wide max-w-2xl mx-auto">
            Our mentors are active partners and senior counsel who review real commercial contracts daily.
          </p>
        </motion.div>

        {/* Using a tight grid layout with negative margins or flex for organic staggering if needed, but a clean grid works best here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MENTORS.map((mentor, i) => (
            <MentorCard key={mentor.name} mentor={mentor} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
