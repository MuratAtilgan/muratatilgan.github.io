import Image from "next/image";
import CodeStream from "./CodeStream";

export default function Hero() {
  return (
    <section className="mb-24">
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500 leading-tight">
            Murat Atilgan
          </h1>
          <h2 className="text-xl md:text-2xl text-sky-400 font-medium mb-6">
            Senior Systems & AI Engineer | Agentic AI Specialist
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mb-8 leading-relaxed">
            I build production-grade AI systems from first principles. Specializing in LLM Orchestration, RAG pipelines, and bridging complex technical architecture with tangible business value.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#about" className="px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-semibold hover:bg-white transition-colors">
              My Philosophy
            </a>
            <a href="#work" className="px-6 py-3 bg-transparent text-zinc-100 border border-zinc-700 rounded-lg font-semibold hover:bg-zinc-800 transition-colors">
              Technical Architecture
            </a>
          </div>
          <CodeStream />
        </div>
        <div className="relative w-48 h-48 md:w-72 md:h-72 shrink-0">
          <Image 
            src="/muratti_blacksuit.png" 
            alt="Murat Atilgan" 
            fill
            priority
            sizes="(max-width: 768px) 192px, 288px"
            className="rounded-full object-cover object-[80%_top] border-2 border-zinc-800 shadow-2xl transition-all duration-500 hover:border-zinc-500"
          />
        </div>
      </div>
    </section>
  );
}
