"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(10, 10, 10, 0.95)",
          color: "#fff",
          border: "1px solid rgba(0, 217, 255, 0.2)",
          backdropFilter: "blur(12px)",
        },
        className: "font-mono text-sm",
      }}
      theme="dark"
    />
  );
}
