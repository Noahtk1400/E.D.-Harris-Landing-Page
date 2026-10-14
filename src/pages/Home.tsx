/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, ArrowRight, Award } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import { track } from "@vercel/analytics";
import { hero, book, author, buyLinks } from "../content";
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
          className="relative w-full h-full flex flex-col items-center justify-start pt-20 xs:pt-24 sm:pt-24 md:pt-[115px] pb-12 sm:pb-16 md:pb-20 px-4 max-w-[1100px] mx-auto z-10 text-center"
        >
          {/* Main Visual Layout - Centered matching reference */}
          <div className="flex flex-col items-center gap-3.5 max-w-4xl mx-auto select-none">
            {/* Pill Header Badge */}
            <Link 
              to="/books/judgy-wudgy"
              className="relative z-30 pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-md transform hover:scale-105 active:scale-95 transition-all cursor-pointer select-none mb-1 animate-fade-in hover:bg-white/25 whitespace-nowrap"
            >
              <span className="bg-white text-near-black text-[9px] uppercase font-black px-2 py-0.5 rounded-full leading-none tracking-widest shrink-0">
                New
              </span>
              <span className="font-sans text-[9px] xs:text-[10px] md:text-xs text-white/95 uppercase font-bold tracking-widest leading-none shrink-0 whitespace-nowrap">
                Introducing Judgy Wudgy Series Book 1
              </span>
            </Link>

            {/* Giant display serif heading */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-white font-normal tracking-tightest leading-[1.05] drop-shadow-md select-none">
              Stories that <span className="font-medium italic text-[#FFFBF4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">inspire</span>.
            </h1>

            {/* Elegant subline copy */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-white/95 font-medium leading-relaxed max-w-2xl mx-auto mt-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] select-none">
              {hero.subline}
            </p>
          </div>

          {/* Action buttons side-by-side centered - positioned right above the words at the bottom */}
          <div className="absolute bottom-24 xs:bottom-28 sm:bottom-32 md:bottom-34 left-0 right-0 w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 max-w-4xl mx-auto scale-95 sm:scale-100 z-30 pointer-events-auto">
            <a
              href={buyLinks.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-order-cta"
              onClick={() => track('buy_click', { location: 'home_hero', store: 'Amazon' })}
              className="inline-flex items-center justify-center bg-white hover:bg-white/95 text-near-black font-sans text-xs uppercase tracking-wider font-extrabold rounded-full px-6 py-3.5 sm:px-8 sm:py-4 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 text-center w-full sm:w-auto"
            >
              Buy Judgy Wudgy
              <span className="ml-2 text-sm leading-none">↗</span>
            </a>
            
            <Link
              to="/books/judgy-wudgy"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-sans text-xs uppercase tracking-wider font-bold rounded-full px-6 py-3.5 sm:px-8 sm:py-4 transition-all duration-300 hover:-translate-y-0.5 text-center w-full sm:w-auto"
            >
              Learn More
            </Link>
          </div>

          {/* Elegant footer tags floating at the bottom as requested */}
          <div className="absolute bottom-4 xs:bottom-6 sm:bottom-12 md:bottom-16 left-0 right-0 w-full text-center z-20 px-4 block">
            <div className="flex flex-wrap justify-center items-center gap-x-2 xs:gap-x-3.5 sm:gap-x-4 md:gap-x-6 gap-y-1 text-white font-serif text-[11px] xs:text-xs sm:text-lg md:text-xl font-semibold tracking-normal select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] max-w-4xl mx-auto font-medium">
              <span className="opacity-95 hover:opacity-100 transition-opacity">Kindness</span>
              <span className="text-white/40 font-sans text-xs">•</span>
              <span className="opacity-95 hover:opacity-100 transition-opacity">Empathy</span>
              <span className="text-white/40 font-sans text-xs">•</span>
              <span className="opacity-95 hover:opacity-100 transition-opacity">Compassion</span>
              <span className="text-white/40 font-sans text-xs">•</span>
              <span className="opacity-95 hover:opacity-100 transition-opacity">Self-Awareness</span>
              <span className="text-white/40 font-sans text-xs md:hidden">•</span>
              <span className="opacity-95 hover:opacity-100 transition-opacity block md:inline">Developing Healthy Friendships</span>
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
        <div className="liquid-glass rounded-[40px] p-8 md:p-12 transition-all bg-[#e9ddc3]!" style={{ backgroundColor: "#e9ddc3" }} ref={containerRef}>
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
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#805533]">
                The heart behind the stories
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl text-burgundy font-black tracking-tight">
                About E.D. Harris
              </h2>

              <div className="flex flex-col gap-4 font-sans text-xs sm:text-sm text-near-black/85 leading-relaxed font-semibold">
                {author.bioParagraphs.map((para, idx) => (
                  <p key={idx} className="indent-0">
                    {para}
                  </p>
                ))}
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
