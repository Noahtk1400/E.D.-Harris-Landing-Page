/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, ArrowRight, Award } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import { hero, book, author } from "../content";
import AnimatedSection from "../components/AnimatedSection";
import TestimonialsSection from "../components/TestimonialsSection";
import EmailCapture from "../components/EmailCapture";

export default function Home() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check to disable continuous scroll calculations on mobile touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle cross-page navigation anchor scrolling
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("scrollTo") === "newsletter") {
      const newsletterSection = document.getElementById("newsletter-section");
      if (newsletterSection) {
        setTimeout(() => {
          newsletterSection.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Framer Motion viewport scroll-linked animations for the author image
  // It starts bigger (1.35x), slightly translucent, and softly rotated, then blends down beautifully to 1.0x and centers perfectly as the user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const avatarScale = useTransform(scrollYProgress, [0.05, 0.85], [1.35, 1]);
  const avatarRotate = useTransform(scrollYProgress, [0.05, 0.85], [3, 0]);
  const avatarOpacity = useTransform(scrollYProgress, [0.05, 0.65], [0.65, 1]);

  return (
    <div id="home-page" className="relative overflow-hidden w-full">
      {/* SECTION 1: HERO CONTAINER */}
      <div className="hero">
        <div className="blur-overlay blur-overlay-top" />
        <div className="blur-overlay blur-overlay-bottom" />
        
        <div className="hero-bg bg-[#E6EBE1]">
          <video 
            src="https://res.cloudinary.com/dwjgr2rii/video/upload/q_auto/f_auto/v1781061206/hero_bg_pjjncf.mp4"
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Subtle warm vignette overlay on the background video layer */}
          <div className="hero-vignette" />
        </div>

        {/* Soft, luxurious gradient blend into the cream background of the next section to prevent an abrupt bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 md:h-24 bg-gradient-to-t from-[#E6EBE1] to-transparent z-10 pointer-events-none" />

        <AnimatedSection 
          id="hero-section" 
          className="relative w-full h-full flex flex-col items-center justify-center pt-28 pb-20 md:pb-32 px-4 max-w-[1100px] mx-auto z-10 text-center"
        >
          {/* Main Visual Layout - Centered matching reference */}
          <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
            {/* Pill Header Badge */}
            <Link 
              to="/books/judgy-wudgy"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-md transform hover:scale-105 active:scale-95 transition-all cursor-pointer select-none mb-4 animate-fade-in hover:bg-white/15"
            >
              <span className="bg-white text-near-black text-[9px] uppercase font-black px-2 py-0.5 rounded-full leading-none tracking-widest">
                New
              </span>
              <span className="font-sans text-[10px] md:text-xs text-white/95 uppercase font-bold tracking-widest leading-none">
                Introducing Judgy Wudgy Book 1
              </span>
            </Link>

            {/* Giant display serif heading */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-white font-normal tracking-tightest leading-[1.05] drop-shadow-md select-none">
              Stories that <span className="font-medium italic text-[#FFFBF4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">excite</span>.
            </h1>

            {/* Elegant subline copy */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-white/95 font-medium leading-relaxed max-w-2xl mx-auto mt-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] select-none">
              {hero.subline}
            </p>

            {/* Center Story/Couplet Quote Card */}
            <div className="mt-4 mx-auto max-w-lg bg-white/5 backdrop-blur-xs border border-white/15 px-6 py-3 rounded-2xl shadow-sm">
              <p className="font-serif text-base sm:text-lg italic text-white/95 leading-relaxed tracking-normal">
                &ldquo;{book.hookCouplet}&rdquo;
              </p>
            </div>

            {/* Action buttons side-by-side centered */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-6 scale-95 sm:scale-100">
              <a
                href="https://store.bookbaby.com/book/judgy-wudgy-was-a-bear1"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-order-cta"
                className="inline-flex items-center justify-center bg-white hover:bg-white/95 text-near-black font-sans text-xs uppercase tracking-wider font-extrabold rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 text-center w-full sm:w-auto"
              >
                Preorder Judgy Wudgy
                <span className="ml-2 text-sm leading-none">↗</span>
              </a>
              
              <Link
                to="/books/judgy-wudgy"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-sans text-xs uppercase tracking-wider font-bold rounded-full px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 text-center w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Elegant footer tags floating at the bottom as requested */}
          <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-0 right-0 w-full text-center z-20 px-4 hidden sm:block">
            <div className="flex justify-center items-center gap-6 md:gap-10 text-white font-serif text-lg md:text-xl font-semibold tracking-normal select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              <span className="opacity-95 hover:opacity-100 transition-opacity">Empathy</span>
              <span className="text-white/40 font-sans text-xs">•</span>
              <span className="opacity-95 hover:opacity-100 transition-opacity">Kindness</span>
              <span className="text-white/40 font-sans text-xs">•</span>
              <span className="opacity-95 hover:opacity-100 transition-opacity">Self-Awareness</span>
              <span className="text-white/40 font-sans text-xs">•</span>
              <span className="opacity-95 hover:opacity-100 transition-opacity">Belonging</span>
              <span className="text-white/40 font-sans text-xs">•</span>
              <span className="opacity-95 hover:opacity-100 transition-opacity">Resilience</span>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection 
        id="about-author-section" 
        className="w-full py-16 px-4 max-w-[1000px] mx-auto z-20 relative mt-0"
      >
        <div className="liquid-glass rounded-[40px] p-8 md:p-12 transition-all" ref={containerRef}>
          <div className="flex flex-col gap-8 items-center max-w-3xl mx-auto">
            
            {/* Centered Square Headshot with scroll anim - starts bigger and translates beautifully */}
            <div className="flex flex-col items-center gap-3">
              <motion.div 
                style={isMobile ? { scale: 1, rotate: 0, opacity: 1 } : { scale: avatarScale, rotate: avatarRotate, opacity: avatarOpacity }}
                className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] rounded-[48px] overflow-hidden shadow-2xl border-[6px] border-white/80 palette-wash bg-cream transition-shadow duration-300 hover:shadow-3xl"
              >
                {author.headshot ? (
                  <img
                    src={author.headshot}
                    alt={author.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <span className="font-serif text-xs italic text-burgundy text-center font-bold">
                      Author Headshot
                    </span>
                    <div className="h-[1px] w-6 bg-burgundy/30 my-2" />
                    <span className="font-sans text-[8px] uppercase tracking-widest text-near-black/50 font-bold">
                      E.D. Harris
                    </span>
                  </div>
                )}
              </motion.div>
              <span className="font-sans text-[10px] text-gold uppercase tracking-widest font-bold mt-2 select-none">
                Educator & Author
              </span>
            </div>

            {/* Biography text block */}
            <div className="flex flex-col items-center text-center gap-4 mt-4">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-gold">
                The heart behind the stories
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-burgundy tracking-tight">
                About E.D. Harris
              </h2>

              <div className="flex flex-col gap-4 font-sans text-xs sm:text-sm text-near-black/85 leading-relaxed font-semibold">
                {author.bioParagraphs.map((para, idx) => (
                  <p key={idx} className="indent-0">
                    {para}
                  </p>
                ))}
              </div>

              {/* Discussion highlight label */}
              <div className="mt-4 text-[10px] font-sans font-bold text-burgundy bg-rose-pink/5 hover:bg-rose-pink/10 transition-colors px-3 py-1.5 rounded-full border border-rose-pink/10 flex items-center gap-1.5 cursor-default select-none">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                NYC Board of Ed Literature Backed Framework
              </div>
            </div>

          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 3: TESTIMONIALS (DYNAMIC) */}
      <TestimonialsSection />

      {/* SECTION 4: EMAIL CAPTURE */}
      <EmailCapture />
    </div>
  );
}
