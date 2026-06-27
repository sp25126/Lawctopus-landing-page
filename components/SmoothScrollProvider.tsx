"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

gsap.registerPlugin(ScrollTrigger);

// --- Context so any child can call lenis.scrollTo() ---
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,            // Lower value = smoother, more cinematic floating effect
      smoothWheel: true,
      wheelMultiplier: 1.2,  // Make mouse wheels slightly more responsive to compensate for the extreme smoothness
      infinite: false,
      touchMultiplier: 2,    // Smooth out trackpad/touch interactions
    });

    lenisRef.current = lenis;
    // Expose globally so Navigation and other components can call scrollTo
    window.__lenis = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker so both share the same animation loop
    const rafCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCb);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
