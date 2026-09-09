"use client";

import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
};

export default function WatchlistButton({ movie }: { movie: Movie }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cinemahunt-watchlist");

    if (stored) {
      const movies: Movie[] = JSON.parse(stored);
      setSaved(movies.some((item) => item.id === movie.id));
    }
  }, [movie.id]);

  function toggleWatchlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const stored = localStorage.getItem("cinemahunt-watchlist");
    const movies: Movie[] = stored ? JSON.parse(stored) : [];

    if (saved) {
      const updated = movies.filter((item) => item.id !== movie.id);
      localStorage.setItem(
        "cinemahunt-watchlist",
        JSON.stringify(updated)
      );
      setSaved(false);
    } else {
      const updated = [...movies, movie];
      localStorage.setItem(
        "cinemahunt-watchlist",
        JSON.stringify(updated)
      );
      setSaved(true);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleWatchlist}
      aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
      className="absolute left-2 top-2 z-10 rounded-full bg-black/75 p-2 text-lg backdrop-blur-sm transition hover:scale-110"
    >
      {saved ? "❤️" : "🤍"}
    </button>
  );
}