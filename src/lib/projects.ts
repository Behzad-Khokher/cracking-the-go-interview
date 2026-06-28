export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Project {
  slug: string;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  topics: string[];
  whatYouLearn: string[];
  estimatedTime: string;
  icon: string;
}

export const projects: Project[] = [
  {
    slug: "cli-task-manager",
    title: "CLI Task Manager",
    description: "Build a command-line todo app that persists tasks to a JSON file. Your first real Go program.",
    difficulty: "Beginner",
    topics: ["CLI", "File I/O", "JSON", "Structs"],
    whatYouLearn: ["Parsing CLI args with os.Args", "Reading/writing JSON files", "Struct methods", "Error handling basics"],
    estimatedTime: "3–5 hours",
    icon: "📋",
  },
  {
    slug: "http-server",
    title: "HTTP Server from Scratch",
    description: "Build a fully working HTTP server using only the Go standard library — no frameworks, no magic.",
    difficulty: "Beginner",
    topics: ["net/http", "Routing", "Handlers", "Middleware"],
    whatYouLearn: ["net/http package", "Handler interfaces", "Request/response lifecycle", "Basic middleware patterns"],
    estimatedTime: "4–6 hours",
    icon: "🌐",
  },
  {
    slug: "web-scraper",
    title: "Concurrent Web Scraper",
    description: "Scrape multiple URLs concurrently using goroutines and channels. Classic Go showcase project.",
    difficulty: "Intermediate",
    topics: ["Goroutines", "Channels", "HTTP", "HTML Parsing"],
    whatYouLearn: ["Fan-out with goroutines", "Channel pipelines", "Rate limiting scrapers", "Parsing HTML with goquery"],
    estimatedTime: "6–8 hours",
    icon: "🕷️",
  },
  {
    slug: "key-value-store",
    title: "In-Memory Key-Value Store",
    description: "Build a Redis-like in-memory KV store with a TCP server, GET/SET/DEL commands, and TTL support.",
    difficulty: "Intermediate",
    topics: ["TCP", "sync.RWMutex", "net", "Concurrency"],
    whatYouLearn: ["TCP server with net.Listener", "Concurrent map access with RWMutex", "TTL with goroutines and time.Timer", "Custom protocol parsing"],
    estimatedTime: "8–12 hours",
    icon: "🗃️",
  },
  {
    slug: "chat-server",
    title: "Real-Time Chat Server",
    description: "WebSocket chat server where multiple clients can join rooms and broadcast messages.",
    difficulty: "Intermediate",
    topics: ["WebSockets", "Goroutines", "Channels", "net/http"],
    whatYouLearn: ["WebSocket upgrade with gorilla/websocket", "Hub pattern for broadcasting", "Managing goroutine lifecycles", "Graceful shutdown"],
    estimatedTime: "8–12 hours",
    icon: "💬",
  },
  {
    slug: "rate-limiter",
    title: "Rate Limiter Library",
    description: "Implement token bucket and sliding window rate limiters as a reusable Go package with full tests.",
    difficulty: "Advanced",
    topics: ["Algorithms", "sync", "Testing", "Packages"],
    whatYouLearn: ["Token bucket algorithm", "Sliding window algorithm", "Mutex vs atomic operations", "Table-driven testing", "Benchmarking with testing.B"],
    estimatedTime: "10–15 hours",
    icon: "⏱️",
  },
];

export const difficultyColor: Record<ProjectDifficulty, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Advanced: "bg-red-500/10 text-red-400 border border-red-500/20",
};
