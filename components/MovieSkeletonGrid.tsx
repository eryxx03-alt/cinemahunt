import MovieSkeleton from "@/components/MovieSkeleton";

type MovieSkeletonGridProps = {
  count?: number;
  movies?: unknown[];
};

export default function MovieSkeletonGrid({
  count = 12,
  movies,
}: MovieSkeletonGridProps) {
  const skeletonCount = movies?.length || count;

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  );
}