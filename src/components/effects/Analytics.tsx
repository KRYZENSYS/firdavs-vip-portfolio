"use client";
import { Analytics } from "@vercel/analytics/react";

export default function AnalyticsProvider() {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return <Analytics />;
  }
  return null;
}
