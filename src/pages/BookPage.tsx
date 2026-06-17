/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BookOpen, Sparkles, AlertCircle, Bookmark, ArrowRight } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import { book, buyLinks } from "../content";
import AnimatedSection from "../components/AnimatedSection";
import TestimonialsSection from "../components/TestimonialsSection";
// import VideoCarousel from "../components/VideoCarousel";
import EmailCapture from "../components/EmailCapture";

export default function BookPage() {
  // Always scroll to top when mounting Book Details page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollY } = useScroll();
  // As the user scrolls down, the cover gently shifts upwards slightly slower (parallax effect)
  const coverY = useTransform(scrollY, [0, 850], [0, -35]);
  const coverRotate = useTransform(scrollY, [0, 850], [0, 2]);

  return (
    <div id="book-page" className="w-full relative overflow-hidden bg-[#FFFBF4]">
      {/* Top Section containing Video Backplate spanning Hero Preorder & Testimonials Section */}
      <div className="relative w-full overflow-hidden book-hero-container">
        {/* Dynamic Video Backplate - beautifully visible, extended background to fit preorder AND testimonials */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          <video 
            src="https://res.cloudinary.com/dwjgr2rii/video/upload/q_auto/f_auto/v1781055245/jw_hero_pic_dcvn3h.mp4"
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-[0.38]"
          />
          {/* Soft elegant gradient mask that tapers off, fading to solid cream before the VideoCarousel */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#FFFBF4] via-[#FFFBF4]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#FFFBF4]/12 z-1" />
        </div>

        {/* SECTION 1: PREORDER BLOCK - Top deep showcase */}
        <AnimatedSection 
          id="book-main-block" 
          className="pt-28 pb-16 px-4 max-w-[1100px] mx-auto z-10 relative"
        >
        <div className="liquid-glass rounded-[32px] sm:rounded-[40px] p-5 xs:p-6 sm:p-10 md:p-12 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Book cover art showcase (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <motion.div 
                style={{ y: coverY, rotate: coverRotate }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-full max-w-[325px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-burgundy/15 bg-burgundy flex items-center justify-center p-1.5"
              >
                {/* Actual Book Cover Image (Scaled up 10%, no white border, red background blending seamlessly) */}
                {book.coverImage && (
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-contain scale-[1.10] rounded-2xl z-0 transition-transform duration-500"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                )}

                {/* Bookmark on top: keep the ages three to six picture book at the top and delete the rest */}
                <div className="absolute top-0 inset-x-0 p-4 z-10 bg-gradient-to-b from-black/25 via-black/5 to-transparent flex justify-between items-center">
                  <span className="font-sans text-[10px] text-white uppercase tracking-widest font-extrabold drop-shadow">
                    Age 3–6 Picture Book
                  </span>
                  <Bookmark className="h-4 w-4 text-white fill-white/10 drop-shadow-sm" />
                </div>

                {/* Decorative premium cover reflection edge */}
                <div className="absolute inset-y-0 left-0 w-[15px] bg-gradient-to-r from-white/15 via-white/5 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 border-r border-t border-b border-white/10 pointer-events-none rounded-[32px] z-20" />
              </motion.div>
            
            {/* Mobile-only: Series Tag on single line, placed above any lyric hook */}
            <div className="block md:hidden mt-6 text-center w-full px-2 overflow-hidden">
              <span className="font-sans text-[10px] xs:text-xs font-black uppercase text-gold bg-[#FFFBF4]/80 px-4 py-2 rounded-full border border-gold/20 shadow-sm whitespace-nowrap inline-block tracking-widest leading-none">
                {book.series}
              </span>
            </div>

            {/* Desktop-only: Soft hook couplet displayed centered list beneath the cover */}
            <div className="hidden md:block mt-6 text-center max-w-sm">
              <p className="font-serif text-lg italic text-burgundy font-medium mt-1 leading-relaxed">
                “{book.hookCouplet}”
              </p>
            </div>
          </div>

          {/* Right Column: Title and Preorder CTAs (7-cols) */}
          <div className="md:col-span-7 flex flex-col items-stretch md:items-start gap-6 w-full">
            <div className="text-center md:text-left">
              <span className="hidden md:inline-block font-sans text-[10px] uppercase tracking-widest font-bold text-gold bg-gold/5 px-3 py-1 rounded-full border border-gold/10">
                {book.series}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-burgundy tracking-tight mt-2">
                {book.title}
              </h1>
              <p className="font-sans text-[10px] sm:text-xs text-gold font-bold uppercase tracking-widest mt-1.5">
                {book.ageRange}
              </p>
            </div>

            <div className="h-[1px] w-full bg-burgundy/10" />

            <div className="font-sans text-xs sm:text-sm text-near-black/85 leading-relaxed font-semibold">
              <p>
                How can a grouchy little bear learn the weight of his sharp-stinging opinions?
              </p>
              <p className="mt-3">
                <em>Judgy Wudgy</em> is a beautiful, watercolor-illustrated story that teaches young readers (ages 3 to 6) the foundations of empathy, emotional awareness, and peer belonging, showing how easy it is to distance others—and how healing it is to choose kindness.
              </p>
            </div>

            {/* PREORDER PURCHASE BOX IN VISUAL HIERARCHY */}
            <div className="w-full flex flex-col gap-3 font-sans">
              <span className="text-[10px] uppercase tracking-widest font-bold text-near-black/50 text-center md:text-left mb-1">
                Reserve your copy today
              </span>

              {/* BUTTON A: Primary (Strongest weight) */}
              <a
                href={buyLinks.hardcoverUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="preorder-hardcover-btn"
                className="flex flex-col xs:flex-row items-center justify-center xs:justify-between text-center bg-rose-pink hover:bg-burgundy text-white font-bold text-xs uppercase tracking-wider rounded-2xl xs:rounded-full px-5 py-4 gap-2 transition-all duration-300 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-burgundy active:scale-99"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  Preorder Hardcover Edition
                </span>
                <span className="text-[10px] tracking-wider opacity-90 font-semibold">Via BookBaby</span>
              </a>

              {/* BUTTON B: Secondary */}
              <a
                href={buyLinks.paperbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="preorder-paperback-btn"
                className="flex flex-col xs:flex-row items-center justify-center xs:justify-between text-center border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl xs:rounded-full px-5 py-3.5 gap-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-burgundy active:scale-99"
              >
                <span>Preorder Paperback Edition</span>
                <span className="text-[10px] tracking-wider opacity-75 font-semibold">Via BookBaby</span>
              </a>

              {/* BUTTON C: Ghost/Conditional Dimmed */}
              {buyLinks.amazonLive ? (
                <a
                  href={buyLinks.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="amazon-button-active"
                  className="flex flex-col xs:flex-row items-center justify-center xs:justify-between text-center border-2 border-dashed border-[#BD955C] text-[#BD955C] hover:bg-[#BD955C] hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl xs:rounded-full px-5 py-3.5 gap-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span>Order Now on Amazon</span>
                  <Sparkles className="h-4 w-4 text-[#BD955C] shrink-0" />
                </a>
              ) : (
                <div 
                  id="amazon-button-disabled"
                  className="flex flex-col xs:flex-row items-center justify-center xs:justify-between text-center bg-[#E6EBE1]/40 border-2 border-near-black/10 text-near-black/35 font-bold text-xs uppercase tracking-wider rounded-2xl xs:rounded-full px-5 py-3.5 gap-2 select-none"
                  title="Amazon availability coming soon in July"
                >
                  <span className="flex items-center gap-2 italic">
                    <AlertCircle className="h-4 w-4 text-near-black/25 shrink-0" />
                    Coming to Amazon in July
                  </span>
                  <span className="text-[10px] tracking-wider uppercase font-semibold">Not yet live</span>
                </div>
              )}

              {/* Mobile-only Lyric Book Verse Hook under Coming to Amazon in July */}
              <div className="block md:hidden mt-4 text-center max-w-sm mx-auto p-4 bg-burgundy/5 rounded-2xl border border-burgundy/10 w-full">
                <p className="font-serif text-base xs:text-lg italic text-burgundy font-medium mt-1.5 leading-relaxed">
                  “{book.hookCouplet}”
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AnimatedSection>

      {/* SECTION 2: TESTIMONIALS - Embedded inside the looping background container so it shares the video */}
      <TestimonialsSection variant="legacy" />
    </div>

      {/* SECTION 3: BOOK PREVIEW VIDEO - Elegant, subtle centered Youtube player */}
      <AnimatedSection id="book-preview-video" className="py-12 md:py-16 px-4 max-w-[840px] mx-auto relative z-10">
        <div className="bg-white/60 backdrop-blur-md border border-burgundy/10 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-sm flex flex-col items-center text-center">
          <span className="font-sans text-[10px] uppercase tracking-widest font-extrabold text-gold leading-none block mb-2.5">
            Book Read-Along & Preview
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-burgundy tracking-tight mb-4">
            Experience the Story of Judgy Wudgy
          </h2>
          <div className="h-[2px] w-12 bg-[#e9ddc3] mb-6 rounded-full" />
          
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-[3px] border-[#e9ddc3] bg-near-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/_nS7FPXZ-as?rel=0"
              title="Judgy Wudgy Was a Bear Book Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="font-sans text-xs text-near-black/60 italic mt-5 max-w-md leading-relaxed font-semibold">
            Watch a charming visual showcase of our grumpy little bear and his colorful woodland friends.
          </p>
        </div>
      </AnimatedSection>

      {/* SECTION 4: EMAIL CAPTURE */}
      <EmailCapture />
    </div>
  );
}
