export default function Projects() {
  const projects = [
    {
      title: "Domain-Isolated Architecture for Reliable LLM Inference",
      type: "Research Paper",
      date: "Feb 2025",
      description: "Authored foundational research identifying multi-domain session degradation in LLMs. Designed a retrieval-first architecture and clean data methodology yielding ~95% accuracy.",
      tags: ["System Architecture", "LLM Evaluation", "RAG"],
      link: "/QAI_Lab_Paper_v2_Atilgan.pdf"
    },
    {
      title: "The Biological Prerequisite for AGI",
      type: "Research Paper",
      date: "Sep 2025",
      description: "Analytical research challenging the probabilistic computation narrative of AGI. Explored the engineering pathways required for neurotechnology and bidirectional BCIs.",
      tags: ["AGI Theory", "Neurotechnology"],
      link: "/Biological_Prerequisite_AGI_Atilgan.pdf"
    },
    {
      title: "Production Web & Mobile Applications",
      type: "Engineering",
      date: "2024 - Present",
      description: "Developed full-stack web applications featuring secure authentication, payment integration, and multi-provider API routing utilizing PostgreSQL and Cloud Infrastructure.",
      tags: ["Full-Stack", "Cloud", "PostgreSQL"],
      link: "#work"
    },
  ];

  return (
    <section id="work" className="mb-24">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl font-semibold">Selected Works & Research</h3>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a key={project.title} href={project.link} target={project.link.endsWith('.pdf') ? "_blank" : "_self"} rel={project.link.endsWith('.pdf') ? "noopener noreferrer" : ""} className="group relative bg-zinc-900/30 border border-zinc-800 hover:border-zinc-500 rounded-xl p-6 transition-all duration-300 block cursor-pointer hover:bg-zinc-900/50">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-medium px-2 py-1 bg-zinc-800 text-zinc-300 rounded">
                {project.type}
              </span>
              <span className="text-sm text-zinc-500">{project.date}</span>
            </div>
            <h4 className="text-lg font-semibold text-zinc-100 mb-3 group-hover:text-sky-400 transition-colors">
              {project.title}
            </h4>
            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium text-zinc-500">
                  #{tag}
                </span>
              ))}
            </div>
            {project.link.endsWith('.pdf') && (
              <div className="mt-6 flex items-center text-sm font-medium text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Read Paper <span className="ml-1">→</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
