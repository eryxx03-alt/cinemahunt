"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    console.log("Signup:", email, password);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 pt-20">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Create your account
        </h1>

        <p className="mb-8 text-gray-400">
          Join CinemaHunt and discover your next movie.
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}