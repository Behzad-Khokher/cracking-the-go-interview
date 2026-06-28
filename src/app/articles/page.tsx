import type { Metadata } from "next";
import Link from "next/link";
import { questions, topics } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Articles",
  description: "Deep-dive Go interview articles with explanations and code examples.",
};

const difficultyStyle: Record<string, { bg: string; color: string }> = {
  Easy: { bg: "rgba(34,197,94,0.1)", color: "#4ade80" },
  Medium: { bg: "rgba(234,179,8,0.1)", color: "#facc15" },
  Hard: { bg: "rgba(239,68,68,0.1)", color: "#f87171" },
};

export default function ArticlesPage() {
  const byTopic = topics
    .map((t) => ({ topic: t, qs: questions.filter((q) => q.topic === t.slug) }))
    .filter((g) => g.qs.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>Articles</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Go Interview Guides</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {questions.length} articles across {topics.length} topics — with answers, code, and the nuance that matters in interviews.
        </p>
      </div>

      <div className="space-y-12">
        {byTopic.map(({ topic, qs }) => (
          <section key={topic.slug}>
            <h2 className="flex items-center gap-2 text-base font-bold mb-4 pb-3 border-b" style={{ color: "var(--foreground)", borderColor: "var(--border)" }}>
              <span>{topic.icon}</span>
              {topic.name}
            </h2>
            <div className="space-y-1">
              {qs.map((q, i) => {
                const style = difficultyStyle[q.difficulty] ?? { bg: "transparent", color: "var(--muted)" };
                return (
                  <Link
                    key={q.slug}
                    href={`/articles/${q.slug}`}
                    className="flex items-center gap-4 px-3 py-3.5 row-hover group transition-colors"
                  >
                    <span className="text-xs font-mono w-5 shrink-0 text-right" style={{ color: "var(--muted)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-medium group-hover:text-cyan-400 transition-colors" style={{ color: "var(--foreground)" }}>
                      {q.title}
                    </span>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {q.difficulty}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
