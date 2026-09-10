import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cinemahunt10.vercel.app"),

  title: {
    default: "CinemaHunt",
    template: "%s | CinemaHunt",
  },

  applicationName: "CinemaHunt",

  description:
    "Explore trending, top-rated and upcoming movies. Find ratings, trailers and movie details on CinemaHunt.",

  alternates: {
    canonical: "https://cinemahunt10.vercel.app",
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "CinemaHunt",
    description:
      "Explore trending, top-rated and upcoming movies on CinemaHunt.",
    siteName: "CinemaHunt",
    type: "website",
    url: "https://cinemahunt10.vercel.app",
  },

  // Add your Google verification token here when you have it:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  // },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CinemaHunt",
  alternateName: "Cinema Hunt",
  url: "https://cinemahunt10.vercel.app",
  description:
    "Explore trending, top-rated and upcoming movies. Find ratings, trailers and movie details on CinemaHunt.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://cinemahunt10.vercel.app/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-9961296446712353"
        />

        {/* CinemaHunt WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9961296446712353"
          crossOrigin="anonymous"
        />

        {children}
      </body>
    </html>
  );
}