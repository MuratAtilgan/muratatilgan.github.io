"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
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
    setTimeout(onComplete, 600);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-600
        ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <video
        ref={videoRef}
        src="/Murat_Atilgan.V01.mp4"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
