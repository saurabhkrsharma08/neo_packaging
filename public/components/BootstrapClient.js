"use client"; // Mark this as a Client Component

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js"); // Dynamically import Bootstrap JS
  }, []);

  return null; // This component doesn't render anything, it just loads Bootstrap
}
