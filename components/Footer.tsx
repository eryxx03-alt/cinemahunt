import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] px-6 py-10 text-sm text-gray-500">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
          <Link
            href="/about"
            className="transition hover:text-white"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-white"
          >
            Contact
          </Link>

          <Link
            href="/privacy"
            className="transition hover:text-white"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="transition hover:text-white"
          >
            Terms & Conditions
          </Link>
        </div>

        <p>
          © 2026 CinemaHunt. All rights reserved.
        </p>
      </div>
    </footer>
  );
}