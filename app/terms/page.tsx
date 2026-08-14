export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-500">
          CinemaHunt
        </p>

        <h1 className="mb-4 text-4xl font-bold">
          Terms & Conditions
        </h1>

        <p className="mb-10 text-gray-500">
          Last updated: August 14, 2026
        </p>

        <div className="space-y-8 leading-7 text-gray-300">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              1. Acceptance of Terms
            </h2>

            <p>
              By accessing and using CinemaHunt, you agree to these
              Terms & Conditions. If you do not agree with these
              terms, please do not use the website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              2. About CinemaHunt
            </h2>

            <p>
              CinemaHunt is a movie discovery website that provides
              information about movies, including titles, ratings,
              release dates, descriptions, images, and trailers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              3. Content
            </h2>

            <p>
              CinemaHunt may display information and media provided by
              third-party services. We do not claim ownership of
              third-party copyrighted material.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              4. Copyright
            </h2>

            <p>
              Users must not use CinemaHunt to upload, distribute, or
              share copyrighted movies or other content without the
              necessary permission or rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              5. Third-Party Links
            </h2>

            <p>
              CinemaHunt may contain links or embedded content from
              third-party websites. We are not responsible for the
              content, availability, or policies of third-party
              websites.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              6. Website Availability
            </h2>

            <p>
              We try to keep CinemaHunt available and functioning
              properly, but we cannot guarantee uninterrupted access
              to the website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              7. Changes to These Terms
            </h2>

            <p>
              CinemaHunt may update these Terms & Conditions from time
              to time. Updated terms will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              8. Contact
            </h2>

            <p>
              If you have questions about these Terms & Conditions,
              contact us at{" "}
              <a
                href="mailto:eryxx.03@gmail.com"
                className="text-red-500 hover:text-red-400"
              >
                eryxx.03@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}