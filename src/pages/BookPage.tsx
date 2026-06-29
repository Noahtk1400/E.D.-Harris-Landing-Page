/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { BookOpen, Sparkles, AlertCircle, Bookmark, ArrowRight, ShieldCheck, ShoppingBag, ExternalLink, ChevronDown, ChevronUp, CreditCard, X } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import { track } from "@vercel/analytics";
import { book, buyLinks } from "../content";
import AnimatedSection from "../components/AnimatedSection";
import TestimonialsSection from "../components/TestimonialsSection";
// import VideoCarousel from "../components/VideoCarousel";
import EmailCapture from "../components/EmailCapture";

export default function BookPage() {
  const [showOtherRetailers, setShowOtherRetailers] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Monitor checkout open to reset iframe loading spinner
  useEffect(() => {
    if (isCheckoutOpen) {
      setIsIframeLoading(true);
    }
  }, [isCheckoutOpen]);

  // Always scroll to top when mounting Book Details page and track scroll for sticky bar
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          className="pt-12 sm:pt-20 pb-10 sm:pb-16 px-4 max-w-[1100px] mx-auto z-10 relative"
        >
        <div className="liquid-glass rounded-[24px] sm:rounded-[40px] p-3.5 xs:p-5 sm:p-10 md:p-12 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">
            
            {/* Desktop Left Column: Book cover art showcase (5 cols) */}
            <div className="hidden md:flex md:col-span-5 flex-col items-center">
              <motion.div 
                style={{ y: coverY, rotate: coverRotate }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-full max-w-[325px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-burgundy/15 bg-burgundy flex items-center justify-center p-1.5"
              >
                {/* Actual Book Cover Image */}
                {book.coverImage && (
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-contain scale-[1.10] rounded-2xl z-0 transition-transform duration-500"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                )}

                {/* Decorative premium cover reflection edge */}
                <div className="absolute inset-y-0 left-0 w-[15px] bg-gradient-to-r from-white/15 via-white/5 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 border-r border-t border-b border-white/10 pointer-events-none rounded-[32px] z-20" />
              </motion.div>
            
              {/* Desktop-only: Soft hook couplet displayed centered list beneath the cover */}
              <div className="mt-6 text-center max-w-sm">
                <p className="font-serif text-lg italic text-burgundy font-medium mt-1 leading-relaxed">
                  “{book.hookCouplet}”
                </p>
              </div>
            </div>

            {/* Right Column / Full Mobile Container: Title, CTAs, and Description (7 cols on desktop) */}
            <div className="md:col-span-7 flex flex-col items-stretch md:items-start gap-3.5 sm:gap-5 w-full">
              
              {/* MOBILE ONLY SIDE-BY-SIDE HEADER: Cover on left, Title on right. Extremely compact, 100% above the fold! */}
              <div className="flex md:hidden items-center gap-4 w-full">
                {/* Mobile Cover Art (Larger size and highly polished border) */}
                <div className="w-[110px] xs:w-[135px] sm:w-[160px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-burgundy/20 bg-burgundy flex items-center justify-center p-1 xs:p-1.5 shrink-0 relative">
                  {book.coverImage && (
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-full h-full object-contain scale-[1.10] rounded-xl z-0 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-y-0 left-0 w-[5px] bg-gradient-to-r from-white/10 to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-0 border-r border-t border-b border-white/10 pointer-events-none rounded-2xl z-20" />
                </div>

                {/* Mobile Title, Series, Age */}
                <div className="flex-1 text-left flex flex-col gap-1.5">
                  <h1 className="font-playfair text-2xl xs:text-3xl sm:text-4xl font-black text-burgundy tracking-tight leading-tight">
                    {book.title}
                  </h1>
                  <p className="font-sans text-[9px] xs:text-[10px] text-gold font-bold uppercase tracking-widest leading-none">
                    {book.ageRange}
                  </p>
                </div>
              </div>

              {/* DESKTOP ONLY HEADER: Beautiful, spacious, elegant */}
              <div className="hidden md:block text-left w-full">
                <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-burgundy font-black tracking-tight">
                  {book.title}
                </h1>
                <p className="font-sans text-[10px] sm:text-xs text-gold font-bold uppercase tracking-widest mt-1.5">
                  {book.ageRange}
                </p>
              </div>

              <div className="h-[1px] w-full bg-burgundy/10 my-0.5 sm:my-1" />

              {/* PREORDER PURCHASE BOX IN VISUAL HIERARCHY - Placement: Direct underneath Title, ABOVE Description! */}
              <div className="w-full flex flex-col gap-3 font-sans mt-2 items-center">
                <div className="flex flex-row items-center justify-between border-b border-burgundy/10 pb-3 w-full gap-4 max-w-md">
                  <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider xs:tracking-widest font-black text-near-black/55 whitespace-nowrap">
                    Select Preorder Option
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5 text-[8.5px] xs:text-[9px] sm:text-[10px] text-emerald-600 font-bold uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 xs:px-3 xs:py-1 rounded-full border border-emerald-100 shadow-xs whitespace-nowrap shrink-0">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    Secure checkout
                  </span>
                </div>

                {/* TIER 1: OPTION 1 - PREORDER ON AMAZON (Top-ranked, most familiar, high trust) */}
                {buyLinks.amazonLive ? (
                  <a
                    href={buyLinks.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="amazon-button-active"
                    onClick={() => track('buy_click', { location: 'book_page_hierarchy_top', store: 'Amazon' })}
                    className="group flex flex-col items-center justify-center text-center bg-white hover:bg-[#FFFBF4] text-burgundy border border-burgundy/25 hover:border-burgundy/45 font-extrabold text-[10px] xs:text-xs uppercase tracking-wider rounded-xl px-3 py-3.5 sm:px-4 sm:py-4 gap-1 sm:gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md active:scale-99 w-full max-w-md"
                  >
                    <span className="flex items-center gap-1.5 justify-center">
                      <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-burgundy/70" />
                      Preorder on Amazon
                    </span>
                    <span className="text-[9px] sm:text-[10px] tracking-wider opacity-90 font-black uppercase flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-burgundy/80">
                      Go to Amazon <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-burgundy/70" />
                    </span>
                  </a>
                ) : (
                  <div 
                    id="amazon-button-disabled"
                    className="flex items-center justify-between text-center bg-[#E6EBE1]/40 border border-near-black/10 text-near-black/35 font-bold text-xs uppercase tracking-wider rounded-xl px-4 py-3.5 select-none w-full max-w-md"
                    title="Amazon preorder coming soon in July"
                  >
                    <span className="flex items-center gap-2 italic">
                      <AlertCircle className="h-4 w-4 text-near-black/25 shrink-0" />
                      Coming to Amazon in July
                    </span>
                    <span className="text-[9px] tracking-wider uppercase font-semibold">Preorder soon</span>
                  </div>
                )}

                {/* TIER 1: OPTION 2 - SECURE DIRECT SQUARE CHECKOUT (Directly underneath) */}
                <button 
                  type="button"
                  onClick={() => {
                    track('buy_click', { location: 'book_page_square_direct_buy', store: 'Square' });
                    setIsCheckoutOpen(true);
                  }}
                  className="group flex flex-col items-center justify-center text-center bg-burgundy hover:bg-[#7d2030] text-white rounded-xl px-3 py-3.5 sm:px-4 sm:py-4 gap-1 sm:gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg active:scale-99 w-full max-w-md border border-emerald-500/45 relative overflow-hidden"
                >
                  {/* Premium green accent border on top */}
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-emerald-500" />
                  
                  <div className="flex flex-wrap items-center gap-1.5 justify-center w-full">
                    <div className="flex items-center gap-1 sm:gap-1.5 justify-center">
                      <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gold" />
                      <span className="font-sans font-black text-[10px] xs:text-xs sm:text-sm uppercase tracking-wider text-white">
                        Buy Direct with Square
                      </span>
                    </div>
                    <span className="bg-emerald-600 text-white text-[8px] xs:text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-emerald-500 shadow-xs shrink-0 animate-pulse">
                      30% Off
                    </span>
                  </div>
                  
                  <p className="text-[9px] sm:text-[10.5px] font-semibold text-emerald-400 tracking-wide leading-none">
                    Order directly via Square and save 30% instantly
                  </p>
                  
                  <span className="text-[9px] sm:text-[10px] tracking-wider opacity-90 font-black uppercase flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-gold mt-1">
                    On-Site Checkout <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold" />
                  </span>
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 w-full text-center sm:text-left mt-0.5 px-1 max-w-md">
                  <span className="text-[9px] font-bold text-near-black/50 uppercase tracking-widest">
                    Cards Accepted: Visa • Mastercard • Amex • Discover • Apple Pay
                  </span>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest flex items-center justify-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    SSL Encrypted • Powered by Square
                  </span>
                </div>
              </div>

              {/* TIER 2: SECONDARY PUBLISHER OPTIONS (Lesser-known channel neatly organized) */}
              <div className="border border-burgundy/10 rounded-xl overflow-hidden bg-white/40 w-full mt-1">
                <button
                  type="button"
                  onClick={() => setShowOtherRetailers(!showOtherRetailers)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-burgundy/5 hover:bg-burgundy/10 transition-colors duration-200 text-left"
                >
                  <span className="text-[10px] font-bold text-burgundy uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-burgundy/60 shrink-0" />
                    Other Formats & Publisher Store (BookBaby)
                  </span>
                  {showOtherRetailers ? (
                    <ChevronUp className="h-4 w-4 text-burgundy/60 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-burgundy/60 shrink-0" />
                  )}
                </button>

                {showOtherRetailers && (
                  <div className="p-4 bg-[#FFFBF4]/40 border-t border-burgundy/10 flex flex-col gap-2.5 animate-fadeIn">
                    <p className="text-[11px] text-near-black/60 font-semibold leading-relaxed mb-1">
                      Our custom-bound collector editions are also available to preorder directly through our publisher, BookBaby, supporting independent printing.
                    </p>
                    
                    {/* BookBaby Hardcover Link */}
                    <a
                      href={buyLinks.hardcoverUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="preorder-hardcover-btn"
                      onClick={() => track('buy_click', { location: 'book_page_secondary_accordion', store: 'BookBaby', edition: 'hardcover' })}
                      className="flex items-center justify-between text-center border border-burgundy/30 text-burgundy hover:bg-burgundy/5 font-bold text-xs uppercase tracking-wider rounded-xl px-4 py-3 transition-all duration-200 active:scale-99"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-burgundy" />
                        Hardcover Edition
                      </span>
                      <span className="text-[9px] opacity-75 font-semibold flex items-center gap-0.5">
                        BookBaby Store <ExternalLink className="h-2.5 w-2.5" />
                      </span>
                    </a>

                    {/* BookBaby Paperback Link */}
                    <a
                      href={buyLinks.paperbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="preorder-paperback-btn"
                      onClick={() => track('buy_click', { location: 'book_page_secondary_accordion', store: 'BookBaby', edition: 'paperback' })}
                      className="flex items-center justify-between text-center border border-burgundy/30 text-burgundy hover:bg-burgundy/5 font-bold text-xs uppercase tracking-wider rounded-xl px-4 py-3 transition-all duration-200 active:scale-99"
                    >
                      <span>Paperback Edition</span>
                      <span className="text-[9px] opacity-75 font-semibold flex items-center gap-0.5">
                        BookBaby Store <ExternalLink className="h-2.5 w-2.5" />
                      </span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile-only Lyric Book Verse Hook */}
              <div className="block md:hidden mt-2 text-center max-w-sm mx-auto p-4 bg-burgundy/5 rounded-2xl border border-burgundy/10 w-full">
                <p className="font-serif text-base xs:text-lg italic text-burgundy font-medium leading-relaxed">
                  “{book.hookCouplet}”
                </p>
              </div>

              {/* BOOK DESCRIPTION/SYNOPSIS - Positioned beautifully below the fold! */}
              <div className="font-sans text-[11px] xs:text-xs sm:text-sm text-near-black/80 leading-relaxed font-semibold mt-4 border-t border-burgundy/5 pt-4">
                <p>
                  How can a grouchy little bear learn the weight of his sharp-stinging opinions?
                </p>
                <p className="mt-2 text-near-black/70 font-medium">
                  <em>Judgy Wudgy</em> is a beautiful, watercolor-illustrated story that teaches young readers (ages 3 to 6) the foundations of empathy, emotional awareness, and peer belonging, showing how easy it is to distance others—and how healing it is to choose kindness.
                </p>
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
          <h2 className="font-playfair text-2xl sm:text-3xl text-burgundy font-black tracking-tight mb-4">
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

      {/* SECURE ONSITE CHECKOUT MODAL (HIGH-CONVERSION INTEGRATION) */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Animated Glass Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0F0A05]/80 backdrop-blur-[4px] transition-opacity duration-300 animate-fadeIn"
            onClick={() => setIsCheckoutOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-[#FFFBF4] border border-burgundy/15 w-full max-w-lg rounded-[28px] shadow-3xl overflow-hidden z-10 animate-scaleUp max-h-[90vh] flex flex-col">
            {/* Header with Secure Badging */}
            <div className="p-4 sm:p-5 border-b border-burgundy/10 bg-burgundy text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <ShieldCheck className="h-5 w-5 text-gold shrink-0" />
                </div>
                <div className="text-left">
                  <h3 className="font-sans font-black text-xs uppercase tracking-widest text-white leading-none mb-1">
                    Secure On-Site Checkout
                  </h3>
                  <p className="text-[10px] text-gold font-extrabold uppercase tracking-widest leading-none">
                    SSL Encrypted • Powered by Square
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/15 p-2 rounded-full transition-all duration-200"
                aria-label="Close Checkout"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Exclusive Discount Header Banner */}
            <div className="bg-emerald-50 border-b border-emerald-500/15 px-4 py-2 flex items-center justify-between text-left">
              <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse shrink-0" />
                Direct Order 30% Promotion Applied
              </span>
              <span className="bg-emerald-600 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                30% Off
              </span>
            </div>

            {/* Seamless Embed Frame Container with animated loader */}
            <div className="flex-1 bg-white overflow-hidden relative min-h-[460px] flex flex-col">
              {isIframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 gap-3">
                  <div className="w-8 h-8 rounded-full border-[3px] border-burgundy/10 border-t-burgundy animate-spin" />
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest text-near-black/40">
                    Connecting to Square...
                  </span>
                </div>
              )}
              <iframe
                src={buyLinks.squareUrl}
                className="w-full h-full flex-1 border-0"
                title="Square Secure checkout"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                onLoad={() => setIsIframeLoading(false)}
              />
            </div>

            {/* Premium Trust Footnote & Direct Backup */}
            <div className="p-4 sm:p-5 border-t border-burgundy/10 bg-[#FFFBF4] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[10px] font-sans font-black text-near-black/55 uppercase tracking-widest">
                  PCI-DSS Compliant Gateway
                </span>
              </div>
              
              <a
                href={buyLinks.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('buy_click', { location: 'checkout_modal_direct_link_fallback', store: 'Square' })}
                className="text-[10px] font-sans font-extrabold text-burgundy hover:text-rose-pink uppercase tracking-widest underline flex items-center gap-1 transition-colors"
              >
                Having trouble? Open Direct Link <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING STICKY ACTION BAR FOR CONVERSION */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showStickyBar ? 0 : 100, opacity: showStickyBar ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed bottom-0 inset-x-0 z-45 bg-[#FFFBF4]/95 backdrop-blur-md border-t border-burgundy/15 py-3 px-4 sm:px-6 shadow-[0_-4px_20px_rgba(122,23,38,0.08)] flex items-center justify-between"
      >
        <div className="max-w-[1100px] mx-auto w-full flex items-center justify-between gap-4">
          
          {/* Left Side: Elegant literary CTA (Hidden on small mobile screens to prevent button collision) */}
          <div className="hidden sm:flex flex-col text-left shrink-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="block font-sans text-[9px] uppercase tracking-widest font-black text-emerald-600 leading-none">
                Don't miss the action!
              </span>
            </div>
            <h4 className="font-playfair text-sm font-black text-burgundy mt-1.5 leading-none tracking-tight">
              Judgy Wudgy <span className="font-sans text-[10px] text-emerald-600 ml-1.5 font-bold uppercase tracking-wider">— Save 30% Direct</span>
            </h4>
          </div>

          {/* Right: Highly Optimized Compact Actions (Spans full width on mobile, aligns right on desktop) */}
          <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-end gap-2.5 w-full">
            {/* Option 1: Amazon */}
            {buyLinks.amazonLive ? (
              <a
                href={buyLinks.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('buy_click', { location: 'sticky_action_bar', store: 'Amazon' })}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white hover:bg-[#FFFBF4] text-burgundy border border-burgundy/25 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl px-3.5 py-2.5 transition-all duration-200 active:scale-98 shadow-sm shrink-0 text-center"
              >
                <ShoppingBag className="h-3.5 w-3.5 shrink-0 text-burgundy/70" />
                <span><span className="hidden xs:inline">Preorder on </span>Amazon</span>
              </a>
            ) : (
              <div className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#E6EBE1]/40 border border-near-black/10 text-near-black/35 font-bold text-[9px] uppercase tracking-wider rounded-xl px-3 py-2.5 select-none shrink-0 text-center">
                <AlertCircle className="h-3.5 w-3.5 text-near-black/25 shrink-0" />
                <span>Amazon July</span>
              </div>
            )}

            {/* Option 2: Square Direct */}
            <button
              type="button"
              onClick={() => {
                track('buy_click', { location: 'sticky_action_bar', store: 'Square' });
                setIsCheckoutOpen(true);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-burgundy hover:bg-[#7d2030] text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl px-3.5 py-2.5 transition-all duration-200 active:scale-98 shadow-sm shrink-0 text-center"
            >
              <CreditCard className="h-3.5 w-3.5 shrink-0 text-gold animate-pulse" />
              <span>Buy Direct (30% Off)</span>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
