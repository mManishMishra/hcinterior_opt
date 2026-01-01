"use client";

// react-toastify CSS is now loaded in layout.js to prevent duplicate imports
import { ToastContainer } from "react-toastify";
import ClientProvider from "../store/ClientProvider";

export default function ClientLayout({ children }) {
  return (
    <ClientProvider>
      {children}
      <ToastContainer />
    </ClientProvider>
  );
}