export default function Experience() {
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
          </div>
        ))}
      </div>
    </section>
  );
}
