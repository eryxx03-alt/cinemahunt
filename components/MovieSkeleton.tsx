export function HeroSkeleton() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-black">
      <div className="absolute inset-0 animate-pulse bg-zinc-950" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="relative z-10 flex min-h-[70vh] items-end px-6 pb-16 md:pb-20">
        <div className="w-full max-w-2xl">

          <div className="mb-4 h-5 w-24 rounded-full bg-zinc-800" />

          <div className="mb-5 h-12 w-4/5 rounded-xl bg-zinc-800 md:h-16" />

          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-zinc-800" />
            <div className="h-4 w-11/12 rounded bg-zinc-800" />
            <div className="h-4 w-3/4 rounded bg-zinc-800" />
          </div>

          <div className="mt-7 flex gap-3">
            <div className="h-11 w-32 rounded-lg bg-zinc-800" />
            <div className="h-11 w-32 rounded-lg bg-zinc-800" />
          </div>

        </div>
      </div>
    </section>
  );
}