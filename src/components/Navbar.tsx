/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "../content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close mobile navigation on route changes
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Click outside listener for the dropdown menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-3 left-0 right-0 z-50 w-full px-3 md:top-4 md:px-4">
      <div className="mx-auto max-w-[1000px]">
        {/* Rounded Pill Glass Navbar on mobile and desktop */}
         <motion.nav 
          layout
          id="main-nav-pill" 
          className="w-full bg-[#FFFBF4]/95 md:bg-white/80 backdrop-blur-md px-4.5 py-2.5 md:px-6 md:py-3 border border-burgundy/10 liquid-glass shadow-sm rounded-[24px] md:rounded-full transition-all duration-300"
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link 
              to="/" 
              id="nav-logo-link"
              className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-burgundy"
              aria-label="E.D. Harris Books Home"
            >
              <img 
                id="nav-logo-image"
                src="https://res.cloudinary.com/dwjgr2rii/image/upload/q_auto/f_auto/v1781054975/ed_harris_burgundy_xbkfsx.png" 
                alt="E.D. Harris" 
                className="h-[36px] md:h-[40px] w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-wider font-semibold">
              <NavLink 
                to="/"
                id="nav-link-home"
                className={({ isActive }) => 
                  `transition-colors duration-200 ${
                    isActive ? "text-burgundy" : "text-burgundy/70 hover:text-burgundy"
                  }`
                }
              >
                Home
              </NavLink>

              {/* Books Dropdown (Desktop opens on Hover/Focus, Click Toggle) */}
              <div 
                ref={dropdownRef} 
                className="relative group py-1"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  id="nav-dropdown-btn"
                  className="flex items-center gap-1 text-burgundy/70 hover:text-burgundy transition-colors duration-200 uppercase tracking-wider font-semibold focus-visible:outline-2 focus-visible:outline-burgundy"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Books <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Box with Framer Motion and exit animation support */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      id="nav-dropdown-menu"
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-80 z-50 pointer-events-auto"
                    >
                      <div className="bg-[#FFFBF4]/98 backdrop-blur-md border border-burgundy/15 shadow-xl rounded-2xl py-3 overflow-hidden text-left">
                        {/* Available Now Section */}
                        <div className="px-4 py-1.5 flex items-center justify-between">
                          <span className="block font-sans text-[9px] uppercase tracking-widest font-black text-rose-pink">
                            Available Now
                          </span>
                        </div>
                        {nav.booksDropdown.available.map((bookItem, idx) => (
                          <Link
                            key={idx}
                            to={bookItem.path}
                            className="block px-4 py-2.5 text-[11px] text-burgundy hover:text-rose-pink hover:bg-burgundy/5 transition-all rounded-xl mx-2 font-bold"
                          >
                            <span className="block">{bookItem.title}</span>
                            <span className="block text-[9px] text-[#805533] font-semibold mt-0.5">{bookItem.subtitle}</span>
                          </Link>
                        ))}

                        {/* Divider */}
                        <div className="h-[1px] bg-burgundy/10 my-2 mx-3" />

                        {/* Coming Soon Section */}
                        <div className="px-4 py-1.5">
                          <span className="block font-sans text-[9px] uppercase tracking-widest font-black text-gold">
                            Coming Soon
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 px-4 pb-2">
                          {nav.booksDropdown.comingSoon.map((bookItem, idx) => (
                            <div
                              key={idx}
                              className="py-2.5 px-3 bg-burgundy/[0.02] border border-burgundy/5 rounded-xl text-near-black/60 cursor-default"
                            >
                              <span className="block font-sans text-[11px] font-bold text-near-black/85 leading-tight">
                                {bookItem.title}
                              </span>
                              <span className="inline-block text-[9px] text-rose-pink font-bold uppercase tracking-wider mt-1 bg-rose-pink/5 px-2 py-0.5 rounded-full">
                                {bookItem.release}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink 
                to="/contact"
                id="nav-link-contact"
                className={({ isActive }) => 
                  `transition-colors duration-200 ${
                    isActive ? "text-burgundy" : "text-burgundy/70 hover:text-burgundy"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>

            {/* CTA Preorder Button */}
            <div className="hidden md:block">
              <Link 
                to="/books/judgy-wudgy"
                id="nav-preorder-cta"
                className="inline-flex items-center justify-center bg-rose-pink hover:bg-burgundy text-white font-sans text-xs uppercase tracking-wider font-bold rounded-full px-5 py-2.5 transition-all duration-300 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-burgundy"
              >
                Preorder
              </Link>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1.5 text-burgundy/80 hover:text-burgundy focus-visible:ring-2 focus-visible:ring-burgundy rounded-lg transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Expanded Menu using AnimatePresence for smooth accordion expand and fade */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                id="mobile-nav-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden flex flex-col gap-1.5 font-sans text-[11px] uppercase tracking-wider font-semibold md:hidden z-50 mt-3 pt-3 border-t border-burgundy/10"
              >
                <NavLink 
                  to="/"
                  className={({ isActive }) => 
                    `py-2 px-3 rounded-lg transition-all duration-200 block ${
                      isActive ? "text-burgundy bg-burgundy/5" : "text-burgundy/75 hover:text-burgundy"
                    }`
                  }
                >
                  Home
                </NavLink>

                {/* Mobile Books Section Expanded */}
                <div className="py-2 px-3 border-t border-b border-burgundy/5 my-1">
                  <span className="text-burgundy font-bold text-[9px] tracking-widest block mb-2 opacity-60">Books</span>
                  
                  {/* Available Now - Mobile */}
                  <div className="pl-3 mb-3">
                    <span className="text-rose-pink font-black text-[8px] tracking-wider block mb-1.5 uppercase">Available Now</span>
                    <div className="flex flex-col gap-1 pr-1">
                      {nav.booksDropdown.available.map((bookItem, idx) => (
                        <Link
                          key={idx}
                          to={bookItem.path}
                          className="bg-burgundy/5 hover:bg-burgundy/10 text-burgundy block p-2 rounded-xl text-xs font-bold transition-all text-left"
                        >
                          <span className="block">{bookItem.title}</span>
                          <span className="block text-[9px] text-[#805533]/80 font-semibold mt-0.5">{bookItem.subtitle}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Coming Soon - Mobile */}
                  <div className="pl-3">
                    <span className="text-gold font-black text-[8px] tracking-wider block mb-1.5 uppercase">Coming Soon</span>
                    <div className="flex flex-col gap-2.5 pr-1 text-left">
                      {nav.booksDropdown.comingSoon.map((bookItem, idx) => (
                        <div
                          key={idx}
                          className="bg-burgundy/[0.01] border border-burgundy/5 p-2 px-2.5 rounded-xl text-near-black/60"
                        >
                          <span className="block font-sans text-xs font-bold text-near-black/85 leading-tight">
                            {bookItem.title}
                          </span>
                          <span className="inline-block text-[8px] text-rose-pink font-bold uppercase tracking-widest mt-1 bg-rose-pink/5 px-1.5 py-0.5 rounded-full">
                            {bookItem.release}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <NavLink 
                  to="/contact"
                  className={({ isActive }) => 
                    `py-2 px-3 rounded-lg transition-all duration-200 block ${
                      isActive ? "text-burgundy bg-burgundy/5" : "text-burgundy/75 hover:text-burgundy"
                    }`
                  }
                >
                  Contact
                </NavLink>

                {/* Mobile CTA Button - Sleek and Smaller */}
                <Link
                  to="/books/judgy-wudgy"
                  className="mt-2 w-full text-center bg-rose-pink hover:bg-burgundy text-white font-sans text-[11px] uppercase tracking-widest font-extrabold rounded-full py-2.5 transition-all duration-300 block active:scale-[0.98]"
                >
                  Preorder Book
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
         </motion.nav>
      </div>
    </header>
  );
}
