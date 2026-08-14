export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-500">
          CinemaHunt
        </p>

        <h1 className="mb-8 text-4xl font-bold">
          Contact Us
        </h1>

        <div className="rounded-2xl bg-[#111] p-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Get in Touch
          </h2>

          <p className="leading-7 text-gray-300">
            If you have questions, feedback, suggestions, or concerns
            about CinemaHunt, you can contact our team.
          </p>

          <div className="mt-6">
            <p className="text-gray-400">
              Email:
            </p>

            <a
              href="mailto:eryxx.03@gmail.com"
              className="text-red-500 hover:text-red-400"
            >
              eryxx.03@gmail.com
            </a>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-6">
            <h2 className="mb-3 text-xl font-semibold">
              Copyright & Content Concerns
            </h2>

            <p className="leading-7 text-gray-400">
              If you believe content on CinemaHunt violates your
              copyright or rights, please contact us using the email
              above with the relevant details so we can review your
              concern.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}