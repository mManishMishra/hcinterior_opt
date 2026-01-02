"use client";

import { useEffect } from "react";

export default function AddBootstrap()
{
    useEffect(()=>{
        // Dynamically import Bootstrap JS to avoid blocking initial render
        // Bootstrap is needed for carousel, modals, dropdowns, etc.
        import("bootstrap/dist/js/bootstrap.bundle.js").catch((error) => {
            // Silently handle import errors in production
            if (process.env.NODE_ENV === 'development') {
                console.error('Failed to load Bootstrap JS:', error);
            }
        });
    },[])
    return <></>
}