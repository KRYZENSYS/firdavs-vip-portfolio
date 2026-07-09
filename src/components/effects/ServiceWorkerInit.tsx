"use client";
import { useEffect } from "react";

export default function ServiceWorkerInit() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => { /* registered */ })
      .catch(() => { /* offline-first disabled */ });
  }, []);
  return null;
}
