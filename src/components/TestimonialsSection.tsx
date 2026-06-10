/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Newspaper, MessageSquare, PenTool, Award, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { testimonials, authorTestimonials, publicationMentions } from "../content";
import AnimatedSection from "./AnimatedSection";

interface TestimonialsSectionProps {
  variant?: "full" | "legacy";
}

export default function TestimonialsSection({ variant = "full" }: TestimonialsSectionProps) {
  const [activeTab, setActiveTab] = useState<"press-and-peers" | "readers">(
    variant === "legacy" ? "readers" : "press-and-peers"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pubIndex, setPubIndex] = useState(0);
  const [peerIndex, setPeerIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePubPrev = () => {
    setPubIndex((prev) => (prev === 0 ? publicationMentions.length - 1 : prev - 1));
  };

  const handlePubNext = () => {
    setPubIndex((prev) => (prev === publicationMentions.length - 1 ? 0 : prev + 1));
  };

  const handlePeerPrev = () => {
    setPeerIndex((prev) => (prev === 0 ? authorTestimonials.length - 1 : prev - 1));
  };

  const handlePeerNext = () => {
    setPeerIndex((prev) => (prev === authorTestimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatedSection 
      id="testimonials-section" 
      className="w-full py-20 px-4 max-w-[1100px] mx-auto relative z-10 scroll-mt-24"
    >
      {/* SECTION HEADER */}
      <div className="text-center mb-10 max-w-2xl mx-auto px-4">
        <span className="font-sans text-[10px] uppercase tracking-widest font-extrabold text-gold leading-none block mb-2">
          {variant === "legacy" ? "TESTIMONIALS & REVIEWS" : "LITERARY RECOGNITION & COMMENDATIONS"}
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-burgundy tracking-tight">
          {variant === "legacy" ? "What Readers Are Saying" : "Praise & Publications"}
        </h2>
        {variant !== "legacy" && (
          <p className="font-sans text-xs text-near-black/75 mt-3 leading-relaxed font-semibold">
            Explore editorial review features, local spotlights, and professional commendations from fellow writers.
          </p>
        )}
      </div>

      {/* LUXURIOUS SYSTEM TOGGLE pill selector */}
      {variant !== "legacy" && (
        <div className="flex justify-center items-center gap-2 mb-12 max-w-sm sm:max-w-md mx-auto p-1 bg-[#E6EBE1]/45 rounded-full border border-burgundy/10 select-none">
          <button
            onClick={() => {
              setActiveTab("press-and-peers");
              setCurrentIndex(0);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-xs font-bold transition-all duration-300 ${
              activeTab === "press-and-peers"
                ? "bg-burgundy text-white shadow"
                : "text-burgundy/80 hover:text-burgundy hover:bg-burgundy/5"
            }`}
            aria-label="Toggle press and educational peer circle reviews"
          >
            <Newspaper className="h-3.5 w-3.5" />
            <span>Publications & Peers</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("readers");
              setCurrentIndex(0);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-xs font-bold transition-all duration-300 ${
              activeTab === "readers"
                ? "bg-burgundy text-white shadow"
                : "text-burgundy/80 hover:text-burgundy hover:bg-burgundy/5"
            }`}
            aria-label="Toggle reader community testimonials"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Reader Community</span>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeTab === "press-and-peers" ? (
          <motion.div
            key="press-and-peers-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12"
          >
            {/* 1. EDITORIAL CLIPPINGS ("In the Publications") */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-burgundy/10 pb-2">
                <Newspaper className="h-4 w-4 text-gold shrink-0" />
                <h3 className="font-serif text-xl md:text-2xl text-burgundy font-normal italic">
                  In The Publications
                </h3>
              </div>

              {/* Desktop view of high-fidelity publication cards */}
              <div className="hidden md:grid grid-cols-3 gap-6">
                {publicationMentions.map((pub, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#FFFBF4] rounded-2xl p-6 sm:p-7 border border-burgundy/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                  >
                    {/* Retro line art to denote vintage news clippings */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gold opacity-60" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-sans text-[9px] font-black uppercase tracking-wider text-gold bg-[#E6EBE1]/40 px-2 py-1 rounded">
                          {pub.issue}
                        </span>
                        <span className="font-sans text-[10px] text-near-black/50 font-bold">
                          {pub.rating}
                        </span>
                      </div>

                      <p className="font-serif text-base italic text-near-black/90 leading-relaxed mb-6 font-medium">
                        &ldquo;{pub.quote}&rdquo;
                      </p>
                    </div>

                    <div>
                      <div className="h-[1px] w-12 bg-burgundy/15 mb-3" />
                      <span className="font-sans text-xs uppercase tracking-wider font-extrabold text-burgundy block">
                        {pub.publication}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* MOBILE CAROUSEL FOR PUBLICATIONS */}
              <div className="block md:hidden w-full max-w-[420px] mx-auto">
                <div className="relative overflow-hidden min-h-[250px] flex items-stretch">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={pubIndex}
                      initial={{ opacity: 0, x: 55 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -55 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#FFFBF4] rounded-2xl p-6 border border-burgundy/5 shadow-sm flex flex-col justify-between relative overflow-hidden w-full"
                    >
                      <div className="absolute top-0 left-0 w-full h-[3px] bg-gold opacity-60" />
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-sans text-[9px] font-black uppercase tracking-wider text-gold bg-[#E6EBE1]/40 px-2 py-1 rounded">
                            {publicationMentions[pubIndex].issue}
                          </span>
                          <span className="font-sans text-[10px] text-near-black/50 font-bold">
                            {publicationMentions[pubIndex].rating}
                          </span>
                        </div>
                        <p className="font-serif text-base italic text-near-black/90 leading-relaxed mb-6 font-medium">
                          &ldquo;{publicationMentions[pubIndex].quote}&rdquo;
                        </p>
                      </div>
                      <div>
                        <div className="h-[1px] w-12 bg-burgundy/15 mb-3" />
                        <span className="font-sans text-xs uppercase tracking-wider font-extrabold text-burgundy block">
                          {publicationMentions[pubIndex].publication}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-4 px-2">
                  <div className="flex gap-1.5">
                    {publicationMentions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPubIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === pubIndex ? "w-6 bg-burgundy" : "w-2 bg-burgundy/25 hover:bg-burgundy/40"
                        }`}
                        aria-label={`Go to publication mention ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePubPrev}
                      className="p-2 border border-burgundy/15 rounded-full bg-white/50 hover:bg-white text-burgundy transition-all active:scale-95 cursor-pointer"
                      aria-label="Previous publication"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handlePubNext}
                      className="p-2 border border-burgundy/15 rounded-full bg-white/50 hover:bg-white text-burgundy transition-all active:scale-95 cursor-pointer"
                      aria-label="Next publication"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PEER AUTHOR TESTIMONIALS */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-burgundy/10 pb-2 mt-4">
                <PenTool className="h-4 w-4 text-gold shrink-0" />
                <h3 className="font-serif text-xl md:text-2xl text-burgundy font-normal italic">
                  Fellow Authors & Contemporaries
                </h3>
              </div>

              {/* Desktop view of Dual Column Layout for Peers */}
              <div className="hidden md:grid grid-cols-2 gap-6 md:gap-8">
                {authorTestimonials.map((peer, idx) => (
                  <div 
                    key={idx}
                    className="liquid-glass rounded-2xl p-6 sm:p-8 border border-burgundy/10 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-4xl font-serif text-rose-pink/15 leading-none select-none -mb-3">
                        “
                      </div>
                      <p className="font-serif text-lg italic text-near-black/90 leading-relaxed mb-6 font-semibold">
                        {peer.quote}
                      </p>
                    </div>

                    <div>
                      <div className="h-[1px] w-12 bg-gold/30 mb-3" />
                      <div className="font-sans text-xs uppercase tracking-wider font-extrabold text-burgundy">
                        {peer.authorName}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-sans text-[10px] text-near-black/60 font-medium">
                          {peer.role}
                        </span>
                        <span className="text-near-black/30 font-sans text-xs">•</span>
                        <span className="font-sans text-[10px] text-gold font-bold uppercase tracking-widest font-bold">
                          {peer.affiliation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* MOBILE CAROUSEL FOR PEERS */}
              <div className="block md:hidden w-full max-w-[420px] mx-auto">
                <div className="relative overflow-hidden min-h-[280px] flex items-stretch">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={peerIndex}
                      initial={{ opacity: 0, x: 55 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -55 }}
                      transition={{ duration: 0.3 }}
                      className="liquid-glass rounded-2xl p-6 border border-burgundy/10 shadow-sm flex flex-col justify-between w-full"
                    >
                      <div>
                        <div className="text-4xl font-serif text-rose-pink/15 leading-none select-none -mb-3">
                          “
                        </div>
                        <p className="font-serif text-base italic text-near-black/90 leading-relaxed mb-6 font-semibold">
                          {authorTestimonials[peerIndex].quote}
                        </p>
                      </div>
                      <div>
                        <div className="h-[1px] w-12 bg-gold/30 mb-3" />
                        <div className="font-sans text-xs uppercase tracking-wider font-extrabold text-burgundy">
                          {authorTestimonials[peerIndex].authorName}
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 mt-0.5">
                          <span className="font-sans text-[10px] text-near-black/60 font-medium leading-tight">
                            {authorTestimonials[peerIndex].role}
                          </span>
                          <span className="hidden sm:inline text-near-black/30 font-sans text-xs">•</span>
                          <span className="font-sans text-[10px] text-gold font-bold uppercase tracking-widest font-bold leading-none">
                            {authorTestimonials[peerIndex].affiliation}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-4 px-2">
                  <div className="flex gap-1.5">
                    {authorTestimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPeerIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === peerIndex ? "w-6 bg-burgundy" : "w-2 bg-burgundy/25 hover:bg-burgundy/40"
                        }`}
                        aria-label={`Go to contemporary testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePeerPrev}
                      className="p-2 border border-burgundy/15 rounded-full bg-white/50 hover:bg-white text-burgundy transition-all active:scale-95 cursor-pointer"
                      aria-label="Previous peer review"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handlePeerNext}
                      className="p-2 border border-burgundy/15 rounded-full bg-white/50 hover:bg-white text-burgundy transition-all active:scale-95 cursor-pointer"
                      aria-label="Next peer review"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* FORWARD COMPATIBLE CALL TO ACTION - "Be aware those don't exist yet but they hopefully will exist" */}
              <div className="mt-8 text-center">
                <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-6 py-3 bg-[#E6EBE1]/30 hover:bg-[#E6EBE1]/50 border border-burgundy/5 rounded-2xl transition-all max-w-xl mx-auto">
                  <span className="font-sans text-[11px] text-near-black/75 font-semibold">
                    Are you a fellow children's author, educator, or reporter?
                  </span>
                  <Link 
                    to="/contact"
                    className="font-sans text-[11px] text-burgundy font-extrabold uppercase tracking-wider hover:text-rose-pink flex items-center gap-1 transition-colors"
                  >
                    Connect with E.D. Harris
                    <span className="text-xs">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="readers-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* DESKTOP REVIEW GRID */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((item, index) => (
                <div 
                  key={index} 
                  className="liquid-glass bg-white/75 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-burgundy/10 shadow-sm"
                >
                  <div className="text-3xl font-serif text-rose-pink/25 leading-none select-none mb-1">
                    “
                  </div>
                  
                  <p className="font-serif text-base italic text-near-black/95 leading-relaxed mb-6 font-medium">
                    {item.quote}
                  </p>

                  <div>
                    <div className="h-[1px] w-12 bg-gold/30 mb-3" />
                    <div className="font-sans text-xs uppercase tracking-wider font-bold text-burgundy">
                      {item.name}
                    </div>
                    <div className="font-sans text-[10px] text-gold font-semibold uppercase tracking-widest mt-0.5">
                      {item.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE SLIDER FOR READERS */}
            <div className="block md:hidden w-full max-w-[420px] mx-auto">
              <div className="relative overflow-hidden min-h-[295px] flex items-stretch">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 55 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -55 }}
                    transition={{ duration: 0.3 }}
                    className="liquid-glass bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-burgundy/15 shadow-md w-full"
                  >
                    <div>
                      <div className="text-3xl font-serif text-rose-pink/25 leading-none select-none mb-1">
                        “
                      </div>
                      <p className="font-serif text-base italic text-near-black/95 leading-relaxed mb-6 font-medium">
                        {testimonials[currentIndex].quote}
                      </p>
                    </div>

                    <div>
                      <div className="h-[1px] w-12 bg-gold/30 mb-3" />
                      <div className="font-sans text-xs uppercase tracking-wider font-bold text-burgundy">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="font-sans text-[10px] text-gold font-semibold uppercase tracking-widest mt-0.5">
                        {testimonials[currentIndex].role}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* SLIDE ACTIONS */}
              <div className="flex items-center justify-between mt-6 px-2">
                <div className="flex gap-1.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-6 bg-burgundy" : "w-2 bg-burgundy/25 hover:bg-burgundy/40"
                      }`}
                      aria-label={`Go to reader testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 border border-burgundy/15 rounded-full bg-white/50 hover:bg-white text-burgundy transition-all active:scale-95 cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 border border-burgundy/15 rounded-full bg-white/50 hover:bg-white text-burgundy transition-all active:scale-95 cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
