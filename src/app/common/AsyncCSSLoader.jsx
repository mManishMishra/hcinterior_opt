"use client";

import { useEffect } from "react";

/**
 * AsyncCSSLoader - Loads CSS files asynchronously to prevent render-blocking
 * This component loads non-critical CSS after the page has rendered
 * Improves FCP, LCP, and Speed Index by deferring non-critical CSS
 */
export default function AsyncCSSLoader() {
  useEffect(() => {
    // Load CSS files asynchronously after initial render
    // This prevents render-blocking and improves performance
    
    const loadCSS = (href, id) => {
      // Check if already loaded
      if (id && document.getElementById(id)) {
        return;
      }

      // Check if link already exists
      const existingLink = document.querySelector(`link[href="${href}"]`);
      if (existingLink) {
        return;
      }

      // Create link element
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.id = id;
      
      // Use media="print" trick to load CSS asynchronously
      // Then switch to "all" once loaded
      link.media = "print";
      link.onload = function() {
        this.media = "all";
      };

      // Fallback for browsers that don't support onload
      link.onerror = function() {
        this.media = "all";
      };

      // Append to head
      document.head.appendChild(link);
    };

    // Small delay to ensure page has rendered
    const timer = setTimeout(() => {
      // Load style.css from public folder asynchronously
      // Note: This assumes the CSS is accessible at this path
      // For Next.js bundled CSS, we'll handle it differently
      loadCSS("/style/style.css", "async-style-css");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
