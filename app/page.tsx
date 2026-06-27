"use client";

import HeroSection from "../components/HeroSection";
import TrustBar from "../components/TrustBar";
import CourseOverview from "../components/CourseOverview";
import WhatYouLearn from "../components/WhatYouLearn";
import CurriculumPipeline from "../components/CurriculumPipeline";
import ClauseRiskScanner from "../components/ClauseRiskScanner";
import RedlineGallery from "../components/RedlineGallery";
import InstructorDemo from "../components/InstructorDemo";
import Testimonials from "../components/Testimonials";
import PricingCTA from "../components/PricingCTA";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Mentors from "../components/Mentors";
import CourseStructure from "../components/CourseStructure";
import { BookOpen, Award, FileText, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const COURSE_FEATURES = [
  {
    icon: <BookOpen className="w-6 h-6 text-legal-500" />,
    title: "12-Week Intensive Curriculum",
    description:
      "Deep dive from basic boilerplate structures to sophisticated cross-border acquisition agreements.",
  },
  {
    icon: <FileText className="w-6 h-6 text-legal-500" />,
    title: "Practical Exercises",
    description:
      "Review and redline 15+ actual contracts with real-world flaws and feedback from expert attorneys.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-legal-500" />,
    title: "1-on-1 Mentorship",
    description:
      "Weekly office hours and personalized code/drafting reviews to sharpen your style and precision.",
  },
  {
    icon: <Award className="w-6 h-6 text-legal-500" />,
    title: "Freelancing Blueprint",
    description:
      "Learn how to find high-paying global clients on Upwork, LinkedIn, and compile a winning proposal portfolio.",
  },
];

const CURRICULUM_UNITS = [
  {
    num: "01",
    title: "Anatomy of a Contract",
    topics: ["Preamble & Recitals", "Operative Clauses", "Boilerplate & Representations", "Signature Blocks"],
  },
  {
    num: "02",
    title: "Drafting Commercial Clauses",
    topics: ["Indemnification & Caps", "Limitation of Liability", "IP Rights Allocation", "Termination Triggers"],
  },
  {
    num: "03",
    title: "Litigation-Proofing Contracts",
    topics: ["Dispute Resolution Paths", "Governing Law Choice", "Arbitration Clauses", "Force Majeure Drafting"],
  },
  {
    num: "04",
    title: "Freelancing & Client Acquisition",
    topics: ["Structuring Proposals", "Setting Hourly/Flat Rates", "Upwork Profile Mastery", "Managing Legal Risk"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-legal-50">
      {/* Background paper texture overlay */}
      <div className="absolute inset-0 bg-paper-grain opacity-[0.03] pointer-events-none z-0" />

      {/* Hero Section — anchor: section-hero */}
      <section id="section-hero">
        <HeroSection />
      </section>

      {/* Trust Bar — anchor: section-trust */}
      <section id="section-trust">
        <TrustBar />
      </section>

      {/* Course Overview Stats — anchor: section-overview */}
      <section id="section-overview">
        <CourseOverview />
      </section>

      {/* What You Learn — anchor: section-skills */}
      <section id="section-skills">
        <WhatYouLearn />
      </section>

      {/* Curriculum Pipeline */}
      <section id="section-pipeline">
        <CurriculumPipeline />
      </section>

      {/* Detailed Course Structure — anchor: section-curriculum */}
      <CourseStructure />

      {/* Clause Risk Scanner — anchor: section-tool */}
      <section id="section-tool">
        <ClauseRiskScanner />
      </section>

      {/* Redline Gallery — anchor: section-outcomes */}
      <section id="section-outcomes">
        <RedlineGallery />
      </section>

      {/* Instructor Demo */}
      <section id="section-experts">
        <InstructorDemo />
      </section>

      {/* Mentors / Faculty */}
      <Mentors />

      {/* Testimonials — anchor: section-testimonials */}
      <section id="section-testimonials">
        <Testimonials />
      </section>

      {/* Pricing CTA — anchor: section-pricing */}
      <section id="section-pricing">
        <PricingCTA />
      </section>

      {/* FAQ — anchor: section-faq */}
      <section id="section-faq">
        <FAQ />
      </section>

      {/* Master Section / Academic Details — anchor: section-enroll */}
      <section
        id="section-enroll"
        className="relative z-10 py-24 border-t border-legal-200/60 bg-white"
      >
        <div className="absolute inset-0 bg-paper-grain opacity-[0.02] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl font-black text-legal-900 leading-[1.1] tracking-tight"
            >
              You just drafted 3 contract clauses. <br />
              <span className="text-legal-500 italic font-lora font-normal">Now master the rest.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-lora text-legal-600 text-lg italic tracking-wide"
            >
              Assembling clauses is just the beginning. Our expert-level course gives you the
              diagnostic skills and client-facing mastery required to charge premium rates.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {COURSE_FEATURES.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-legal-50 border border-legal-200/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="mb-4 bg-white p-3 rounded-lg w-fit shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="font-serif font-bold text-legal-900 text-lg mb-2">{feat.title}</h3>
                <p className="font-sans text-legal-400 text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Deleted old curriculum units, moved to dedicated CourseStructure component */}
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
