export default function Skills() {
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
    <section id="skills" className="mb-24">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl font-semibold">Technical Arsenal</h3>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <div key={category.title} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
            <h4 className="text-lg font-medium mb-4 text-zinc-100">{category.title}</h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md text-sm font-medium border border-zinc-700/50"
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
