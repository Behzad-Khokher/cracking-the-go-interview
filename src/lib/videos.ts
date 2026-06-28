export interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  topic: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  youtubeId: string;
  description: string;
}

export interface VideoSeries {
  slug: string;
  title: string;
  description: string;
  videos: Video[];
}

export const videoSeries: VideoSeries[] = [
  {
    slug: "getting-started",
    title: "Getting Started with Go",
    description: "Zero to comfortable in Go. Perfect if you're coming from another language.",
    videos: [
      {
        id: "go-in-100-seconds",
        title: "Go in 100 Seconds",
        channel: "Fireship",
        duration: "2:29",
        topic: "Introduction",
        level: "Beginner",
        youtubeId: "446E-r0rXHI",
        description: "A lightning-fast overview of what makes Go special — concurrency, simplicity, and speed.",
      },
      {
        id: "golang-tutorial-beginners",
        title: "Golang Tutorial for Beginners — Full Go Course",
        channel: "TechWorld with Nana",
        duration: "3:24:43",
        topic: "Fundamentals",
        level: "Beginner",
        youtubeId: "yyUHQIec83I",
        description: "The most comprehensive beginner course covering syntax, data types, functions, packages, and more.",
      },
      {
        id: "go-variables-types",
        title: "Go Variables, Types & Functions",
        channel: "Traversy Media",
        duration: "1:03:20",
        topic: "Fundamentals",
        level: "Beginner",
        youtubeId: "SqrbIlUwR0U",
        description: "Hands-on walkthrough of Go's type system, variable declarations, and function signatures.",
      },
    ],
  },
  {
    slug: "concurrency",
    title: "Concurrency Deep Dive",
    description: "Master goroutines, channels, and Go's concurrency model — the topic that comes up in every Go interview.",
    videos: [
      {
        id: "concurrency-patterns",
        title: "Go Concurrency Patterns",
        channel: "Google Talks",
        duration: "51:26",
        topic: "Concurrency",
        level: "Intermediate",
        youtubeId: "f6kdp27TYZs",
        description: "Rob Pike's classic talk on Go's concurrency primitives and the patterns built on top of them.",
      },
      {
        id: "advanced-concurrency",
        title: "Advanced Go Concurrency Patterns",
        channel: "Google Talks",
        duration: "34:25",
        topic: "Concurrency",
        level: "Advanced",
        youtubeId: "QDDwwePbDtw",
        description: "A follow-up to Rob Pike's original talk — context cancellation, pipelines, and fan-out patterns.",
      },
      {
        id: "goroutines-channels",
        title: "Goroutines & Channels Explained",
        channel: "Anthony GG",
        duration: "22:14",
        topic: "Goroutines",
        level: "Intermediate",
        youtubeId: "oV9rvDllKEg",
        description: "Practical demonstration of goroutines and channels with real-world examples and common mistakes.",
      },
    ],
  },
  {
    slug: "building-real-projects",
    title: "Building Real Projects",
    description: "Learn by doing — build REST APIs, CLIs, and web servers in Go.",
    videos: [
      {
        id: "rest-api-go",
        title: "Build a REST API with Go — From Scratch",
        channel: "Dreams of Code",
        duration: "46:51",
        topic: "APIs",
        level: "Intermediate",
        youtubeId: "d_L64KT3SFM",
        description: "Build a production-quality REST API using only the Go standard library — no heavy frameworks.",
      },
      {
        id: "cli-tool-go",
        title: "Build a CLI Tool with Go & Cobra",
        channel: "TechWorld with Nana",
        duration: "38:22",
        topic: "CLI",
        level: "Intermediate",
        youtubeId: "SSRIn5DAmyw",
        description: "Build a fully featured command-line tool using Go's Cobra library — flags, subcommands, and more.",
      },
      {
        id: "go-fiber-api",
        title: "Go Fiber REST API with PostgreSQL",
        channel: "Akhil Sharma",
        duration: "1:12:05",
        topic: "APIs",
        level: "Advanced",
        youtubeId: "Iq2qT0fRhAA",
        description: "Full-stack Go API with Fiber framework, PostgreSQL, Docker, and JWT authentication.",
      },
    ],
  },
];

export function getAllVideos(): Video[] {
  return videoSeries.flatMap((s) => s.videos);
}
