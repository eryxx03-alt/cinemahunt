"use client";

interface TrailerModalProps {
  trailerKey: string;
  title?: string;
  onClose: () => void;
}

export default function TrailerModal({
  trailerKey,
  title = "Movie Trailer",
  onClose,
}: TrailerModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute right-3 top-3 z-20 rounded-full bg-black/80 px-4 py-2 text-xl font-bold text-white transition hover:bg-red-600"
        >
          ✕
        </button>

        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            title={`${title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}