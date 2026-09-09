export default function MovieSkeleton() {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-zinc-900">
      <div className="aspect-[2/3] w-full animate-pulse bg-zinc-800" />

      <div className="flex min-h-[120px] flex-1 flex-col gap-3 p-3">
        <div className="h-5 w-4/5 animate-pulse rounded bg-zinc-800" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-800" />

        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}