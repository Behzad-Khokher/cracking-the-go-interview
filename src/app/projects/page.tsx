import type { Metadata } from "next";
import { projects, difficultyColor } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Build real Go projects to cement your skills and impress interviewers.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>Projects</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Build to learn Go</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          The fastest way to internalize Go is to ship real things. These projects are designed to force you
          into the patterns that come up most in interviews.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{project.icon}</span>
                <div>
                  <h2 className="text-base font-bold" style={{ color: "var(--foreground)" }}>{project.title}</h2>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{project.estimatedTime}</span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${difficultyColor[project.difficulty]}`}>
                {project.difficulty}
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: "#a1a1aa" }}>{project.description}</p>

            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>What you'll learn</p>
              <ul className="space-y-1">
                {project.whatYouLearn.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "#a1a1aa" }}>
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              {project.topics.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted)", border: "1px solid var(--border)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
