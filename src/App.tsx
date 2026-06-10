/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

function KlaviyoRouteTracker() {
  const location = useLocation();

  // Load the Klaviyo script dynamically on mount based on environment variable key configuration
  useEffect(() => {
    try {
      const companyId = (import.meta as any).env?.VITE_KLAVIYO_COMPANY_ID || "UPyWN8";
      const scriptId = "klaviyo-onsite-script";

      if (!document.getElementById(scriptId)) {
        // Initialize _learnq array
        (window as any)._learnq = (window as any)._learnq || [];

        // Setup standard klaviyo tracking snippet to load the script cleanly
        const script = document.createElement("script");
        script.id = scriptId;
        script.type = "text/javascript";
        script.async = true;
        script.src = `https://static.klaviyo.com/onsite/js/${companyId}/klaviyo.js`;
        document.head.appendChild(script);
        console.log(`[Klaviyo] Onsite script dynamically loaded for company id: ${companyId}`);
      }
    } catch (err) {
      console.warn("Error bootstrapping Klaviyo script:", err);
    }
  }, []);

  useEffect(() => {
    try {
      // Send Viewed Page event to Klaviyo onsite cue queue
      const _learnq = (window as any)._learnq || [];
      _learnq.push(['track', 'Viewed Page', {
        url: window.location.href,
        pathname: window.location.pathname,
        search: window.location.search
      }]);

      // Check for utm_email parameter to automatically identify and track the active visitor
      const searchParams = new URLSearchParams(location.search);
      const utmEmail = searchParams.get('utm_email');
      if (utmEmail) {
        const trimmedEmail = utmEmail.trim();
        _learnq.push(['identify', { '$email': trimmedEmail }]);
        _learnq.push(['track', 'Active on Site']);
        console.log(`[Klaviyo] Identified visitor via url utm_email: ${trimmedEmail}`);
      }

      // Dispatch standardized DOM state loads for Klaviyo scripts
      window.dispatchEvent(new Event('DOMContentLoaded'));
      window.dispatchEvent(new Event('load'));

      // Manually trigger onsite engine scan if loaded
      if ((window as any).Klaviyo && typeof (window as any).Klaviyo.init === 'function') {
        (window as any).Klaviyo.init();
      }
      if ((window as any).klaviyo && typeof (window as any).klaviyo.init === 'function') {
        (window as any).klaviyo.init();
      }
      
      window.dispatchEvent(new Event('klaviyoFormsReady'));
    } catch (err) {
      console.warn("Klaviyo trace error:", err);
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Track and re-init Klaviyo popups and tracking on route changes */}
      <KlaviyoRouteTracker />

      {/* Vercel Analytics integration */}
      <Analytics />
      
      {/* Container wrapper specifying maximum screen limits and cream theme baseline */}
      <div className="min-h-screen flex flex-col bg-cream text-near-black antialiased">
        {/* Shared Sticky Top Bar */}
        <Navbar />
        
        {/* Main core pages content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/judgy-wudgy" element={<BookPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Shared unified liquid glass Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
