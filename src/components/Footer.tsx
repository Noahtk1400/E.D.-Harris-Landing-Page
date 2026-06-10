/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useNavigate, useLocation } from "react-router-dom";
import { MouseEvent } from "react";
import * as Icons from "lucide-react";
import { socials, contactEmail } from "../content";

// Helper to resolve string based icon name to Lucide Component
function SocialIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <Icons.Share2 className={className} />; // fall back icon
}

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to handle scrolling to newsletter section on home page
  const handleScrollToNewsletter = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?scrollTo=newsletter");
    } else {
      const newsletterSection = document.getElementById("newsletter-section");
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer id="global-footer" className="w-full px-4 pb-8 pt-12">
      <div className="mx-auto max-w-[1000px]">
        {/* Rounded Rounded-3xl Liquid Glass Container */}
        <div className="liquid-glass rounded-3xl p-8 md:p-12 transition-all">
          
          {/* Top Row: Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-8">
            
            {/* Left Column (Logo & Statement - 40% width approx) */}
            <div className="md:col-span-5 flex flex-col items-start gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-burgundy"
                aria-label="E.D. Harris Books Logo"
              >
                <img 
                  id="footer-logo"
                  src="https://res.cloudinary.com/dwjgr2rii/image/upload/q_auto/f_auto/v1781054975/ed_harris_burgundy_xbkfsx.png" 
                  alt="E.D. Harris" 
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </Link>
              <p className="font-sans text-xs text-near-black/75 leading-relaxed max-w-sm">
                Stories rooted in kindness, belonging, and the beauty of growing up.
              </p>
            </div>

            {/* Right Pillars Area (60% width structured grid) */}
            <div className="md:col-span-7 grid grid-cols-3 gap-6">
              
              {/* Pillar 1: Explore */}
              <div className="flex flex-col gap-3">
                <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-gold">
                  Explore
                </h4>
                <ul className="flex flex-col gap-2 font-sans text-xs text-near-black/75 font-semibold">
                  <li>
                    <Link to="/" className="hover:text-burgundy transition-colors duration-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/books/judgy-wudgy" className="hover:text-burgundy transition-colors duration-200">
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-burgundy transition-colors duration-200">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Pillar 2: The Books */}
              <div className="flex flex-col gap-3">
                <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-gold">
                  The Books
                </h4>
                <ul className="flex flex-col gap-2 font-sans text-xs text-near-black/75 font-semibold">
                  <li>
                    <Link to="/books/judgy-wudgy" className="hover:text-burgundy transition-style italic">
                      Judgy Wudgy
                    </Link>
                  </li>
                  <li>
                    <span className="text-gold/80 italic cursor-default pointer-events-none select-none text-[11px] block">
                      More coming soon
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pillar 3: Connect */}
              <div className="flex flex-col gap-3">
                <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-gold">
                  Connect
                </h4>
                <ul className="flex flex-col gap-2 font-sans text-xs text-near-black/75 font-semibold">
                  <li>
                    <a
                      href="#newsletter"
                      onClick={handleScrollToNewsletter}
                      className="hover:text-burgundy transition-colors duration-200"
                    >
                      Join the list
                    </a>
                  </li>
                  <li>
                    <a 
                      href={`mailto:${contactEmail}`}
                      className="hover:text-burgundy transition-colors duration-200 break-all"
                    >
                      Email Author
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Bottom Bar: Tiny copyrights and social link anchors */}
          <div className="pt-6 border-t border-burgundy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-near-black/40">
              © 2026 E.D. Harris Books. All rights reserved.
            </span>
            
            {/* Social Anchor Icons */}
            <div className="flex items-center gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full text-near-black/60 hover:text-burgundy hover:bg-burgundy/5 transition-all duration-300"
                  aria-label={`Follow E.D. Harris on ${social.platform}`}
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
