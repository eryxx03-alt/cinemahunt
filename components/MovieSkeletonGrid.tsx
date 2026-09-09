import MovieSkeleton from "@/components/MovieSkeleton";

export default function MovieSkeletonGrid({
  count = 12,
}: {
  count?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  );
}