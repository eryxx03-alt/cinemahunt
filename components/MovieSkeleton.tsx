```tsx
export default function MovieSkeleton() {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80">
      {/* Poster skeleton */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title - matches 2 line movie title */}
        <div className="space-y-2">
          <div className="relative h-4 w-full overflow-hidden rounded bg-zinc-800">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative h-4 w-3/5 overflow-hidden rounded bg-zinc-800">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Year + rating */}
        <div className="mt-3 flex items-center justify-between">
          <div className="relative h-3 w-12 overflow-hidden rounded bg-zinc-800">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="relative h-3 w-10 overflow-hidden rounded bg-zinc-800">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
```
