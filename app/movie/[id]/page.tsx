"use client";

import { useEffect, useState } from "react";

type WishlistButtonProps = {
  movie: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
  };
};

const STORAGE_KEY = "cinemahunt-wishlist";

export default function WishlistButton({
  movie,
}: WishlistButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const wishlist = stored ? JSON.parse(stored) : [];

      if (Array.isArray(wishlist)) {
        setSaved(
          wishlist.some((item) => item.id === movie.id)
        );
      }
    } catch {
      setSaved(false);
    }
  }, [movie.id]);

  function toggleWishlist() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const wishlist = stored ? JSON.parse(stored) : [];

      if (!Array.isArray(wishlist)) return;

      if (wishlist.some((item) => item.id === movie.id)) {
        const updated = wishlist.filter(
          (item) => item.id !== movie.id
        );

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );

        setSaved(false);
      } else {
        const updated = [...wishlist, movie];

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );

        setSaved(true);
      }

      window.dispatchEvent(
        new Event("wishlist-updated")
      );
    } catch {
      console.error("Failed to update wishlist");
    }
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      className={`rounded-xl border px-6 py-3.5 text-sm font-bold backdrop-blur-md transition-all duration-300 ${
        saved
          ? "border-red-500/40 bg-red-500/15 text-red-400"
          : "border-white/10 bg-white/[0.06] text-white hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
      }`}
    >
      {saved ? "♥ In Wishlist" : "♡ Add to Wishlist"}
    </button>
  );
}