"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "opening" | "playing" | "closing";

const LENS_SIZE = "min(75vw, 75vh)";
const OPEN_DURATION = 900;
const FADE_DURATION = 600;

export default function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("opening");

  // After aperture opens → play video
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("playing");
      videoRef.current?.play().catch(() => {});
    }, OPEN_DURATION);
    return () => clearTimeout(t);
  }, []);

  // Video ends → start closing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnd = () => {
      setPhase("closing");
      setTimeout(onComplete, FADE_DURATION);
    };
    video.addEventListener("ended", onEnd);
    return () => video.removeEventListener("ended", onEnd);
  }, []);

  if (phase === "closing") return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#000",
      animation: `fadeOut ${FADE_DURATION}ms ease forwards`,
    }} />
  );

  return (
    <>
      <style>{`
        @keyframes apertureOpen {
          0%   { clip-path: circle(0% at 50% 50%); opacity: 0; }
          15%  { opacity: 1; }
          100% { clip-path: circle(51% at 50% 50%); opacity: 1; }
        }
        @keyframes hudFadeIn {
          0%   { opacity: 0; }
          60%  { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes recBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      {/* Backdrop */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>

        {/* HUD outer ring */}
        <div style={{
          position: "absolute",
          width: `calc(${LENS_SIZE} + 80px)`,
          height: `calc(${LENS_SIZE} + 80px)`,
          borderRadius: "50%",
          border: "1px solid rgba(125, 211, 252, 0.25)",
          animation: `hudFadeIn ${OPEN_DURATION + 200}ms ease forwards`,
        }}>
          {/* f/stop — top left */}
          <span style={{
            position: "absolute", top: "30px", left: "50%",
            transform: "translateX(-90px)",
            color: "rgba(125,211,252,0.8)", fontSize: "11px",
            fontFamily: "monospace", letterSpacing: "0.1em",
          }}>f/1.8</span>

          {/* Focal length — top center */}
          <span style={{
            position: "absolute", top: "12px", left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(125,211,252,0.5)", fontSize: "10px",
            fontFamily: "monospace", letterSpacing: "0.15em",
          }}>50mm</span>

          {/* REC indicator — top right */}
          <span style={{
            position: "absolute", top: "30px", left: "50%",
            transform: "translateX(50px)",
            color: "#ef4444", fontSize: "11px",
            fontFamily: "monospace",
            animation: "recBlink 1.2s ease infinite",
          }}>◉ REC</span>

          {/* Focus distance — bottom */}
          <span style={{
            position: "absolute", bottom: "14px", left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(125,211,252,0.4)", fontSize: "10px",
            fontFamily: "monospace", letterSpacing: "0.2em", whiteSpace: "nowrap",
          }}>∞ ─────●───── 1m</span>

          {/* APERTURE — left vertical */}
          <span style={{
            position: "absolute", top: "50%", left: "4px",
            transform: "translateY(-50%) rotate(-90deg)",
            color: "rgba(125,211,252,0.3)", fontSize: "9px",
            fontFamily: "monospace", letterSpacing: "0.3em",
          }}>APERTURE</span>

          {/* FOCUS — right vertical */}
          <span style={{
            position: "absolute", top: "50%", right: "4px",
            transform: "translateY(-50%) rotate(90deg)",
            color: "rgba(125,211,252,0.3)", fontSize: "9px",
            fontFamily: "monospace", letterSpacing: "0.3em",
          }}>FOCUS</span>
        </div>

        {/* Glass rings */}
        <div style={{
          position: "absolute",
          width: `calc(${LENS_SIZE} + 48px)`,
          height: `calc(${LENS_SIZE} + 48px)`,
          borderRadius: "50%",
          boxShadow: `
            0 0 0 2px #111,
            0 0 0 6px #1e1e1e,
            0 0 0 8px #0a0a0a,
            0 0 0 12px #1a1a1a,
            0 0 0 14px rgba(125, 211, 252, 0.15),
            0 0 40px rgba(125, 211, 252, 0.08)
          `,
        }} />

        {/* The lens — aperture animation */}
        <div style={{
          width: LENS_SIZE,
          height: LENS_SIZE,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          animation: `apertureOpen ${OPEN_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.8)",
        }}>
          <video
            ref={videoRef}
            src="/Murat_Atilgan.V01.mp4"
            muted
            playsInline
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "100%", minHeight: "100%",
              width: "auto", height: "auto",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Inner lens glow */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(125,211,252,0.04) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
        </div>

      </div>
    </>
  );
}
