"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  banner: string;
  architecture: string[];
  filename: string;
  code: string;
  stack: string[];
};

const products: Product[] = [
  {
    id: 'documiner',
    name: 'DocuMiner',
    tagline: 'Intelligent Document Platform',
    logo: '/logos/logo_documiner_scot.png',
    banner: '/logos/documiner_banner.png',
    architecture: ['Document Ingestion', 'OCR & Parsing', 'NLP Pipeline', 'Knowledge Store', 'Query Interface'],
    filename: 'document_pipeline.py',
    code: `class DocumentPipeline:
    def __init__(self, config: PipelineConfig):
        self.ocr   = OCREngine(config.ocr_backend)
        self.nlp   = NLPProcessor(config.model)
        self.store = KnowledgeStore(config.db_uri)

    async def ingest(self, doc: Document) -> str:
        raw       = await self.ocr.extract(doc)
        entities  = self.nlp.extract_entities(raw)
        relations = self.nlp.map_relations(entities)
        return await self.store.commit(relations)

    async def query(self, q: str) -> QueryResult:
        context = await self.store.semantic_search(q, top_k=8)
        return await self.llm.generate(q, context=context)`,
    stack: ['Python', 'TypeScript', 'React', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'cairn',
    name: 'Cairn',
    tagline: 'Intelligent Route Optimizing Co-pilot',
    logo: '/logos/cairn.png',
    banner: '/logos/cairn_banner.png',
    architecture: ['Fleet Input', 'Constraint Solver', 'Route Optimizer', 'Voice Co-pilot', 'Driver App'],
    filename: 'route_optimizer.ts',
    code: `class RouteOptimizer {
  private solver: VRPSolver;
  private fleet:  FleetManager;

  async optimize(orders: Order[]): Promise<RouteMatrix> {
    const vehicles = await this.fleet.getAvailable();
    const problem  = new VehicleRoutingProblem({
      vehicles,
      orders,
      constraints: {
        timeWindows: this.extractWindows(orders),
        capacity:    vehicles.map(v => v.loadLimit),
      },
    });
    return this.solver.solve(problem, { timeout: 5000 });
  }

  private extractWindows(orders: Order[]): TimeWindow[] {
    return orders.map(o => ({
      id: o.id, from: o.earliest, to: o.latest,
    }));
  }
}`,
    stack: ['TypeScript', 'React Native', 'Kotlin', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'muster',
    name: 'Muster',
    tagline: 'Fleet Compliance & Penalty Intelligence Platform',
    logo: '/logos/muster.png',
    banner: '/logos/muster_banner.png',
    architecture: ['QR Trip Log', 'Telematics Unification', 'Compliance RAG', 'Penalty Attribution', 'Ops Dashboard'],
    filename: 'penalty_resolver.ts',
    code: `class PenaltyResolver {
  private trips:     TripLogStore;
  private telemetry: TelematicsFeed;

  async attribute(penalty: Penalty): Promise<Attribution> {
    const trip = await this.trips.openAt(
      penalty.vehicleId, penalty.occurredAt,
    );
    if (!trip) return { status: 'unattributed', manual: true };

    const gps = await this.telemetry.near(
      penalty.vehicleId, penalty.occurredAt, penalty.location,
    );
    return {
      driver:     trip.driver,
      tripId:     trip.id,
      confidence: gps.corroborated ? 0.97 : 0.88,
      status:     'resolved',
    };
  }
}`,
    stack: ['TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'qailab',
    name: 'QAI Lab',
    tagline: 'Super Intelligent Personal Research & Code IDE',
    logo: '/logos/QAI_lab.png',
    banner: '/logos/QAI_Lab_banner.png',
    architecture: ['Research Corpus', 'Domain Classifier', 'Reactor Router', 'Code IDE', 'Knowledge Base'],
    filename: 'qai_reactor.py',
    code: `class QAIReactor:
    """Domain-isolated research and code intelligence reactor."""

    def __init__(self, domain: Domain):
        self.classifier = DomainClassifier(domain)
        self.retriever  = ChromaRetriever(collection=domain.value)
        self.ide        = CodeIntelligence(lsp_enabled=True)
        self.llm        = ReactorLLM(model="domain-tuned")

    async def research(self, query: str) -> ResearchOutput:
        domain   = self.classifier.predict(query)
        context  = await self.retriever.search(query, top_k=12)
        snippets = self.ide.suggest(query, context)
        return await self.llm.synthesize(query, context, snippets)`,
    stack: ['Python', 'C++', 'Rust', 'React', 'TypeScript', 'ChromaDB', 'Docker'],
  },
];

export default function ProductShowcase() {
  const [activeId, setActiveId]   = useState('documiner');
  const [logoKey, setLogoKey]     = useState(0);
  const [typedCode, setTypedCode] = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleRef  = useRef(false);

  const activeProduct = products.find(p => p.id === activeId)!;

  function startTyping(code: string) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTypedCode('');
    setIsTyping(true);
    let i = 0;
    intervalRef.current = setInterval(() => {
      setTypedCode(code.substring(0, i));
      i++;
      if (i > code.length) {
        clearInterval(intervalRef.current!);
        setIsTyping(false);
      }
    }, 12);
  }

  function switchTab(id: string) {
    setActiveId(id);
    setLogoKey(k => k + 1);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        visibleRef.current = visible;
        if (visible) startTyping(products.find(p => p.id === activeId)!.code);
      },
      { threshold: 0.15 }
    );
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visibleRef.current) startTyping(activeProduct.code);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  return (
    <section id="projects" className="mb-24">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl font-semibold">Products</h3>
        <div className="h-px bg-zinc-800 flex-1" />
      </div>

      {/* Text-only tab bar */}
      <div className="flex gap-1 mb-8 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800 w-fit">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => switchTab(p.id)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeId === p.id
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Product card */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">

        {/* Banner header strip */}
        <div className="relative h-64 border-b border-zinc-800 overflow-hidden">
          {/* Full-bleed banner image */}
          <Image
            src={activeProduct.banner}
            alt={`${activeProduct.name} banner`}
            fill
            className="object-cover object-center"
            priority
          />

          {/* Bottom gradient fade into card background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/40 to-transparent" />

          {/* Logo + text pinned to bottom of strip */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end gap-4 p-6">
            <div
              key={logoKey}
              style={{ animation: 'logoReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
              className="shrink-0"
            >
              <Image
                src={activeProduct.logo}
                alt={activeProduct.name}
                width={56}
                height={56}
                className="object-contain drop-shadow-xl rounded-xl"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xl font-semibold text-zinc-100 leading-tight">
                {activeProduct.name}
              </h4>
              <p className="text-sm text-zinc-400 mt-0.5">{activeProduct.tagline}</p>
            </div>
            <span className="shrink-0 text-xs font-medium px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              ● Production
            </span>
          </div>
        </div>

        {/* Architecture flow */}
        <div className="p-6 border-b border-zinc-800">
          <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-4">
            Architecture
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {activeProduct.architecture.map((node, i) => (
              <React.Fragment key={i}>
                <div className="px-3 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-lg text-xs text-zinc-300 whitespace-nowrap">
                  {node}
                </div>
                {i < activeProduct.architecture.length - 1 && (
                  <span className="text-sky-500 text-sm select-none">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Code terminal */}
        <div
          ref={terminalRef}
          onClick={() => startTyping(activeProduct.code)}
          className="bg-[#0d1117] border-b border-zinc-800 font-mono text-sm cursor-pointer group"
        >
          <div className="bg-[#161b22] px-4 py-3 flex items-center border-b border-zinc-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-zinc-400 text-xs tracking-wide group-hover:text-zinc-300 transition-colors">
              {activeProduct.filename}&nbsp;&nbsp;·&nbsp;&nbsp;click to replay
            </div>
          </div>
          <div className="p-6 overflow-x-auto text-[#c9d1d9] leading-[1.75]">
            <pre className="whitespace-pre">
              <code>{typedCode}</code>
              {isTyping && (
                <span className="animate-pulse inline-block w-2.5 h-4 bg-sky-500 align-middle ml-1" />
              )}
            </pre>
          </div>
        </div>

        {/* Stack badges */}
        <div className="p-6 flex flex-wrap gap-2">
          {activeProduct.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md text-[13px] font-medium tracking-wide border border-zinc-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
