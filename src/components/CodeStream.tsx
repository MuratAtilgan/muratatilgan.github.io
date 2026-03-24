"use client";

import { useState, useEffect } from "react";

const OUTPUT_LINES = [
  { prefix: "[system]", text: "Initializing QAI Lab Reactor Isolation...", color: "text-sky-400" },
  { prefix: "[system]", text: "Loading cross-domain memory vectors... OK", color: "text-sky-400" },
  { prefix: "[router]", text: "Request received. Analyzing domain constraints...", color: "text-purple-400" },
  { prefix: "[router]", text: "Routing inference to primary cluster (latency: 12ms)", color: "text-purple-400" },
  { prefix: "[eval]", text: "Precision metric: 94.8% -> Execution Approved.", color: "text-emerald-400" },
];

export default function CodeStream() {
  const [lines, setLines] = useState<number>(0);

  useEffect(() => {
    if (lines < OUTPUT_LINES.length) {
      const timer = setTimeout(() => {
        setLines(prev => prev + 1);
      }, Math.random() * 1000 + 800); // Random delay to simulate real processing
      return () => clearTimeout(timer);
    } else {
      // Reset after a completely finished long pause to loop it gracefully
      const reset = setTimeout(() => setLines(0), 10000);
      return () => clearTimeout(reset);
    }
  }, [lines]);

  return (
    <div className="w-full max-w-lg mt-12 border border-zinc-800 rounded-xl overflow-hidden bg-[#0c0c0e] shadow-2xl relative">
      {/* Glossy overlay mimicking a glass terminal */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/50">
        <div className="flex gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="absolute left-0 right-0 text-center text-[10px] sm:text-xs text-zinc-500 font-mono tracking-wider font-semibold">
          qai-lab-orchestrator — bash
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-xs md:text-sm text-zinc-400 min-h-[14rem] md:min-h-[16rem]">
        {OUTPUT_LINES.slice(0, lines).map((line, idx) => (
          <div key={idx} className="mb-3 leading-relaxed">
            <span className={`${line.color} mr-2 font-medium`}>{line.prefix}</span>
            <span className="text-zinc-300">{line.text}</span>
          </div>
        ))}
        {/* Blinking Cursor */}
        {lines < OUTPUT_LINES.length && (
          <div className="animate-pulse w-2 h-[1em] bg-zinc-400 mt-1 inline-block align-middle"></div>
        )}
      </div>
    </div>
  );
}
