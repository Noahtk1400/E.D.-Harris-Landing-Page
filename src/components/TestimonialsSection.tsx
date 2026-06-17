/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Newspaper, Award, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { testimonials, authorTestimonials, publicationMentions } from "../content";
import AnimatedSection from "./AnimatedSection";

interface TestimonialsSectionProps {
  variant?: "full" | "legacy";
}

export default function TestimonialsSection({ variant = "full" }: TestimonialsSectionProps) {
  // Ms Seton is our multi-quote Classroom Spotlight review
  const classroomReview = testimonials[0];
  const quotes = Array.isArray(classroomReview?.quote) 
    ? (classroomReview.quote as string[]) 
    : [classroomReview?.quote as string];
  
  const [internalIdx, setInternalIdx] = useState(0);

  const prevQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalIdx((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  const nextQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalIdx((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  // The peer review testimonial (Jacqueline Friedland)
  const peerReview = authorTestimonials[0];
  // The publication mention review (Faith Dallal)
  const publicationReview = publicationMentions[0];

  return (
    <AnimatedSection 
      id="testimonials-section" 
      className="w-full py-16 md:py-24 px-4 max-w-[1100px] mx-auto relative z-10 scroll-mt-24 select-none animate-fade-in"
    >
      {/* SECTION HEADER */}
      <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
        <span className="font-sans text-[10px] uppercase tracking-widest font-extrabold text-gold leading-none block mb-2.5">
          {variant === "legacy" ? "TESTIMONIALS & REVIEWS" : "LITERARY RECOGNITION & COMMENDATIONS"}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-burgundy tracking-tight">
          {variant === "legacy" ? "What Readers Are Saying" : "Praise & Publications"}
        </h2>
        <div className="h-[2px] w-12 bg-[#e9ddc3] mx-auto mt-4 rounded-full" />
      </div>

      {/* CORE GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
        
        {/* 1. EDITORIAL CLIPPINGS / IN THE PUBLICATIONS */}
        {publicationReview && (
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-burgundy/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gold opacity-80" />
            
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="p-1.5 bg-[#e9ddc3]/30 rounded-lg text-gold">
                  <Newspaper className="h-4 w-4" />
                </div>
                <span className="font-sans text-[10px] font-black uppercase tracking-wider text-burgundy">
                  In The Publications
                </span>
              </div>

              <div className="relative mb-6">
                <span className="absolute -top-4 -left-2 text-4xl font-serif text-rose-pink/20 select-none leading-none">&ldquo;</span>
                <p className="font-serif text-base italic text-near-black/95 leading-relaxed relative z-10 font-normal pl-2.5">
                  {publicationReview.quote}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-burgundy/5 flex flex-col gap-1">
              <span className="font-sans text-xs font-extrabold text-burgundy tracking-wider uppercase">
                {publicationReview.publication}
              </span>
              <span className="font-sans text-[10px] text-gold font-bold uppercase tracking-widest">
                {publicationReview.rating}
              </span>
            </div>
          </div>
        )}

        {/* 2. FELLOW AUTHORS & CONTEMPORARIES */}
        {peerReview && (
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-burgundy/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            {/* Top burgundy accent line */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-burgundy opacity-80" />
            
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="p-1.5 bg-[#e9ddc3]/30 rounded-lg text-burgundy">
                  <Award className="h-4 w-4" />
                </div>
                <span className="font-sans text-[10px] font-black uppercase tracking-wider text-burgundy">
                  Fellow Authors & Contemporaries
                </span>
              </div>

              <div className="relative mb-6">
                <span className="absolute -top-4 -left-2 text-4xl font-serif text-rose-pink/20 select-none leading-none">&ldquo;</span>
                <p className="font-serif text-base italic text-near-black/95 leading-relaxed relative z-10 font-normal pl-2.5">
                  {peerReview.quote}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-burgundy/5 flex flex-col gap-1">
              <span className="font-sans text-xs font-extrabold text-burgundy tracking-wider uppercase">
                {peerReview.authorName}
              </span>
              <span className="font-sans text-[10px] text-gold font-bold uppercase tracking-widest leading-tight">
                {peerReview.role}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* 3. CLASSROOM & ADVOCATE SPOTLIGHT (FULL WIDTH FEATURE WITH WARM ACCENT #e9ddc3) */}
      {classroomReview && (
        <div className="w-full bg-[#e9ddc3] rounded-3xl p-6 sm:p-8 md:p-10 border border-burgundy/15 shadow-md flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-10 relative overflow-hidden">
          {/* Subtle elegant watermarked giant quote in the background */}
          <div className="absolute right-4 bottom-4 text-[140px] font-serif text-burgundy/5 select-none leading-none pointer-events-none transform translate-y-10 translate-x-4">
            ”
          </div>
          
          {/* Left info column */}
          <div className="flex flex-col justify-between md:max-w-[280px] z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/60 mb-4 rounded-full border border-burgundy/5 shadow-sm">
                <Star className="h-3 w-3 text-gold fill-gold" />
                <span className="font-sans text-[9px] font-black text-burgundy uppercase tracking-wider">
                  Classroom Spotlight
                </span>
              </div>
              <h3 className="font-serif text-2xl text-burgundy font-normal tracking-tight mb-2">
                Educator Endorsement
              </h3>
              <p className="font-sans text-[11px] text-near-black/70 leading-relaxed font-normal">
                Read how class circles engage and learn.
              </p>
            </div>

            <div className="mt-6 md:mt-0 pt-4 border-t border-burgundy/10">
              <span className="block font-sans text-xs font-black uppercase text-burgundy tracking-wider">
                {classroomReview.name}
              </span>
              <span className="block font-sans text-[10px] font-bold text-gold uppercase tracking-widest mt-0.5 leading-tight">
                {classroomReview.role}
              </span>
            </div>
          </div>

          {/* Right interactive quote column */}
          <div className="flex-1 flex flex-col justify-between bg-white/75 backdrop-blur-md rounded-2xl p-6 border border-burgundy/10 relative z-10 min-h-[220px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Quote className="h-5 w-5 text-rose-pink/40" />
                <span className="font-mono text-[9px] text-[#805533] font-black bg-[#e9ddc3]/60 px-2.5 py-0.5 rounded-full select-none shadow-sm">
                  {internalIdx + 1} of {quotes.length}
                </span>
              </div>

              <div className="min-h-[110px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={internalIdx}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="font-serif text-sm sm:text-base italic text-near-black/90 leading-relaxed font-normal"
                  >
                    &ldquo;{quotes[internalIdx]}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-burgundy/5 flex items-center justify-end gap-2">
              <button
                onClick={prevQuote}
                className="p-1.5 border border-burgundy/10 rounded-full bg-white hover:bg-burgundy hover:border-burgundy hover:text-white text-burgundy transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
                aria-label="Previous quote"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextQuote}
                className="p-1.5 border border-burgundy/10 rounded-full bg-white hover:bg-burgundy hover:border-burgundy hover:text-white text-burgundy transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
                aria-label="Next quote"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* FELLOW AUTHORS / CALL TO ACTION ACCENT PILL */}
      <div className="mt-10 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-6 py-3 bg-[#e9ddc3]/30 hover:bg-[#e9ddc3]/55 border border-burgundy/5 rounded-2xl transition-all max-w-xl mx-auto shadow-sm">
          <span className="font-sans text-[11px] text-near-black/75 font-semibold">
            Are you a fellow children's author, educator, or reporter?
          </span>
          <Link 
            to="/contact"
            className="font-sans text-[11px] text-burgundy font-extrabold uppercase tracking-wider hover:text-rose-pink flex items-center gap-1 transition-colors focus-visible:outline-2"
          >
            Connect with E.D. Harris
            <span className="text-xs">↗</span>
          </Link>
        </div>
      </div>

    </AnimatedSection>
  );
}
