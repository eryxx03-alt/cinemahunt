"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm font-bold text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:border-red-500/40 hover:bg-red-600/20 hover:text-red-400"
    >
      <ArrowLeft
        size={18}
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      />

      <span>Back</span>
    </button>
  );
}