import Link from "next/link";
import Image from "next/image";
import { questions } from "@/lib/questions";
import { videoSeries } from "@/lib/videos";
import { projects, difficultyColor } from "@/lib/projects";

export default function Home() {
  const featuredQuestions = questions.slice(0, 3);
  const featuredVideos = videoSeries[1].videos.slice(0, 3); // concurrency series
  const featuredProjects = projects.slice(0, 3);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden dot-grid hero-gradient">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left space-y-7">
            <div
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border"
              style={{ borderColor: "rgba(34,211,238,0.3)", color: "var(--accent)", background: "rgba(34,211,238,0.07)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              The Go Interview Prep Platform
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight">
              <span className="gradient-text">Crack every</span>
              <br />
              <span style={{ color: "var(--foreground)" }}>Go interview.</span>
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>
              Deep-dive articles, video tutorials from the best Go teachers on YouTube,
              and hands-on projects. Everything you need to master Go and land the role.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/articles"
                className="px-7 py-3 rounded-full font-semibold text-sm transition-all glow-cyan-sm hover:glow-cyan"
                style={{ background: "var(--accent)", color: "#09090b" }}
              >
                Start Learning
              </Link>
              <Link
                href="/videos"
                className="px-7 py-3 rounded-full font-semibold text-sm border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card)" }}
              >
                Watch Tutorials
              </Link>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-2">
              {[
                { val: questions.length, label: "articles" },
                { val: videoSeries.flatMap((s) => s.videos).length, label: "videos" },
                { val: projects.length, label: "projects" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{val}</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gopher */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute inset-0 rounded-full blur-3xl scale-75"
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)" }}
            />
            <Image
              src="/gopher-hero.png"
              alt="Go Gopher"
              width={320}
              height={320}
              className="relative drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-20">

        {/* ── Learning Tracks ── */}
        <section>
          <SectionHeader
            label="Learning Tracks"
            title="Your path to Go mastery"
            subtitle="Follow a structured track or jump to whatever you need most."
          />
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: "🌱",
                title: "Beginner",
                desc: "Go syntax, types, functions, and your first programs.",
                href: "/topics",
                color: "rgba(34,197,94,0.08)",
                border: "rgba(34,197,94,0.2)",
                textColor: "#4ade80",
              },
              {
                icon: "⚡",
                title: "Intermediate",
                desc: "Goroutines, channels, interfaces, and error patterns.",
                href: "/articles",
                color: "rgba(34,211,238,0.08)",
                border: "rgba(34,211,238,0.2)",
                textColor: "var(--accent)",
              },
              {
                icon: "🔥",
                title: "Advanced",
                desc: "GC internals, generics, profiling, and distributed systems.",
                href: "/projects",
                color: "rgba(249,115,22,0.08)",
                border: "rgba(249,115,22,0.2)",
                textColor: "#fb923c",
              },
            ].map((track) => (
              <Link
                key={track.title}
                href={track.href}
                className="p-6 rounded-2xl border card-hover group"
                style={{ background: track.color, borderColor: track.border }}
              >
                <div className="text-3xl mb-3">{track.icon}</div>
                <h3 className="text-base font-bold mb-1" style={{ color: track.textColor }}>{track.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{track.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured Articles ── */}
        <section>
          <SectionHeader
            label="Articles"
            title="Deep-dive interview guides"
            subtitle="Clear answers, code examples, and the nuance interviewers are actually testing for."
            cta={{ href: "/articles", label: "View all articles" }}
          />
          <div className="mt-8 divide-y" style={{ borderColor: "var(--border-subtle)" }}>
            {featuredQuestions.map((q, i) => (
              <Link
                key={q.slug}
                href={`/articles/${q.slug}`}
                className="flex items-start gap-5 py-5 group hover:opacity-90 transition-opacity"
              >
                <span className="text-xs font-mono pt-0.5 w-4 shrink-0" style={{ color: "var(--muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1" style={{ color: "var(--foreground)" }}>
                    {q.title}
                  </h3>
                  <p className="text-xs line-clamp-1" style={{ color: "var(--muted)" }}>{q.shortAnswer}</p>
                </div>
                <DifficultyBadge difficulty={q.difficulty} />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Video Tutorials ── */}
        <section>
          <SectionHeader
            label="Video Tutorials"
            title="Learn from the best on YouTube"
            subtitle="Hand-picked tutorials from top Go educators. Watch directly on YouTube."
            cta={{ href: "/videos", label: "Browse all videos" }}
          />
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {featuredVideos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border overflow-hidden card-hover block"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden" style={{ background: "#000" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.6)" }}>
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.8)", color: "#fff" }}>
                    {video.duration}
                  </div>
                </div>
                {/* Meta */}
                <div className="p-4">
                  <p className="text-xs mb-1.5 font-medium" style={{ color: "var(--accent)" }}>{video.channel}</p>
                  <h3 className="text-sm font-semibold leading-snug line-clamp-2 mb-1.5" style={{ color: "var(--foreground)" }}>
                    {video.title}
                  </h3>
                  <LevelBadge level={video.level} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section>
          <SectionHeader
            label="Projects"
            title="Build to learn"
            subtitle="The fastest way to internalize Go is to ship things. Start here."
            cta={{ href: "/projects", label: "View all projects" }}
          />
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects`}
                className="p-5 rounded-2xl border card-hover group block"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="text-3xl mb-3">{project.icon}</div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{project.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${difficultyColor[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.topics.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="rounded-3xl p-12 text-center border"
          style={{
            background: "linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(59,130,246,0.04) 100%)",
            borderColor: "rgba(34,211,238,0.15)",
          }}
        >
          <Image src="/gopher.png" alt="Gopher" width={64} height={64} className="mx-auto mb-5 opacity-90" />
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
            Ready to ace your Go interview?
          </h2>
          <p className="text-sm mb-7 max-w-md mx-auto" style={{ color: "var(--muted)" }}>
            Start with the fundamentals, work through concurrency, and ship a real project.
            You'll be interview-ready before you know it.
          </p>
          <Link
            href="/articles"
            className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-all glow-cyan hover:scale-105"
            style={{ background: "var(--accent)", color: "#09090b" }}
          >
            Start Now — It's Free
          </Link>
        </section>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function SectionHeader({
  label,
  title,
  subtitle,
  cta,
}: {
  label: string;
  title: string;
  subtitle: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>{label}</p>
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>{title}</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{subtitle}</p>
      </div>
      {cta && (
        <Link href={cta.href} className="text-sm font-medium shrink-0 hover:opacity-80 transition-opacity" style={{ color: "var(--accent)" }}>
          {cta.label} →
        </Link>
      )}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors: Record<string, string> = {
    Easy: "rgba(34,197,94,0.1)",
    Medium: "rgba(234,179,8,0.1)",
    Hard: "rgba(239,68,68,0.1)",
  };
  const text: Record<string, string> = {
    Easy: "#4ade80",
    Medium: "#facc15",
    Hard: "#f87171",
  };
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
      style={{ background: colors[difficulty] ?? "transparent", color: text[difficulty] ?? "var(--muted)" }}
    >
      {difficulty}
    </span>
  );
}

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Beginner: "#4ade80",
    Intermediate: "var(--accent)",
    Advanced: "#f87171",
  };
  return (
    <span className="text-xs font-medium" style={{ color: colors[level] ?? "var(--muted)" }}>
      {level}
    </span>
  );
}
