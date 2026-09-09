"use client";

import { useState } from "react";
import TrailerModal from "./TrailerModal";

interface TrailerButtonProps {
  videoKey: string;
  title?: string;
}

export default function TrailerButton({
  videoKey,
  title = "Movie Trailer",
}: TrailerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        ▶ Watch Trailer
      </button>

      {open && (
        <TrailerModal
          trailerKey={videoKey}
          title={title}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}