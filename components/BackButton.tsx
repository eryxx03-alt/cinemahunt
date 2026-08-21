"use client";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:bg-white/20"
    >
      ← Back
    </button>
  );
}