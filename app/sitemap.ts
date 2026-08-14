import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cinemahunt10.vercel.app",
      lastModified: new Date(),
    },
  ];
}