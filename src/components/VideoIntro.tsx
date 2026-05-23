"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    video.addEventListener("ended", handleClose);
    return () => video.removeEventListener("ended", handleClose);
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onComplete, 400);
  }

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((prev) => !prev);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center
        transition-opacity duration-400 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <video
        ref={videoRef}
        src="/Murat_Atilgan.V01.mp4"
        muted
        playsInline
        className="max-w-full max-h-full w-full h-full object-contain"
      />

      <div className="absolute top-6 right-6 flex gap-3">
        <button
          onClick={toggleMute}
          className="px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-600
            rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors"
        >
          {muted ? "🔇 Unmute" : "🔊 Muted"}
        </button>

        <button
          onClick={handleClose}
          className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg text-sm
            font-semibold hover:bg-white transition-colors"
        >
          Skip →
        </button>
      </div>
    </div>
  );
}
