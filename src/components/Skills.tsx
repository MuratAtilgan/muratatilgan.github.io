"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Skills() {
  const [typedCode, setTypedCode] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const fullCode = `from murat.systems import Architect

# Map the problem. Enforce the constraints.
solution = Architect(
    client="complex-enterprise",
    domain=["AI", "Execution", "Strategy"],
    approach="first-principles",
    reliability="military-grade",
    owner="murat_atilgan"
)

result = solution.deploy(env="production")

# -> Status: Live in production ✓
# -> Downtime: 0 ms ✓
# -> Team: Fully independent and operational ✓`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStartedTyping(true);
        } else {
          setHasStartedTyping(false);
        }
      },
      { threshold: 0.3 }
    );
    
    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }
    
    return () => {
      if (terminalRef.current) observer.unobserve(terminalRef.current);
    };
  }, []);

  useEffect(() => {
    if (hasStartedTyping) {
      setTypedCode("");
      let i = 0;
      const intervalId = setInterval(() => {
        setTypedCode(fullCode.substring(0, i));
        i++;
        if (i > fullCode.length) {
          clearInterval(intervalId);
        }
      }, 15);
      return () => clearInterval(intervalId);
    } else {
      setTypedCode("");
    }
  }, [hasStartedTyping, fullCode]);

  const replayAnimation = () => {
    setHasStartedTyping(false);
    setTimeout(() => setHasStartedTyping(true), 50);
  };

  const skillCategories = [
    {
      title: "AI & Machine Learning",
      skills: ["LLM Orchestration", "RAG Pipelines", "Domain Isolation", "Agentic AI", "MLOps", "AWS AI Services", "ChromaDB", "LoRA / QLoRA"],
    },
    {
      title: "Systems & Backend",
      skills: ["Python", "Rust", "C++", "Node.js", "Flask", "PostgreSQL", "SQLite"],
    },
    {
      title: "Web & Mobile",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Capacitor", "iOS", "Android"],
    },
    {
      title: "Infrastructure & Networking",
      skills: ["Docker", "AWS Cloud", "FastAPI", "REST APIs", "Cisco CCNA2", "Linux"],
    },
  ];

  return (
    <section id="skills" className="mb-24 relative">
      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-2xl font-semibold">Technical Arsenal</h3>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>

      <div 
        ref={terminalRef}
        onClick={replayAnimation}
        className="w-full bg-[#0d1117] border border-zinc-800 hover:border-zinc-700 rounded-xl shadow-lg overflow-hidden font-mono text-sm mb-12 cursor-pointer transition-colors group"
      >
        <div className="bg-[#161b22] px-4 py-3 flex items-center border-b border-zinc-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto text-zinc-400 text-xs tracking-wide group-hover:text-zinc-300 transition-colors">systems_architect.py (Click to replay)</div>
        </div>
        
        <div className="p-6 md:p-8 overflow-x-auto text-[#c9d1d9] leading-[1.7]">
          <pre className="whitespace-pre">
            <code>{typedCode}</code>
            <span className="animate-pulse inline-block w-2.5 h-4 bg-sky-500 align-middle ml-1"></span>
          </pre>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <div key={category.title} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
            <h4 className="text-lg font-medium mb-4 text-zinc-100">{category.title}</h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md text-[13px] font-medium tracking-wide border border-zinc-700/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
