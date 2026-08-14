export function HeroSkeleton() {
  return (
    <section className="relative min-h-[70vh] animate-pulse bg-[#111]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />

      <div className="relative z-10 flex min-h-[70vh] items-end px-6 pb-20">
        <div className="w-full max-w-2xl">
          <div className="mb-4 h-12 w-3/4 rounded bg-white/10" />
          <div className="mb-2 h-4 w-full rounded bg-white/10" />
          <div className="mb-2 h-4 w-5/6 rounded bg-white/10" />
          <div className="mt-6 h-10 w-32 rounded bg-white/10" />
        </div>
      </div>
    </section>
  );
}