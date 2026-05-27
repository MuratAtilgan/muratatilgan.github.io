"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "opening" | "playing" | "closing";

const LENS_SIZE = "min(75vw, 75vh)";
const OPEN_DURATION = 900;
const FADE_DURATION = 600;

/* ═══════════════════════════════════════════
   CODE SNIPPETS (Pristine 4-Space Indentation)
   ═══════════════════════════════════════════ */
const CPP = [
  '#include <thread>',
  '#include <mutex>',
  '#include <memory>',
  '#include <vector>',
  '#include <atomic>',
  '#include <queue>',
  '#include <functional>',
  '#include <condition_variable>',
  '#include <sys/socket.h>',
  '#include <netinet/in.h>',
  '',
  'namespace sys {',
  '',
  '// Thread pool for async task execution',
  'class ThreadPool {',
  'private:',
  '    std::vector<std::thread> workers;',
  '    std::queue<std::function<void()>> tasks;',
  '    std::mutex queue_mtx;',
  '    std::condition_variable cv;',
  '    std::atomic<bool> stop{false};',
  '',
  'public:',
  '    explicit ThreadPool(size_t threads) {',
  '        for (size_t i = 0; i < threads; ++i) {',
  '            workers.emplace_back([this] {',
  '                while (true) {',
  '                    std::function<void()> task;',
  '                    {',
  '                        std::unique_lock<std::mutex> lock(queue_mtx);',
  '                        cv.wait(lock, [this] {',
  '                            return stop || !tasks.empty();',
  '                        });',
  '                        if (stop && tasks.empty()) return;',
  '                        task = std::move(tasks.front());',
  '                        tasks.pop();',
  '                    }',
  '                    task();',
  '                }',
  '            });',
  '        }',
  '    }',
  '',
  '    template<typename F>',
  '    void enqueue(F&& func) {',
  '        {',
  '            std::lock_guard<std::mutex> lock(queue_mtx);',
  '            tasks.emplace(std::forward<F>(func));',
  '        }',
  '        cv.notify_one();',
  '    }',
  '',
  '    ~ThreadPool() {',
  '        stop.store(true);',
  '        cv.notify_all();',
  '        for (auto& w : workers) {',
  '            if (w.joinable()) w.join();',
  '        }',
  '    }',
  '};',
  '',
  '// Network node for mesh topology',
  'struct NetworkNode {',
  '    uint32_t id;',
  '    sockaddr_in addr;',
  '    std::atomic<int> state;',
  '    std::shared_ptr<Connection> conn;',
  '',
  '    void bind(uint16_t port) {',
  '        int fd = socket(AF_INET, SOCK_STREAM, 0);',
  '        addr.sin_family = AF_INET;',
  '        addr.sin_port = htons(port);',
  '        addr.sin_addr.s_addr = INADDR_ANY;',
  '        ::bind(fd, (sockaddr*)&addr, sizeof(addr));',
  '        listen(fd, SOMAXCONN);',
  '        state.store(1);',
  '    }',
  '',
  '    void accept_loop() {',
  '        while (state.load() == 1) {',
  '            auto client = accept(fd, nullptr, nullptr);',
  '            if (client < 0) continue;',
  '            pool.enqueue([=] { handle(client); });',
  '        }',
  '    }',
  '};',
  '',
  'template<typename T>',
  'class LockFreeQueue {',
  '    struct Node {',
  '        T data;',
  '        std::atomic<Node*> next{nullptr};',
  '    };',
  '    std::atomic<Node*> head;',
  '    std::atomic<Node*> tail;',
  '',
  '    void enqueue(T val) {',
  '        auto* node = new Node{std::move(val)};',
  '        Node* old_tail = tail.load();',
  '        while (!tail.compare_exchange_weak(old_tail, node)) {}',
  '        old_tail->next.store(node);',
  '    }',
  '',
  '    bool dequeue(T& result) {',
  '        Node* old_head = head.load();',
  '        if (!old_head) return false;',
  '        result = std::move(old_head->data);',
  '        head.store(old_head->next.load());',
  '        delete old_head;',
  '        return true;',
  '    }',
  '};',
  '',
  '// Memory-mapped telemetry region',
  'void* map_telemetry(size_t size) {',
  '    return mmap(nullptr, size,',
  '        PROT_READ | PROT_WRITE,',
  '        MAP_PRIVATE | MAP_ANONYMOUS,',
  '        -1, 0);',
  '}',
  '',
  '} // namespace sys',
];

