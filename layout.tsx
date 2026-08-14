import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cinemahunt10.vercel.app"),
  title: { default: "CinemaHunt – Discover Movies, Ratings & Official Trailers", template: "%s | CinemaHunt" },
  description: "CinemaHunt helps movie fans discover trending, popular, top-rated, and upcoming films with movie information, cast details, and official trailers.",
  applicationName: "CinemaHunt",
  keywords: ["movies", "movie discovery", "movie ratings", "movie trailers", "upcoming movies", "CinemaHunt"],
  openGraph: { title: "CinemaHunt – Discover Your Next Movie", description: "Explore movies, ratings, cast details, release information, and official trailers.", url: "https://cinemahunt10.vercel.app", siteName: "CinemaHunt", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9961296446712353" />
      </head>
      <body className="min-h-full bg-[#050505] font-sans text-white">
        <Script async strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9961296446712353" crossOrigin="anonymous" />
        {children}
      </body>
    </html>
  );
}
