import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center">

        {/* Logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-3xl bg-red-600/30 blur-2xl animate-pulse" />

          <Image
            src="/logo.png"
            alt="CinemaHunt"
            width={80}
            height={80}
            priority
            className="relative h-20 w-20 object-contain"
          />
        </div>

        {/* Brand */}
        <h1 className="text-2xl font-black tracking-tight text-white">
          Cinema<span className="text-red-500">Hunt</span>
        </h1>

        {/* Loading indicator */}
        <div className="mt-6 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500" />
        </div>

        <p className="mt-3 text-xs font-medium tracking-widest text-zinc-500">
          DISCOVER • EXPLORE • WATCH
        </p>
      </div>
    </div>
  );
}