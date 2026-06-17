/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Mail, ArrowUpRight, Sparkles, Instagram, Facebook } from "lucide-react";
import { contactEmail, socials } from "../content";
import AnimatedSection from "../components/AnimatedSection";

// Helper to translate icon names dynamically to Components
function getSocialIcon(platform: string) {
  if (platform.toLowerCase() === "instagram") {
    return <Instagram className="h-4 w-4" />;
  }
  return <Mail className="h-4 w-4" />; // fallback
}

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="contact-page" className="w-full relative overflow-hidden flex items-center justify-center min-h-[75vh] pt-24 md:pt-36 pb-12">
      {/* Soft floating background rings */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#BD955C]/5 blur-[90px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#D9628D]/5 blur-[120px]" />
      </div>

      {/* Main Glass Centerpiece Card */}
      <AnimatedSection 
        id="contact-section" 
        className="w-full py-16 px-4 max-w-[640px] mx-auto z-10 relative"
      >
        <div className="liquid-glass rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center">
          
          {/* Spark decal */}
          <div className="w-10 h-10 rounded-full bg-rose-pink/5 border border-rose-pink/15 flex items-center justify-center text-rose-pink mb-6">
            <Mail className="h-5 w-5" />
          </div>

          <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-rose-pink">
            Connecting with readers
          </span>
          
          <h1 className="font-serif text-4xl sm:text-5xl text-burgundy tracking-tight mt-3 mb-4">
            Get in touch
          </h1>

          <p className="font-sans text-xs sm:text-sm text-near-black/75 leading-relaxed max-w-md mx-auto mb-8 font-semibold">
            Whether you are a parent exploring book discussions, an educator planning literature programs, or a bookstore coordinator interested in stocking E.D. Harris books—we would love to hear from you.
          </p>

          {/* Styled Mailto Link block */}
          <div className="w-full flex justify-center mb-10">
            <a
              href={`mailto:${contactEmail}`}
              id="contact-email-anchor"
              className="inline-flex items-center gap-3 bg-white/40 border border-burgundy/15 rounded-2xl px-6 py-4 hover:border-burgundy/40 hover:bg-white/70 transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-burgundy"
            >
              <div className="p-2 rounded-full bg-burgundy/10 text-burgundy">
                <Mail className="h-4 w-4" />
              </div>
              <div className="text-left">
                <span className="block font-sans text-[9px] uppercase tracking-wider font-bold text-near-black/40">
                  Direct Email
                </span>
                <span className="font-sans text-xs sm:text-sm font-bold text-burgundy break-all">
                  {contactEmail}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-burgundy/40 group-hover:text-burgundy group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="h-[1px] w-12 bg-burgundy/10 mb-6" />

          {/* Social Platforms connectors */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-rose-pink mb-1">
              Join us on our journey
            </span>
            
            {socials.map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/30 border border-burgundy/5 transition-all text-burgundy/90 hover:text-burgundy font-semibold font-sans text-xs uppercase cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {getSocialIcon(soc.platform)}
                  <span>{soc.platform}</span>
                </div>
                <span className="text-[10px] text-rose-pink font-bold tracking-wider font-sans group">
                  @edharrisbooks
                </span>
              </a>
            ))}
          </div>

          {/* Core bottom brand moniker in a modern treatment */}
          <div className="mt-10 pt-6 border-t border-burgundy/10 w-full flex justify-center">
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-black text-rose-pink">
              @EVDHARRISBOOKS.COM
            </span>
          </div>

        </div>
      </AnimatedSection>
    </div>
  );
}
