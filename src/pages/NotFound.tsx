/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Compass, HelpCircle, ArrowLeft } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="not-found-page" className="w-full relative overflow-hidden flex items-center justify-center min-h-[75vh] pt-24 md:pt-36 pb-12">
      {/* Decorative gentle watercolor blur background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#5FAAD9]/5 blur-[70px]" />
      </div>

      <AnimatedSection 
        id="not-found-section" 
        className="w-full py-16 px-4 max-w-[550px] mx-auto z-10 relative"
      >
        <div className="liquid-glass rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center">
          
          <div className="w-12 h-12 rounded-full bg-[#5FAAD9]/10 text-sky-blue flex items-center justify-center mb-6">
            <Compass className="h-6 w-6 animate-spin duration-1000" />
          </div>

          <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-gold">
            Oh dear, a quiet detour!
          </span>

          <h1 className="font-playfair text-3xl sm:text-4xl text-burgundy font-black tracking-tight mt-3 mb-4 leading-snug">
            This page wandered off in the rain, a bit like Judgy Wudgy.
          </h1>

          <p className="font-sans text-xs sm:text-sm text-near-black/75 leading-relaxed max-w-sm mb-8 font-semibold">
            But unlike Judgy Wudgy, you don&apos;t have to stay outside in the cold! Let&apos;s guide you back to our warm story circles.
          </p>

          <Link
            to="/"
            id="404-home-cta"
            className="inline-flex items-center justify-center bg-rose-pink hover:bg-burgundy text-white font-sans text-xs uppercase tracking-wider font-bold rounded-full px-6 py-3.5 transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-burgundy"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Safety
          </Link>

        </div>
      </AnimatedSection>
    </div>
  );
}
