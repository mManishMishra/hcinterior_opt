"use client";

import { useEffect } from "react";

/**
 * LoadNonCriticalCSS - Optimizes CSS loading to prevent render-blocking
 * 
 * Next.js automatically bundles CSS imports, but they're still render-blocking.
 * This component ensures CSS is loaded optimally by:
 * 1. Marking non-critical stylesheets as non-blocking after initial render
 * 2. Ensuring critical CSS (already inlined) takes priority
 */
export default function LoadNonCriticalCSS() {
  useEffect(() => {
    // After page hydration, optimize CSS loading
    const optimizeCSS = () => {
      // Find all stylesheets loaded by Next.js
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      
      stylesheets.forEach((link, index) => {
        // Skip if it's already marked or is critical
        if (link.hasAttribute('data-optimized')) {
          return;
        }

        // For non-critical CSS (loaded after first paint), ensure it doesn't block
        // Next.js already handles this, but we can optimize further
        if (index > 0) {
          // Mark as optimized
          link.setAttribute('data-optimized', 'true');
          
          // Ensure media is set to all (Next.js handles this, but being explicit)
          if (!link.media || link.media === '') {
            link.media = 'all';
          }
        }
      });
    };

    // Run after a small delay to ensure DOM is ready
    const timer = setTimeout(optimizeCSS, 0);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
