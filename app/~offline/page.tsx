import Image from "next/image";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-center">
      <div className="flex max-w-md flex-col items-center">
        {/* Logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-3xl bg-red-600/30 blur-2xl" />

          <Image
            src="/logo.png"
            alt="CinemaHunt"
            width={90}
            height={90}
            priority
            className="relative h-[90px] w-[90px] object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-white">
          You&apos;re offline
        </h1>

        {/* Description */}
        <p className="mt-3 text-zinc-400">
          CinemaHunt needs an internet connection to discover
          movies and load fresh content.
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="mt-7 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-500"
        >
          Back to CinemaHunt
        </Link>
      </div>
    </main>
  );
}