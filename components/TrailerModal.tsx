"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type TrailerModalProps = {
  trailerKey: string | null;
  title?: string;
  onClose: () => void;
};

export default function TrailerModal({
  trailerKey,
  title = "Trailer",
  onClose,
}: TrailerModalProps) {
  useEffect(() => {
    if (!trailerKey) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [trailerKey, onClose]);

  if (!trailerKey) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer`}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-red-950/30"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-red-600"
        >
          <X size={20} />
        </button>

        <div className="aspect-video w-full">
          <iframe
           src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&enablejsapi=1&playsinline=1`}
            title={`${title} trailer`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}