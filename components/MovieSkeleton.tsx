export default function MovieSkeleton() {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80">
      {/* Poster skeleton */}
      <div className="aspect-[2/3] w-full animate-pulse bg-zinc-800" />

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-3/5 animate-pulse rounded bg-zinc-800" />
        </div>

        {/* Year + rating */}
        <div className="mt-3 flex items-center justify-between">
          <div className="h-3 w-12 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-10 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
