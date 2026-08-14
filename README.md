# CinemaHunt

CinemaHunt is a movie-discovery website built with Next.js, React, Tailwind CSS, and TMDB data.

## What was upgraded

- Responsive navigation with mobile menu and movie search
- Trending, popular, top-rated, now-playing, and upcoming sections
- Genre browsing and genre-specific movie pages
- Movie search page
- Rich movie detail pages with ratings, release date, runtime, genres, cast, and official trailer
- Related-movie recommendations
- Improved About, Contact, Privacy Policy, and Terms pages
- SEO metadata, sitemap, robots rules, loading/error/404 states
- More accessible image alt text and buttons
- Replaced streaming-style wording with legitimate official-trailer language
- No full-movie hosting or unauthorized download functionality

## Environment variable

Create a `.env.local` file locally or add the same variable in Vercel:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

Do not commit your real API key to GitHub.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Vercel deployment

1. Push the updated project to the GitHub repository connected to Vercel.
2. In Vercel, open the project settings and add `NEXT_PUBLIC_TMDB_API_KEY` under Environment Variables.
3. Redeploy the project.

## AdSense note

This project includes the existing Google AdSense account meta tag/script. AdSense approval is not guaranteed by code changes. Before applying, add genuinely original editorial content and reviews, verify every page and external link, and make sure the site follows Google's current publisher policies.

## Attribution

CinemaHunt uses TMDB for movie data and images but is not endorsed or certified by TMDB. Trailer playback is provided through YouTube when an official trailer is available.