const JAVA = [
  'import org.springframework.boot.*;',
  'import org.springframework.web.bind.*;',
  'import io.grpc.ManagedChannel;',
  'import io.grpc.ManagedChannelBuilder;',
  'import org.apache.kafka.clients.consumer.*;',
  'import java.util.concurrent.*;',
  'import javax.inject.Inject;',
  '',
  '@SpringBootApplication',
  '@EnableDiscoveryClient',
  'public class OrchestratorService {',
  '',
  '    @Autowired',
  '    private AgentRegistry registry;',
  '',
  '    @Autowired',
  '    private PipelineManager pipelines;',
  '',
  '    @Value("${llm.endpoint}")',
  '    private String llmEndpoint;',
  '',
  '    // Deploy a new inference pipeline',
  '    @PostMapping("/api/v2/deploy")',
  '    public ResponseEntity<DeployResult> deploy(@RequestBody Config cfg) {',
  '        var pipeline = pipelines.builder()',
  '            .withModel(cfg.getModel())',
  '            .withContext(cfg.getCtxSize())',
  '            .withRetry(3)',
  '            .build();',
  '',
  '        registry.register(pipeline);',
  '        pipeline.activate();',
  '',
  '        return ResponseEntity.ok(',
  '            DeployResult.success(pipeline.getId())',
  '        );',
  '    }',
  '',
  '    @KafkaListener(topics = "agent-telemetry", groupId = "orchestrator-grp")',
  '    public void onTelemetry(ConsumerRecord<String, Metrics> record) {',
  '        var metrics = record.value();',
  '        registry.updateHealth(record.key(), metrics);',
  '',
  '        if (metrics.getLatency() > 200) {',
  '            log.warn("High latency: {}ms", metrics.getLatency());',
  '            circuitBreaker.trip(record.key());',
  '        }',
  '    }',
  '',
  '    // gRPC inference endpoint',
  '    @GrpcService',
  '    public class InferenceService extends InferenceGrpc.Base {',
  '',
  '        @Override',
  '        public void predict(PredictRequest req, StreamObserver<PredictReply> obs) {',
  '            var result = modelRunner.run(req.getInput());',
  '            obs.onNext(PredictReply.newBuilder()',
  '                .setOutput(result)',
  '                .setConfidence(0.97)',
  '                .build());',
  '            obs.onCompleted();',
  '        }',
  '    }',
  '',
  '    @Scheduled(fixedRate = 5000)',
  '    public void healthCheck() {',
  '        registry.getAllAgents().parallelStream()',
  '            .filter(a -> !a.isHealthy())',
  '            .forEach(a -> {',
  '                log.info("Recovering: {}", a.getName());',
  '                a.restart();',
  '            });',
  '    }',
  '',
  '    // Circuit breaker with backoff',
  '    private void handleFailure(String id) {',
  '        int retries = 0;',
  '        while (retries < 3) {',
  '            try {',
  '                registry.reconnect(id);',
  '                return;',
  '            } catch (Exception e) {',
  '                retries++;',
  '                Thread.sleep(1000 * retries);',
  '            }',
  '        }',
  '        log.error("Agent {} unrecoverable", id);',
  '    }',
  '}',
];

/* ═══════════════════════════════════════════
   TOKENIZER
   ═══════════════════════════════════════════ */
