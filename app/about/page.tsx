export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-500">
          CinemaHunt
        </p>

        <h1 className="mb-8 text-4xl font-bold">
          About CinemaHunt
        </h1>

        <div className="space-y-6 leading-7 text-gray-300">
          <p>
            Welcome to CinemaHunt, a movie discovery platform built
            for movie fans.
          </p>

          <p>
            CinemaHunt helps visitors discover popular, upcoming, and
            trending movies in one simple and easy-to-use website.
          </p>

          <p>
            You can explore movie titles, ratings, release dates,
            descriptions, posters, and official trailers.
          </p>

          <p>
            Movie information and images may be provided through
            third-party services such as The Movie Database (TMDB).
          </p>

          <p>
            CinemaHunt does not intentionally host or distribute
            copyrighted full movies without the appropriate rights or
            permission.
          </p>

          <p>
            Our goal is to make discovering movies simple, enjoyable,
            and accessible for everyone.
          </p>
        </div>
      </div>
    </main>
  );
}