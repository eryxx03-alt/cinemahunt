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

const siteUrl = "https://cinemahunt10.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "CinemaHunt – Discover Movies, Trailers & More",
    template: "%s | CinemaHunt",
  },

  applicationName: "CinemaHunt",

  description:
    "CinemaHunt is a movie discovery platform to explore trending, popular and top-rated movies, discover trailers, ratings and detailed movie information.",

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "CinemaHunt – Discover Movies, Trailers & More",
    description:
      "Explore trending, popular and top-rated movies, trailers, ratings and detailed movie information on CinemaHunt.",
    siteName: "CinemaHunt",
    type: "website",
    url: siteUrl,
  },

  twitter: {
    card: "summary_large_image",
    title: "CinemaHunt – Discover Movies, Trailers & More",
    description:
      "Explore trending, popular and top-rated movies, trailers, ratings and detailed movie information on CinemaHunt.",
  },

  // Add your Google verification token here when you have it:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  // },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "CinemaHunt",
  alternateName: "Cinema Hunt",
  url: siteUrl,
  description:
    "CinemaHunt is a movie discovery platform to explore trending, popular and top-rated movies, discover trailers, ratings and detailed movie information.",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "CinemaHunt",
  alternateName: "Cinema Hunt",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
  },
  description:
    "CinemaHunt is a movie discovery platform for exploring movies, ratings, trailers and detailed movie information.",
  sameAs: [
    "https://github.com/eryxx03-alt/cinemahunt",
  ],
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

        {/* CinemaHunt Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
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