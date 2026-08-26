"use client";

import { useState } from "react";

const avatars = [
  "🦸",
  "🧙",
  "🥷",
  "🧛",
  "🧟",
  "👽",
  "🤖",
  "🐼",
  "🦊",
  "🐯",
];

export default function ProfilePage() {
  const [name, setName] = useState("Adam");
  const [selectedAvatar, setSelectedAvatar] = useState("🦸");
  const [customize, setCustomize] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">

        <div className="w-full max-w-lg text-center">

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={() => setCustomize(true)}
            className="group relative mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-white/10 bg-gradient-to-br from-zinc-800 to-black shadow-2xl transition duration-300 hover:scale-105 hover:border-red-500/70"
          >
            <span className="text-7xl">
              {selectedAvatar}
            </span>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition group-hover:opacity-100">
              <span className="text-sm font-bold">
                Change
              </span>
            </div>
          </button>

          {/* Name */}
          <h1 className="mt-6 text-3xl font-bold">
            {name}
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Click your profile picture to customize
          </p>

          {/* Customize */}
          {customize && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left shadow-2xl backdrop-blur-xl">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    Customize Profile
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Choose your character and name.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCustomize(false)}
                  className="text-2xl text-zinc-500 transition hover:text-white"
                >
                  ×
                </button>
              </div>

              {/* Avatar Selection */}
              <div className="mt-7">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Choose Avatar
                </h3>

                <div className="grid grid-cols-5 gap-3">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`flex aspect-square items-center justify-center rounded-2xl border text-3xl transition duration-200 hover:scale-105 ${
                        selectedAvatar === avatar
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="mt-8">
                <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Profile Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={30}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/60"
                />
              </div>

              {/* Save */}
              <button
                type="button"
                onClick={() => setCustomize(false)}
                className="mt-7 w-full rounded-full bg-red-600 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-red-500"
              >
                Save Profile
              </button>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}