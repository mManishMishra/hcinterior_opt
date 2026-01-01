"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * ConditionalScriptLoader - Loads scripts conditionally based on route
 * This prevents loading heavy libraries (jQuery, DataTables) on pages that don't need them
 * 
 * @param {string} route - Current route path
 */
export default function ConditionalScriptLoader({ route = "" }) {
  // Determine if current route needs jQuery/DataTables
  // These are typically admin/dashboard pages
  const needsDataTables = route && (
    route.includes("/users") ||
    route.includes("/user-queries") ||
    route.includes("/queries-form") ||
    route.includes("/contact-us-form") ||
    route.includes("/product-form") ||
    route.includes("/experience-form") ||
    route.includes("/leads") ||
    route.includes("/manage-job") ||
    route.includes("/job-application") ||
    route.includes("/cms/") ||
    route.includes("/dashboard")
  );

  return (
    <>
      {needsDataTables && (
        <>
          {/* Load jQuery only when needed */}
          <Script
            src="https://code.jquery.com/jquery-3.6.0.min.js"
            strategy="lazyOnload"
            onLoad={() => {
              // jQuery loaded, can now load DataTables
            }}
          />
          {/* Load DataTables only when needed */}
          <Script
            src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"
            strategy="lazyOnload"
          />
        </>
      )}
    </>
  );
}