const CPP_KW = new Set([
  'auto','bool','break','case','catch','class','const','constexpr','continue',
  'decltype','default','delete','do','else','enum','explicit','export','extern',
  'false','final','for','friend','goto','if','inline','mutable','namespace','new',
  'noexcept','nullptr','operator','override','private','protected','public',
  'register','return','sizeof','static','struct','switch','template','this',
  'throw','true','try','typedef','typename','union','using','virtual','void',
  'volatile','while',
]);
const CPP_TYPES = new Set([
  'int','char','float','double','long','short','unsigned','signed',
  'size_t','uint8_t','uint16_t','uint32_t','uint64_t',
  'string','vector','thread','mutex','atomic','shared_ptr','unique_ptr',
  'condition_variable','queue','map','set','pair','array','sockaddr_in',
  'Node','Task','Connection','Status','function','lock_guard','unique_lock',
]);
const JAVA_KW = new Set([
  'abstract','assert','boolean','break','byte','case','catch','char','class',
  'const','continue','default','do','double','else','enum','extends','final',
  'finally','float','for','goto','if','implements','import','instanceof','int',
  'interface','long','native','new','package','private','protected','public',
  'return','short','static','strictfp','super','switch','synchronized','this',
  'throw','throws','transient','try','var','void','volatile','while',
]);
const JAVA_TYPES = new Set([
  'String','Integer','Long','Double','Float','Boolean','List','Map','Set',
  'ArrayList','HashMap','HashSet','Optional','Stream','CompletableFuture',
  'Consumer','Supplier','Function','Predicate','Object',
  'ResponseEntity','Config','DeployResult','Metrics','ConsumerRecord',
  'StreamObserver','PredictRequest','PredictReply','AgentRegistry',
  'PipelineManager','ManagedChannel','ManagedChannelBuilder','Exception',
  'Thread',
]);

