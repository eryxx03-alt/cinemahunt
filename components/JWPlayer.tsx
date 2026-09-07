"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    jwplayer: any;
  }
}

type JWPlayerProps = {
  videoUrl: string;
  poster?: string;
  title?: string;
};

export default function JWPlayer({
  videoUrl,
  poster,
  title = "CinemaHunt",
}: JWPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: any;

    const loadPlayer = () => {
      if (!window.jwplayer || !playerRef.current) return;

      player = window.jwplayer(playerRef.current);

      player.setup({
        file: videoUrl,
        type: "hls",
        title,
        image: poster,
        width: "100%",
        aspectratio: "16:9",
        controls: true,
        preload: "metadata",
      });
    };

    if (window.jwplayer) {
      loadPlayer();
    } else {
      const script = document.createElement("script");

      // Replace this with YOUR JW Player cloud-hosted library URL.
      script.src = "YOUR_JW_PLAYER_LIBRARY_URL";
      script.async = true;

      script.onload = loadPlayer;

      document.body.appendChild(script);
    }

    return () => {
      if (player) {
        try {
          player.remove();
        } catch {}
      }
    };
  }, [videoUrl, poster, title]);

  return (
    <div
      ref={playerRef}
      className="w-full overflow-hidden rounded-xl bg-black"
    />
  );
}