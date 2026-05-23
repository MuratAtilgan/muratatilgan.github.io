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
        @keyframes t2Appear {
          0%   { opacity: 0; }
          75%  { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes orbitCW  { from { transform: rotate(0deg); }   to { transform: rotate(360deg);  } }
        @keyframes orbitCCW { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        @keyframes wobble1 {
          0%,100% { transform: rotate(-8deg)  scale(1);    }
          50%     { transform: rotate(12deg)  scale(1.12); }
        }
        @keyframes wobble2 {
          0%,100% { transform: rotate(6deg)   scale(0.94); }
          50%     { transform: rotate(-14deg) scale(1.08); }
        }
        @keyframes wobble3 {
          0%,100% { transform: rotate(0deg)   scale(1);    }
          33%     { transform: rotate(18deg)  scale(1.1);  }
          66%     { transform: rotate(-10deg) scale(0.9);  }
        }
      `}</style>

      {/* Goo filter — must be in DOM before used */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="t2-goo" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <radialGradient id="chrome-grad" cx="30%" cy="22%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="20%"  stopColor="#e8e8e8" />
            <stop offset="50%"  stopColor="#a0a0a0" />
            <stop offset="80%"  stopColor="#505050" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
        </defs>
      </svg>

      {/* Backdrop */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>

        {/* Mercury Drop 1 — orbits CW 16s, starts top-right */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0,
          zIndex: 2, pointerEvents: "none",
          animation: `t2Appear ${OPEN_DURATION + 700}ms ease forwards, orbitCW 16s linear infinite`,
          animationDelay: `0s, -2s`,
        }}>
          <div style={{ position: "absolute", top: 0, left: 0,
            transform: "translate(-50%, calc(-1 * min(46vw, 46vh)))" }}>
            <img src="/mercury-drop-1.png" alt="" style={{
              width: "min(13vw, 13vh)", height: "auto", display: "block",
              animation: "wobble1 4s ease-in-out infinite",
              mixBlendMode: "screen" as const,
              filter: "brightness(1.1) contrast(1.2) saturate(0.4)",
            }} />
          </div>
        </div>

        {/* Mercury Drop 2 — orbits CCW 22s, starts left */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0,
          zIndex: 2, pointerEvents: "none",
          animation: `t2Appear ${OPEN_DURATION + 900}ms ease forwards, orbitCCW 22s linear infinite`,
          animationDelay: `0s, -8s`,
        }}>
          <div style={{ position: "absolute", top: 0, left: 0,
            transform: "translate(-50%, calc(-1 * min(48vw, 48vh)))" }}>
            <img src="/mercury-drop-2.png" alt="" style={{
              width: "min(11vw, 11vh)", height: "auto", display: "block",
              animation: "wobble2 6s ease-in-out infinite",
              mixBlendMode: "screen" as const,
              filter: "brightness(1.1) contrast(1.2) saturate(0.4)",
            }} />
          </div>
        </div>

        {/* Mercury Drop 3 — orbits CW 12s, starts bottom */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0,
          zIndex: 2, pointerEvents: "none",
          animation: `t2Appear ${OPEN_DURATION + 1100}ms ease forwards, orbitCW 12s linear infinite`,
          animationDelay: `0s, -6s`,
        }}>
          <div style={{ position: "absolute", top: 0, left: 0,
            transform: "translate(-50%, calc(-1 * min(44vw, 44vh)))" }}>
            <img src="/mercury-drop-3.png" alt="" style={{
              width: "min(12vw, 12vh)", height: "auto", display: "block",
              animation: "wobble3 5s ease-in-out infinite",
              mixBlendMode: "screen" as const,
              filter: "brightness(1.1) contrast(1.2) saturate(0.4)",
            }} />
          </div>
        </div>

        {/* HUD outer ring */}
        <div style={{
          position: "absolute",
          width: `calc(${LENS_SIZE} + 80px)`,
          height: `calc(${LENS_SIZE} + 80px)`,
          borderRadius: "50%",
          border: "1px solid rgba(125, 211, 252, 0.25)",
          animation: `hudFadeIn ${OPEN_DURATION + 200}ms ease forwards`,
          zIndex: 3,
        }}>
          <span style={{
            position: "absolute", top: "30px", left: "50%",
            transform: "translateX(-90px)",
            color: "rgba(125,211,252,0.8)", fontSize: "11px",
            fontFamily: "monospace", letterSpacing: "0.1em",
          }}>LLM</span>

          <span style={{
            position: "absolute", top: "12px", left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(125,211,252,0.5)", fontSize: "10px",
            fontFamily: "monospace", letterSpacing: "0.15em",
          }}>AGENT</span>

          <span style={{
            position: "absolute", top: "30px", left: "50%",
            transform: "translateX(50px)",
            color: "rgba(125,211,252,0.9)", fontSize: "11px",
            fontFamily: "monospace",
            animation: "recBlink 1.2s ease infinite",
          }}>◉ ACTIVE</span>

          <span style={{
            position: "absolute", bottom: "14px", left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(125,211,252,0.4)", fontSize: "10px",
            fontFamily: "monospace", letterSpacing: "0.2em", whiteSpace: "nowrap",
          }}>CONTEXT: 128K ──●──</span>

          <span style={{
            position: "absolute", top: "50%", left: "4px",
            transform: "translateY(-50%) rotate(-90deg)",
            color: "rgba(125,211,252,0.3)", fontSize: "9px",
            fontFamily: "monospace", letterSpacing: "0.3em",
          }}>INFERENCE</span>

          <span style={{
            position: "absolute", top: "50%", right: "4px",
            transform: "translateY(-50%) rotate(90deg)",
            color: "rgba(125,211,252,0.3)", fontSize: "9px",
            fontFamily: "monospace", letterSpacing: "0.3em",
          }}>LATENCY</span>
        </div>

        {/* Glass rings */}
        <div style={{
          position: "absolute",
          width: `calc(${LENS_SIZE} + 48px)`,
          height: `calc(${LENS_SIZE} + 48px)`,
          borderRadius: "50%",
          zIndex: 3,
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
          zIndex: 3,
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
