import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: "https://firdavsvip.uz/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: "https://firdavsvip.uz/#about", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://firdavsvip.uz/#projects", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: "https://firdavsvip.uz/#contact", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
