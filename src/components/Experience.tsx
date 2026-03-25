"use client";
import { useState } from "react";

export default function Experience() {
  const [isDiagramOpen, setIsDiagramOpen] = useState(false);

  const roles = [
    {
      title: "Creator & Systems Architect",
      company: "QAI Lab",
      period: "2024 – Present",
      description: "Engineered a production-ready LLM orchestration platform (v8.4) achieving consistent inference quality through proprietary reactor isolation. Handled complex multi-modal input processing with retrieval-backed memory and dynamic API routing across 8+ providers.",
    },
    {
      title: "Systems Architect & Developer",
      company: "RouteMind",
      period: "In Development",
      description: "Building an intelligent routing and optimization system leveraging advanced algorithms and data structures. Designed to solve complex pathfinding and resource allocation challenges in constrained environments.",
    },
    {
      title: "Executive Leadership & Strategic Operations",
      company: "Manufacturing Directors, NATO",
      period: "2004 – 2024",
      description: "Prior to software engineering, I spent 20 years directing large-scale international operations. From managing multi-million-pound supply chains to executing mission-critical logistics for NATO. This forged my methodology for system-level reliability and strict execution boundaries.",
    },
  ];

  return (
    <section id="experience" className="mb-24">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl font-semibold">Technical Architecture</h3>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>

      <div className="space-y-8">
        {roles.map((role) => (
          <div key={role.title} className="relative pl-6 border-l border-zinc-800">
            <div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[6.5px] top-1.5 border-4 border-[#0a0a0a]"></div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
              <h4 className="text-xl font-semibold text-zinc-100">{role.title}</h4>
              <span className="text-sky-400 font-medium">{role.company}</span>
              <span className="text-zinc-500 text-sm md:ml-auto">{role.period}</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              {role.description}
            </p>
            {role.title === "Creator & Systems Architect" && (
              <div className="mt-6">
                <button 
                  onClick={() => setIsDiagramOpen(!isDiagramOpen)}
                  className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded hover:bg-zinc-800/80 hover:text-zinc-200 transition-colors flex items-center gap-2"
                >
                  {isDiagramOpen ? 'Hide Architecture Flow' : 'View Architecture Flow'}
                  <span className="text-sky-500">{isDiagramOpen ? '↑' : '↓'}</span>
                </button>

                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isDiagramOpen ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                  <div className="p-8 bg-[#151515] border border-zinc-800/80 rounded-xl overflow-x-auto shadow-2xl">
                    <h5 className="text-zinc-200 font-bold mb-8 text-center text-[15px] tracking-wide">QAI Lab — Domain-Isolated Reactor Architecture</h5>
                    <div className="min-w-[500px] flex flex-col items-center text-[13px] font-mono text-zinc-300">
                      <div className="border border-sky-900/40 bg-sky-900/10 px-8 py-2.5 rounded text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
                        User Query
                      </div>
                      <div className="text-zinc-600 my-1.5">↓</div>
                      
                      <div className="border border-zinc-800 bg-[#1c1c1c] px-8 py-2.5 rounded text-zinc-300">
                        Domain Classifier
                      </div>
                      <div className="text-zinc-600 my-1.5">↓</div>
                      
                      <div className="border border-zinc-700 bg-[#111] px-8 py-2.5 rounded text-center gap-1 flex flex-col items-center">
                        <span className="text-zinc-200">Reactor Router</span>
                        <span className="text-[11px] text-zinc-500">(Physics / Code / Math)</span>
                      </div>
                      
                      <div className="w-56 h-4 border-l border-r border-t border-zinc-800 mt-2"></div>
                      
                      <div className="flex justify-between w-72 mt-1 gap-6">
                        <div className="flex flex-col items-center w-full">
                          <div className="border border-zinc-800 bg-[#222] px-4 py-2.5 rounded text-center w-full flex flex-col gap-1 items-center">
                            <span className="text-zinc-300">Reactor A</span>
                          </div>
                          <div className="text-zinc-600 my-1.5">↓</div>
                          <div className="border border-zinc-800 bg-[#151515] px-2 py-2.5 rounded text-center w-full flex flex-col gap-1 items-center">
                            <span className="text-zinc-500 text-[11px]">ChromaDB</span>
                          </div>
                          <div className="text-zinc-600 my-1.5">↓</div>
                          <div className="text-zinc-400 text-[11px]">Clean Context</div>
                        </div>
                        
                        <div className="flex flex-col items-center w-full">
                          <div className="border border-zinc-800 bg-[#222] px-4 py-2.5 rounded text-center w-full flex flex-col gap-1 items-center">
                            <span className="text-zinc-300">Reactor B</span>
                          </div>
                          <div className="text-zinc-600 my-1.5">↓</div>
                          <div className="border border-zinc-800 bg-[#151515] px-2 py-2.5 rounded text-center w-full flex flex-col gap-1 items-center">
                            <span className="text-zinc-500 text-[11px]">ChromaDB</span>
                          </div>
                          <div className="text-zinc-600 my-1.5">↓</div>
                          <div className="text-zinc-400 text-[11px]">Clean Context</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between w-40 mb-1 mt-3">
                        <div className="w-1/2 border-b border-r border-zinc-800 h-4"></div>
                        <div className="w-1/2 border-b border-l border-zinc-800 h-4"></div>
                      </div>
                      <div className="text-zinc-600 mb-1.5">↓</div>
                      
                      <div className="border border-zinc-800 bg-[#1c1c1c] px-6 py-2.5 rounded w-48 text-center text-zinc-300">
                        LLM Generation
                      </div>
                      <div className="text-zinc-600 my-1.5">↓</div>
                      
                      <div className="border border-sky-900/40 bg-sky-900/10 px-6 py-2.5 rounded w-48 text-center text-sky-400">
                        Final Output
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
