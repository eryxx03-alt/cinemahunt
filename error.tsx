"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-center text-white"><div><p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="mt-3 text-3xl font-black">Something went wrong</h1><p className="mx-auto mt-3 max-w-lg text-gray-500">We could not load this page right now. Please try again.</p><div className="mt-6 flex justify-center gap-3"><button onClick={() => reset()} className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500">Try again</button><Link href="/" className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold hover:bg-white/10">Home</Link></div></div></main>;
}