function esc(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function tokenize(code: string, lang: 'cpp' | 'java'): string {
  if (!code.trim()) return '<span class="op"> </span>';

  const kws = lang === 'cpp' ? CPP_KW : JAVA_KW;
  const types = lang === 'cpp' ? CPP_TYPES : JAVA_TYPES;

  // Regex: comment | preprocessor | annotation | angle-string | string | number | word | operators | whitespace
  const rx = /(\/\/.*$)|(#\w+)|(@\w+)|(<[a-zA-Z_][\w,\s]*>)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?[fFlL]?\b)|(\b[a-zA-Z_]\w*\b)|([\-\+\*\/%=<>!&|^~?:;,{}\(\)\[\]\.]+)|(\s+)/gm;

  let result = '';
  let lastIndex = 0;

  for (const m of code.matchAll(rx)) {
    if (m.index > lastIndex) {
      result += esc(code.slice(lastIndex, m.index));
    }
    lastIndex = m.index + m[0].length;

    const [match, comment, preproc, annotation, angleStr, str, num, word, op, ws] = m;

    if (comment)    { result += `<span class="cmt">${esc(match)}</span>`; }
    else if (preproc)    { result += `<span class="prep">${esc(match)}</span>`; }
    else if (annotation) { result += `<span class="anno">${esc(match)}</span>`; }
    else if (angleStr)   { result += `<span class="str">${esc(match)}</span>`; }
    else if (str)        { result += `<span class="str">${esc(match)}</span>`; }
    else if (num)        { result += `<span class="num">${esc(match)}</span>`; }
    else if (word) {
      if (kws.has(word))       result += `<span class="kw">${esc(match)}</span>`;
      else if (types.has(word)) result += `<span class="type">${esc(match)}</span>`;
      else                      result += `<span class="id">${esc(match)}</span>`;
    }
    else if (op) { result += `<span class="op">${esc(match)}</span>`; }
    else if (ws) { result += match; }
    else         { result += esc(match); }
  }

  if (lastIndex < code.length) {
    result += esc(code.slice(lastIndex));
  }

  return result;
}

/* ═══════════════════════════════════════════
   CODE STREAM ENGINE (Pixel-Perfect DOM)
   ═══════════════════════════════════════════ */
class CodeStream {
  container: HTMLDivElement;
  scroller: HTMLDivElement;
  snippets: string[];
  lang: 'cpp' | 'java';
  side: 'left' | 'right';
  lines: { el: HTMLDivElement }[];
  idx: number;
  y: number;
  scrollSpeed: number;
  height: number;
  lineHeight: number;
  tokenized: string[];

  constructor(
    container: HTMLDivElement,
    scroller: HTMLDivElement,
    snippets: string[],
    lang: 'cpp' | 'java',
    side: 'left' | 'right'
  ) {
    this.container = container;
    this.scroller = scroller;
    this.snippets = snippets;
    this.lang = lang;
    this.side = side;
    this.lines = [];
    this.idx = 0;
    this.y = 0;
    this.scrollSpeed = 38;    // px/sec
    this.height = window.innerHeight;
    this.lineHeight = 24;     // matching line-height in CSS

    this.tokenized = snippets.map(s => tokenize(s, lang));
    this.prePopulate();
  }

  prePopulate() {
    const numLines = Math.ceil(this.height / this.lineHeight) + 3;
    for (let i = 0; i < numLines; i++) {
      this._spawn();
    }
    this.y = 0;
    this.scroller.style.transform = `translate3d(0, ${this.y}px, 0)`;
  }

  update(dt: number) {
    const dtSec = dt / 1000;

    this.y += this.scrollSpeed * dtSec;
    // Apply Math.round to force glyphs to physical pixels to eliminate subpixel blur!
    this.scroller.style.transform = `translate3d(0, ${Math.round(this.y)}px, 0)`;

    if (this.lines.length === 0 || this.y >= 0) {
      this._spawn();
    }

    while (this.lines.length > 0) {
      const oldestIdx = this.lines.length - 1;
      const oldestY = this.y + oldestIdx * this.lineHeight;
      if (oldestY > this.height + 50) {
        const line = this.lines.pop();
        if (line) {
          line.el.remove();
        }
      } else {
        break;
      }
    }

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      const visualY = this.y + i * this.lineHeight;

      let opacity = 1;
      if (visualY < 60) {
        opacity = Math.max(0, visualY / 60);
      } else if (visualY > this.height - 120) {
        opacity = Math.max(0, (this.height - visualY) / 120);
      }
      line.el.style.opacity = String(opacity);
    }
  }

  _spawn() {
    const html = this.tokenized[this.idx % this.tokenized.length];
    this.idx++;

    const el = document.createElement('div');
    el.className = `code-line ${this.side}-line`;

    const r = Math.random();
    if (r < 0.10) el.classList.add('diff-add');
    else if (r < 0.15) el.classList.add('diff-remove');
    else if (r < 0.18) el.classList.add('diff-modify');

    if (Math.random() < 0.04) el.classList.add('glitch-flash');

    el.innerHTML = `<span class="code-text">${html}</span>`;
    
    this.scroller.insertBefore(el, this.scroller.firstChild);
    this.lines.unshift({ el });

    if (this.lines.length > 1) {
      this.y -= this.lineHeight;
      this.scroller.style.transform = `translate3d(0, ${Math.round(this.y)}px, 0)`;
    }
  }

  resize() {
    this.height = window.innerHeight;
  }
}

/* ═══════════════════════════════════════════
   PARTICLE SYSTEM
   ═══════════════════════════════════════════ */
interface Particle {
  x: number;
  y: number;
  sz: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  left: boolean;
  trail: { x: number; y: number; o: number }[];
}

class Particles {
  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  list: Particle[];
  mx: number;
  my: number;
  w!: number;
  h!: number;
  cx!: number;
  cy!: number;

  constructor(canvas: HTMLCanvasElement) {
    this.c = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;
    this.list = [];
    this.mx = 0;
    this.my = 0;
    this.resize();
  }

  resize() {
    const d = window.devicePixelRatio || 1;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.c.width = this.w * d;
    this.c.height = this.h * d;
    this.ctx.setTransform(d, 0, 0, d, 0, 0);
    this.cx = this.w / 2;
    this.cy = this.h / 2;
  }

  spawn() {
    if (this.list.length > 70) return;
    const left = Math.random() > 0.5;
    const x = left ? Math.random() * this.w * 0.28 : this.w * 0.72 + Math.random() * this.w * 0.28;
    const y = Math.random() * this.h;
    this.list.push({
      x,
      y,
      sz: 1.2 + Math.random() * 2,
      vx: (this.cx - x) * (0.0008 + Math.random() * 0.0016),
      vy: (this.cy - y) * (0.0004 + Math.random() * 0.0008),
      life: 1,
      decay: 0.0018 + Math.random() * 0.003,
      left,
      trail: [],
    });
  }

  update() {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const p = this.list[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.trail.push({ x: p.x, y: p.y, o: p.life });
      if (p.trail.length > 6) p.trail.shift();

      const dx = p.x - this.mx;
      const dy = p.y - this.my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90 && dist > 0) {
        p.x += (dx / dist) * 1.2;
        p.y += (dy / dist) * 1.2;
      }

      if (p.life <= 0) this.list.splice(i, 1);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    for (const p of this.list) {
      for (let t = 0; t < p.trail.length; t++) {
        const tr = p.trail[t];
        const a = (t / p.trail.length) * tr.o * 0.25;
        this.ctx.fillStyle = p.left ? `hsla(175,80%,55%,${a})` : `hsla(40,95%,60%,${a})`;
        this.ctx.beginPath();
        this.ctx.arc(tr.x, tr.y, p.sz * 0.4, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      const dc = Math.abs(p.x - this.cx) / (this.w / 2);
      const wh = 1 - dc;
      if (p.left) {
        this.ctx.fillStyle = `hsla(${175 - wh * 30},${80 - wh * 35}%,${55 + wh * 30}%,${p.life * 0.7})`;
        this.ctx.shadowColor = `hsla(175,90%,60%,${p.life * 0.4})`;
      } else {
        this.ctx.fillStyle = `hsla(${40 + wh * 10},${95 - wh * 40}%,${58 + wh * 30}%,${p.life * 0.7})`;
        this.ctx.shadowColor = `hsla(40,95%,65%,${p.life * 0.4})`;
      }
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }
}

export default function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("opening");

  // Code column & particles Refs
  const containerLeftRef = useRef<HTMLDivElement>(null);
  const scrollerLeftRef = useRef<HTMLDivElement>(null);
  const containerRightRef = useRef<HTMLDivElement>(null);
  const scrollerRightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("playing");
      videoRef.current?.play().catch(() => {});
    }, OPEN_DURATION);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnd = () => {
      setPhase("closing");
      setTimeout(onComplete, FADE_DURATION);
    };
    video.addEventListener("ended", onEnd);
    return () => video.removeEventListener("ended", onEnd);
  }, [onComplete]);

  // Main game loop effect
  useEffect(() => {

    const leftContainer = containerLeftRef.current;
    const leftScroller = scrollerLeftRef.current;
    const rightContainer = containerRightRef.current;
    const rightScroller = scrollerRightRef.current;
    const canvas = canvasRef.current;

    if (!leftContainer || !leftScroller || !rightContainer || !rightScroller || !canvas) return;

    let codeL: CodeStream | null = null;
    let codeR: CodeStream | null = null;
    let particles: Particles | null = null;

    try {
      codeL = new CodeStream(leftContainer, leftScroller, CPP, 'cpp', 'left');
      codeR = new CodeStream(rightContainer, rightScroller, JAVA, 'java', 'right');
      particles = new Particles(canvas);
    } catch (e) {
      console.error(e);
      return;
    }

    let animationFrameId: number;
    let last = performance.now();
    let fc = 0;
    let ft = 0;
    let st = 0;

    // Mouse listener for parallax
    let tpx = 0, tpy = 0, cpx = 0, cpy = 0;
    const onMouseMove = (e: MouseEvent) => {
      tpx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      tpy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      if (particles) {
        particles.mx = e.clientX;
        particles.my = e.clientY;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize listener
    const onResize = () => {
      codeL?.resize();
      codeR?.resize();
      particles?.resize();
    };
    window.addEventListener('resize', onResize);

    // Clock ticking
    const tick = () => {
      const n = new Date();
      if (clockRef.current) {
        clockRef.current.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()]
          .map(v => String(v).padStart(2, '0'))
          .join(':');
      }
    };
    const clockInterval = setInterval(tick, 1000);
    tick();

    const centerAssembly = document.getElementById('centerAssembly');

    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;

      // FPS
      fc++;
      ft += dt;
      if (ft > 1000) {
        if (fpsRef.current) {
          fpsRef.current.textContent = String(fc);
        }
        fc = 0;
        ft = 0;
      }

      // Update code scrollers
      codeL?.update(dt);
      codeR?.update(dt);

      // Spawning and drawing particles
      st += dt;
      if (st > 70) {
        st = 0;
        particles?.spawn();
      }
      particles?.update();
      particles?.draw();

      // Parallax coordinate rounding to keep center lens razor sharp
      cpx += (tpx - cpx) * 0.04;
      cpy += (tpy - cpy) * 0.04;
      if (centerAssembly) {
        const px = Math.round(-cpx * 18);
        const py = Math.round(-cpy * 12);
        centerAssembly.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      clearInterval(clockInterval);
      cancelAnimationFrame(animationFrameId);
    };
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
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

        /* ── CSS variables ── */
        :root {
          --bg: #04070a;
          --font-mono: 'Space Mono', 'JetBrains Mono', 'Fira Code', monospace;
          --font-sans: 'Space Grotesk', system-ui, sans-serif;
          --teal: hsl(175, 75%, 65%);
          --teal-dim: hsla(175, 75%, 65%, 0.25);
          --teal-glow: hsla(175, 90%, 55%, 0.5);
          --amber: hsl(35, 85%, 65%);
          --amber-dim: hsla(35, 85%, 65%, 0.25);
          --amber-glow: hsla(40, 95%, 62%, 0.5);

          /* ── C++ teal tokens ── */
          --cpp-kw: hsl(175, 85%, 60%);
          --cpp-type: hsl(195, 80%, 65%);
          --cpp-str: hsl(145, 65%, 60%);
          --cpp-cmt: hsl(175, 20%, 45%);
          --cpp-num: hsl(280, 70%, 75%);
          --cpp-prep: hsl(160, 75%, 55%);
          --cpp-op: hsl(180, 15%, 65%);
          --cpp-id: hsl(180, 10%, 85%);
          --cpp-fn: hsl(185, 80%, 70%);

          /* ── Java amber tokens ── */
          --java-kw: hsl(35, 90%, 60%);
          --java-type: hsl(25, 85%, 65%);
          --java-str: hsl(85, 60%, 60%);
          --java-cmt: hsl(40, 20%, 45%);
          --java-num: hsl(15, 85%, 70%);
          --java-anno: hsl(48, 95%, 60%);
          --java-op: hsl(40, 15%, 65%);
          --java-id: hsl(40, 10%, 85%);
          --java-fn: hsl(30, 85%, 70%);
        }

        /* ── Grid overlays & backdrops ── */
        .intro-grid {
          position: absolute; inset: 0; z-index: 0;
          background:
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(125,211,252,0.02) 59px, rgba(125,211,252,0.02) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(125,211,252,0.02) 59px, rgba(125,211,252,0.02) 60px);
          pointer-events: none;
        }

        /* ═══ SIDE GLOWS ═══ */
        .glow-left, .glow-right {
          position: absolute; top: 0; width: 32%; height: 100%;
          pointer-events: none; z-index: 1;
        }
        .glow-left  { left: 0;  background: radial-gradient(ellipse at 0% 50%, hsla(175,80%,50%,0.03) 0%, transparent 70%); }
        .glow-right { right: 0; background: radial-gradient(ellipse at 100% 50%, hsla(40,95%,58%,0.03) 0%, transparent 70%); }

        /* ── Code streams layout ── */
        .code-column {
          position: absolute;
          top: 0;
          height: 100vh;
          width: 26%;
          z-index: 2;
          overflow: hidden;
          opacity: 1;
        }
        .code-column.left  { left: 0;  }
        .code-column.right { right: 0; }

        .code-column.left::after,
        .code-column.right::after {
          content: '';
          position: absolute; inset: 0;
          pointer-events: none;
          z-index: 10;
        }
        .code-column.left::after {
          background:
            linear-gradient(to bottom, #000 0%, transparent 6%, transparent 88%, #000 100%),
            linear-gradient(to right, #000 0%, transparent 40px, transparent 80%, #000 100%);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .code-column.right::after {
          background:
            linear-gradient(to bottom, #000 0%, transparent 6%, transparent 88%, #000 100%),
            linear-gradient(to right, #000 0%, transparent 80px, transparent 85%, #000 100%);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .code-scroller {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          will-change: transform;
        }

        .code-line {
          position: relative;
          width: 100%;
          height: 24px;
          line-height: 24px;
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 400;
          white-space: pre;
          color: hsl(0, 0%, 82%);
          will-change: opacity;
          transition: opacity 0.35s ease;
          animation: typeReveal 0.55s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          text-rendering: geometricPrecision;
        }

        .code-line.left-line { padding-left: 40px; }
        .code-line.right-line { padding-left: 80px; }

        /* ── Diff decorations ── */
        .code-line.diff-add::before,
        .code-line.diff-remove::before,
        .code-line.diff-modify::before {
          content: '';
          position: absolute;
          top: 3px; bottom: 3px;
          width: 3px;
          border-radius: 1px;
        }
        
        .code-line.left-line::before { left: 24px; }
        .code-line.right-line::before { left: 64px; }

        .code-line.diff-add::before {
          background: rgba(80, 200, 100, 0.7);
          box-shadow: 0 0 8px rgba(80, 200, 100, 0.4);
        }
        .code-line.diff-add {
          background: linear-gradient(to right, rgba(80, 200, 100, 0.06), transparent 70%);
        }

        .code-line.diff-remove::before {
          background: rgba(220, 70, 70, 0.65);
          box-shadow: 0 0 8px rgba(220, 70, 70, 0.35);
        }
        .code-line.diff-remove {
          background: linear-gradient(to right, rgba(220, 70, 70, 0.05), transparent 70%);
        }
        .code-line.diff-remove .code-text {
          text-decoration: line-through;
          text-decoration-color: rgba(220, 70, 70, 0.4);
        }

        .code-line.diff-modify::before {
          background: rgba(100, 160, 255, 0.65);
          box-shadow: 0 0 8px rgba(100, 160, 255, 0.35);
        }
        .code-line.diff-modify {
          background: linear-gradient(to right, rgba(100, 160, 255, 0.04), transparent 70%);
        }

        /* ── Glitch flash ── */
        .code-line.glitch-flash {
          animation: typeReveal 0.55s cubic-bezier(0.22, 0.61, 0.36, 1) forwards,
                     lineGlitch 0.18s 0.6s linear 1;
        }

        @keyframes lineGlitch {
          0%   { transform: translateX(0);   filter: hue-rotate(0deg) brightness(1); }
          20%  { transform: translateX(-4px); filter: hue-rotate(40deg) brightness(1.8); }
          40%  { transform: translateX(6px);  filter: hue-rotate(-30deg) brightness(0.8); }
          60%  { transform: translateX(-2px); filter: hue-rotate(20deg) brightness(1.4); }
          80%  { transform: translateX(3px);  filter: hue-rotate(-10deg) brightness(1.1); }
          100% { transform: translateX(0);    filter: hue-rotate(0deg) brightness(1); }
        }

        /* ── Syntax tokens C++ ── */
        .left-line .kw   { color: var(--cpp-kw);   font-weight: 500; }
        .left-line .type { color: var(--cpp-type);  }
        .left-line .str  { color: var(--cpp-str);   }
        .left-line .cmt  { color: var(--cpp-cmt);   font-style: italic; }
        .left-line .num  { color: var(--cpp-num);   }
        .left-line .prep { color: var(--cpp-prep);  font-weight: 500; }
        .left-line .op   { color: var(--cpp-op);    }
        .left-line .id   { color: var(--cpp-id);    }
        .left-line .fn   { color: var(--cpp-fn);    }

        /* ── Syntax tokens Java ── */
        .right-line .kw   { color: var(--java-kw);   font-weight: 500; }
        .right-line .type { color: var(--java-type);  }
        .right-line .str  { color: var(--java-str);   }
        .right-line .cmt  { color: var(--java-cmt);   font-style: italic; }
        .right-line .num  { color: var(--java-num);   }
        .right-line .anno { color: var(--java-anno);  font-weight: 500; }
        .right-line .op   { color: var(--java-op);    }
        .right-line .id   { color: var(--java-id);    }
        .right-line .fn   { color: var(--java-fn);    }

        @keyframes typeReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0);   }
        }

        /* ── Corner readouts ── */
        .corner {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(125, 211, 252, 0.22);
          letter-spacing: 0.08em;
          z-index: 20;
          pointer-events: none;
          opacity: 1;
          line-height: 1.6;
          text-rendering: geometricPrecision;
        }
        .corner.tl { top: 14px; left: 18px; }
        .corner.tr { top: 14px; right: 18px; text-align: right; }
        .corner.bl { bottom: 14px; left: 18px; }
        .corner.br { bottom: 14px; right: 18px; text-align: right; }
        .corner .teal  { color: rgba(0, 210, 190, 0.45); }
        .corner .amber { color: rgba(245, 180, 50, 0.45); }

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
        @keyframes orbitCW  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes orbitCCW { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
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

      {/* Backdrop */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>

        {/* Ambient Grid Blueprint */}
        <div className="intro-grid" />

        {/* Ambient Side Glows */}
        <div className="glow-left" />
        <div className="glow-right" />

        {/* Corner HUD Indicators */}
        <div className="corner tl">SYS.ARCH // v4.2.1<br /><span className="teal">KERNEL: ACTIVE</span></div>
        <div className="corner tr">SESSION: 0x7F2A<br /><span className="amber">THREADS: 128</span></div>
        <div className="corner bl">LAT: 51.5074° N<br />STACK: C++ / JAVA / PYTHON</div>
        <div className="corner br"><span ref={clockRef}>00:00:00</span><br />FRAME: <span ref={fpsRef}>60</span> FPS</div>

        {/* Code Columns */}
        <div className="code-column left" ref={containerLeftRef}>
          <div className="code-scroller" ref={scrollerLeftRef} />
        </div>
        <div className="code-column right" ref={containerRightRef}>
          <div className="code-scroller" ref={scrollerRightRef} />
        </div>

        {/* Particle Canvas */}
        <canvas id="particleCanvas" ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }} />

        {/* Mercury Drop 1 — orbits CW 16s, starts top-right */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0, zIndex: 2, pointerEvents: "none",
          animation: "orbitCW 16s -2s linear infinite",
        }}>
          <div style={{ position: "absolute",
            transform: "translate(-50%, calc(-1 * min(46vw, 46vh)))" }}>
            <img src="/mercury-drop-1.png" alt="" style={{
              width: "min(13vw, 13vh)", height: "auto", display: "block",
              animation: "wobble1 4s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* Mercury Drop 2 — orbits CCW 22s, starts left */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0, zIndex: 2, pointerEvents: "none",
          animation: "orbitCCW 22s -8s linear infinite",
        }}>
          <div style={{ position: "absolute",
            transform: "translate(-50%, calc(-1 * min(48vw, 48vh)))" }}>
            <img src="/mercury-drop-2.png" alt="" style={{
              width: "min(11vw, 11vh)", height: "auto", display: "block",
              animation: "wobble2 6s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* Mercury Drop 3 — orbits CW 12s, starts bottom */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0, zIndex: 2, pointerEvents: "none",
          animation: "orbitCW 12s -6s linear infinite",
        }}>
          <div style={{ position: "absolute",
            transform: "translate(-50%, calc(-1 * min(44vw, 44vh)))" }}>
            <img src="/mercury-drop-3.png" alt="" style={{
              width: "min(12vw, 12vh)", height: "auto", display: "block",
              animation: "wobble3 5s ease-in-out infinite",
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
          opacity: 1,
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

        {/* Center Assembly — Parallax target wrapper */}
        <div id="centerAssembly" style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          willChange: "transform",
          pointerEvents: "none",
        }}>

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
            flexShrink: 0,
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

      </div>
    </>
  );
}
