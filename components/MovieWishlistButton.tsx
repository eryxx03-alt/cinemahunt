"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  vote_average?: number | null;
};

type Props = {
  movie: Movie;
};

const WISHLIST_KEY = "cinemahunt-wishlist";

export default function MovieWishlistButton({ movie }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      const wishlist = stored ? JSON.parse(stored) : [];

      setSaved(
        Array.isArray(wishlist) &&
          wishlist.some((item) => item?.id === movie.id)
      );
    } catch {
      setSaved(false);
    }
  }, [movie]);

  function toggleWishlist() {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      const wishlist = stored ? JSON.parse(stored) : [];

      if (!Array.isArray(wishlist)) return;

      let updated;

      if (saved) {
        updated = wishlist.filter(
          (item) => item?.id !== movie.id
        );
      } else {
        updated = [...wishlist, movie];
      }

      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(updated)
      );

      setSaved(!saved);

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch {
      console.error("Wishlist update failed");
    }
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition-all duration-300 ${
        saved
          ? "border-red-500/50 bg-red-500/10 text-red-400"
          : "border-white/10 bg-white/[0.06] text-white hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
      }`}
    >
      <Heart
        size={18}
        className={saved ? "fill-current" : ""}
      />

      {saved ? "Added to Wishlist" : "Add to Wishlist"}
    </button>
  );
}