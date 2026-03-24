export default function About() {
  return (
    <section id="about" className="mb-24">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl font-semibold">The Intersection of Business & Engineering</h3>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>
      
      <div className="text-zinc-400 space-y-8 text-lg leading-relaxed">
        <p>
          I offer a highly unconventional and powerful profile: <strong className="text-zinc-200">the rare combination of 22 years of executive operations leadership mixed with deep, modern technical expertise in Agentic AI systems.</strong> I do not just write code; I engineer system-level solutions that resolve real-world business bottlenecks.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-800">
            <h4 className="text-sky-400 font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Engineering from First Principles
            </h4>
            <p className="text-sm">
              I treat AI as a robust systems engineering challenge, not just a model-scaling exercise. By designing strict domain-isolated execution boundaries and RAG pipelines, I neutralize failure modes like context contamination to deliver predictable, reliable production performance.
            </p>
          </div>

          <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-800">
            <h4 className="text-sky-400 font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Execution Discipline & Ownership
            </h4>
            <p className="text-sm">
              My technical methodology is forged strictly from my operational background—from directing multi-million-pound supply chains to executing strategic operations at NATO. I bring mission-critical discipline to software architecture. I deliver what I commit to, without leaving systems in incomplete states.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
