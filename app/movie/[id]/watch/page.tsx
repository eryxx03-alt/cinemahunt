import { getMovieDetails } from "@/lib/tmdb";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">
          ▶ Watching: {movie.title}
        </h1>

        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-[#111]">
          <video
            className="h-full w-full"
            controls
            playsInline
            preload="metadata"
          >
            <source
              src="https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4"
              type="video/mp4"
            />
            Your browser does not support video playback.
          </video>
        </div>

        <p className="mt-6 text-gray-400">
          This is a test video. Replace it with a movie you own,
          have licensed, or that is in the public domain.
        </p>
      </div>
    </main>
  );
}