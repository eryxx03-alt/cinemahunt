import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cinemahunt10.vercel.app";
  const routes = ["", "/movies", "/popular", "/top-rated", "/genres", "/upcoming", "/search", "/about", "/contact", "/privacy", "/terms"];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "daily" : "weekly", priority: route === "" ? 1 : 0.7 }));
}
