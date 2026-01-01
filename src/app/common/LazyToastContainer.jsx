"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * LazyToastContainer - Lazy loads ToastContainer to reduce initial bundle size
 * ToastContainer is only needed when toasts are shown, so we can load it on demand
 */
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  {
    ssr: false,
    loading: () => null, // No loading indicator needed
  }
);

export default function LazyToastContainer() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Load ToastContainer after initial render to improve FCP
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <ToastContainer />;
}

