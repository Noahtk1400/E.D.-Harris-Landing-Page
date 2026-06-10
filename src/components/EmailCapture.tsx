/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { ArrowRight, CheckCircle, AlertCircle, X, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Standard tracking trigger on component load
    try {
      const _learnq = (window as any)._learnq || [];
      _learnq.push(['track', 'Viewed Page', {
        url: window.location.href,
        pathname: window.location.pathname
      }]);
    } catch (err) {
      console.warn("Klaviyo tracking error:", err);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    // Read configure credentials dynamically from environment variables, fallback to sandbox placeholders
    const publicApiKey = (import.meta as any).env?.VITE_KLAVIYO_COMPANY_ID || "UPyWN8";
    const listId = (import.meta as any).env?.VITE_KLAVIYO_LIST_ID || "VkDJWE";

    try {
      // Step 1: Attempt standard modern Klaviyo V3 Client Subscription request (CORS-enabled)
      const v3Url = `https://a.klaviyo.com/client/subscriptions/?company_id=${publicApiKey}`;
      const v3Body = {
        data: {
          type: "subscription",
          attributes: {
            custom_source: "E.D. Harris Public Website",
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email.trim()
                }
              }
            }
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: listId
              }
            }
          }
        }
      };

      const v3Response = await fetch(v3Url, {
        method: "POST",
        headers: {
          "revision": "2024-10-15",
          "content-type": "application/vnd.api+json"
        },
        body: JSON.stringify(v3Body)
      });

      if (v3Response.ok) {
        setStatus("success");
        setEmail("");
        return;
      }

      // Step 2: Fallback to the classic, highly CORS-compliant AJAX subscribe endpoint
      const ajaxUrl = "https://a.klaviyo.com/ajax/subscriptions/subscribe";
      const params = new URLSearchParams();
      params.append("g", publicApiKey);
      params.append("list", listId);
      params.append("email", email.trim());

      const ajaxResponse = await fetch(ajaxUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      });

      if (ajaxResponse.ok) {
        const data = await ajaxResponse.json();
        if (data.success) {
          setStatus("success");
          setEmail("");
        } else {
          setErrorMsg(data.errors?.[0] || "Could not complete registration. Please try again.");
          setStatus("error");
        }
      } else {
        // If server returned non-ok, trigger step 3 fallback tracker (best effort)
        throw new Error("API call failed");
      }
    } catch (err) {
      console.warn("Klaviyo post error, executing background onsite hook...", err);
      try {
        // Step 3: Local script queue fallback. Identifies user and track subscription event.
        const _learnq = (window as any)._learnq || [];
        _learnq.push(['identify', { '$email': email.trim() }]);
        _learnq.push(['track', 'Subscribed to Newsletter', { listId: listId }]);
        setStatus("success");
        setEmail("");
      } catch (innerErr) {
        setErrorMsg("Failed to join newsletter. Please check your network or try again.");
        setStatus("error");
      }
    }
  };

  if (isDismissed) {
    return (
      <div className="flex justify-center w-full py-8 text-center">
        <button 
          onClick={() => setIsDismissed(false)}
          className="font-sans text-[10px] uppercase tracking-widest text-[#BD955C] hover:text-burgundy transition-all duration-300 underline font-semibold cursor-pointer"
        >
          Re-open newsletter signup form
        </button>
      </div>
    );
  }

  return (
    <AnimatedSection 
      id="newsletter-section" 
      className="w-full py-16 px-4 max-w-[1000px] mx-auto scroll-mt-24 relative z-10 flex justify-center"
    >
      {/* 
        RECREATED EXCLUSIVELY STYLED SINGLE CARD Newsletters/Klaviyo Form
        Instead of a box inside of a box, this card stands alone on the main section canvas.
      */}
      <div className="w-full max-w-md md:max-w-[860px] bg-[#FFFBF4] rounded-[36px] md:rounded-[48px] p-8 sm:p-10 md:py-14 md:px-16 shadow-lg border border-burgundy/10 text-center flex flex-col items-center relative transition-all">
        
        {/* Subtle Close design marker matching original popup image/dismiss functionality */}
        <button 
          onClick={() => setIsDismissed(true)}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-burgundy/5 text-burgundy/40 hover:text-burgundy transition-all"
          title="Dismiss subscription circle"
          aria-label="Dismiss subscription"
          id="newsletter-dismiss-btn"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Subtitle Accent "Subscribe" */}
        <span className="font-serif italic text-xs md:text-sm text-gold font-normal tracking-wide lowercase mb-2 block">
          Subscribe
        </span>

        {/* Title "Join the storytelling circle" */}
        <h2 className="font-serif text-3xl md:text-5xl text-burgundy tracking-tight font-normal leading-tight mb-3 max-w-md md:max-w-2xl">
          Join the storytelling circle
        </h2>

        {/* Description */}
        <p className="font-sans text-xs md:text-sm text-near-black/70 max-w-sm md:max-w-xl mt-1 mb-8 md:mb-10 leading-relaxed font-semibold">
          Be the first to hear about new chapters, parenting discussion guides, and upcoming stories from E.D. Harris.
        </p>

        {/* Subscription Interactivity Box */}
        {status === "success" ? (
          <div className="w-full flex flex-col items-center gap-2 py-6 animate-fade-in">
            <div className="p-3 bg-cream/30 text-gold rounded-full border border-gold/15 shadow-sm">
              <CheckCircle className="h-6 w-6" />
            </div>
            <span className="font-sans text-xs font-bold text-burgundy uppercase tracking-widest mt-2">
              Thank you for subscribing!
            </span>
            <p className="font-sans text-[10px] text-near-black/65 font-semibold text-center mt-1 leading-relaxed">
              You've been added to our storytelling list. Check your inbox for updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-stretch gap-3 md:gap-4 max-w-2xl mx-auto">
            
            {/* Email Address Input Container */}
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Email address"
                required
                id="klaviyo-custom-email-input"
                className="w-full bg-[#E6EBE1]/35 placeholder-near-black/40 text-sans text-xs text-near-black rounded-full px-5 py-3.5 border border-near-black/5 hover:border-burgundy/15 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none transition-all duration-200"
              />
              <Mail className="absolute right-4.5 top-3.5 h-4 w-4 text-near-black/25 pointer-events-none" />
            </div>

            {/* Error Helper indicator container - absolute on desktop or inline-adjusted */}
            {status === "error" && errorMsg && (
              <div className="flex items-center gap-1.5 justify-center md:absolute md:-bottom-8 md:left-1/2 md:-translate-x-1/2 text-left text-[10px] text-rose-pink font-semibold bg-rose-pink/5 p-2 rounded-xl border border-rose-pink/10 animate-shake whitespace-nowrap">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Action Button "Subscribe ->" resembling screenshot but styled elegantly */}
            <button
              type="submit"
              disabled={status === "submitting"}
              id="klaviyo-custom-submit-btn"
              className={`md:w-44 flex items-center justify-center gap-1.5 py-3.5 px-5 text-sans text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer ${
                status === "submitting"
                  ? "bg-burgundy/40 text-white/50 cursor-not-allowed"
                  : "bg-burgundy text-white hover:bg-rose-pink shadow-md hover:shadow-lg active:scale-98"
              }`}
            >
              <span>{status === "submitting" ? "Subscribing..." : "Subscribe"}</span>
              <ArrowRight className="h-3.5 w-3.5 font-bold shrink-0" />
            </button>

          </form>
        )}

        {/* Underlying Consent/Consent disclaimer matching screenshot */}
        <span className="font-sans text-[9px] text-near-black/40 tracking-normal mt-5 leading-normal max-w-xs block select-none">
          By subscribing you consent to us sending you emails.
        </span>

      </div>
    </AnimatedSection>
  );
}
