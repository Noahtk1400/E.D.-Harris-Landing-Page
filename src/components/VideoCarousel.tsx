/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX, Video, ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { videos } from "../content";

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Default fallback placeholders when videos array is empty as specified in the instructions
  const fallbackPlaceholders = [
    {
      id: "preview-1",
      poster: "placeholder-1",
      caption: "Flip through: First watercolor proof copies of Judgy Wudgy",
      tagline: "Behind the Scenes"
    },
    {
      id: "preview-2",
      poster: "placeholder-2",
      caption: "Read-along with E.D. Harris: Chapter 1 first reaction",
      tagline: "Author Read-Along"
    },
    {
      id: "preview-3",
      poster: "placeholder-3",
      caption: "Educator discussion: Teaching empathy & kindness",
      tagline: "Teacher Review"
    }
  ];

  const hasVideos = videos && videos.length > 0;
  const itemsCount = hasVideos ? videos.length : fallbackPlaceholders.length;

  // Handle playing only the focused video
  useEffect(() => {
    if (!hasVideos) return;
    
    videoRefs.current.forEach((videoEl, index) => {
      if (!videoEl) return;
      if (index === activeIndex) {
        videoEl.play().catch(() => {
          // Guard against autoplay block policies
        });
        videoEl.muted = isMuted;
      } else {
        videoEl.pause();
      }
    });
  }, [activeIndex, isMuted, hasVideos]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const containerWidth = scrollRef.current.offsetWidth;
    // Calculate the approximate index in focal point
    const cardWidth = 280; // approximate width of card including padding
    const calculatedIndex = Math.round(scrollLeft / cardWidth);
    const boundedIndex = Math.max(0, Math.min(itemsCount - 1, calculatedIndex));
    if (boundedIndex !== activeIndex) {
      setActiveIndex(boundedIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 280; // approximate width
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
    setActiveIndex(index);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div id="video-carousel" className="w-full py-12">
      <div className="flex items-center justify-between mb-8 px-4 max-w-[1000px] mx-auto">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-gold bg-gold/5 px-3 py-1 rounded-full">
            Peeks inside the stories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-burgundy tracking-tight mt-3">
            What our readers are sharing
          </h2>
        </div>
        
        {/* Navigation arrows for desktop/carousel assist */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            className="p-2 rounded-full border border-burgundy/15 text-burgundy/80 hover:bg-white/50 hover:text-burgundy transition-all disabled:opacity-35"
            disabled={activeIndex === 0}
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(itemsCount - 1, activeIndex + 1))}
            className="p-2 rounded-full border border-burgundy/15 text-burgundy/80 hover:bg-white/50 hover:text-burgundy transition-all disabled:opacity-35"
            disabled={activeIndex === itemsCount - 1}
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroller Container */}
      <div className="relative w-full overflow-hidden select-none">
        
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 md:px-0 py-4 scrollbar-none scroll-smooth touch-pan-x max-w-[1000px] mx-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {hasVideos ? (
            videos.map((vid, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  className={`w-[260px] md:w-full aspect-[9/16] shrink-0 md:shrink snap-center rounded-2xl overflow-hidden transition-all duration-500 relative cursor-pointer ${
                    isActive 
                      ? "ring-4 ring-rose-pink/40 md:ring-0 scale-102 md:scale-100 shadow-xl" 
                      : "opacity-60 md:opacity-100 scale-95 md:scale-100 shadow-sm"
                  } hover:scale-[1.02] hover:shadow-xl hover:ring-4 hover:ring-rose-pink/25 hover:z-10`}
                  onClick={() => {
                    if (isActive) {
                      toggleMute();
                    } else {
                      scrollToIndex(idx);
                    }
                  }}
                >
                  <video
                    ref={(el) => { videoRefs.current[idx] = el; }}
                    src={vid.src}
                    poster={vid.poster}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                    <p className="text-white font-sans text-xs font-semibold leading-relaxed">
                      {vid.caption}
                    </p>
                  </div>

                  {/* Interactivity indicators */}
                  {isActive ? (
                    <button 
                      className="absolute top-3 right-3 bg-black/40 backdrop-blur text-white p-1.5 rounded-full hover:bg-black/60 transition-all font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  ) : (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-rose-pink p-3 rounded-full text-white shadow-lg animate-pulse">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            // Render beautiful soft palette-wash placeholder cards at 9:16 aspect ratio with a small camera icon when videos array is empty
            fallbackPlaceholders.map((placeholder, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={placeholder.id}
                  className={`w-[260px] md:w-full aspect-[9/16] shrink-0 md:shrink snap-center rounded-2xl overflow-hidden transition-all duration-500 relative flex flex-col justify-between p-6 ${
                    isActive 
                      ? "ring-4 ring-rose-pink/30 md:ring-0 scale-102 md:scale-100 shadow-xl bg-gradient-to-tr from-[#D9628D]/15 via-[#BD955C]/15 to-[#5FAAD9]/15" 
                      : "opacity-60 md:opacity-100 scale-95 md:scale-100 shadow-sm bg-gradient-to-tr from-[#D9628D]/5 via-[#BD955C]/5 to-[#5FAAD9]/5"
                  } hover:scale-[1.02] hover:shadow-xl hover:ring-4 hover:ring-[#BD955C]/25 hover:z-10 bg-gradient-to-tr from-[#D9628D]/10 via-[#BD955C]/10 to-[#5FAAD9]/10 border border-burgundy/10`}
                  onClick={() => scrollToIndex(idx)}
                >
                  {/* Spot Top decor */}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[9px] uppercase tracking-widest font-bold text-burgundy bg-burgundy/10 px-2.5 py-1 rounded-full">
                      {placeholder.tagline}
                    </span>
                    <Camera className="h-4 w-4 text-burgundy/40" />
                  </div>

                  {/* Animated camera indicator in middle of active placeholder card */}
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-14 h-14 rounded-full bg-[#E6EBE1]/90 flex items-center justify-center shadow-inner border border-burgundy/5 mb-2">
                      <Video className="h-6 w-6 text-rose-pink animate-pulse" />
                    </div>
                    <span className="font-sans text-[10px] text-near-black/40 uppercase tracking-wider font-semibold">
                      Future video
                    </span>
                  </div>

                  {/* Descriptive caption text at bottom of card */}
                  <div className="bg-white/40 backdrop-blur-xs p-3 rounded-xl border border-burgundy/5">
                    <p className="font-sans text-[11px] font-bold text-near-black/80 leading-relaxed">
                      {placeholder.caption}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Sub-caption details under active slide for accessibility */}
      <div className="text-center mt-4 px-4 max-w-sm mx-auto md:hidden">
        <p className="font-sans text-xs text-near-black/60 italic leading-relaxed">
          {hasVideos 
            ? videos[activeIndex]?.caption 
            : fallbackPlaceholders[activeIndex]?.caption
          }
        </p>
      </div>

    </div>
  );
}
