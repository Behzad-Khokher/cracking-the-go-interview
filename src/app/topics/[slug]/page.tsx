import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { topics, getTopic, getQuestionsByTopic } from "@/lib/questions";

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return {
    title: topic.name,
    description: `Go interview articles on ${topic.name}: ${topic.description}`,
  };
}

const difficultyStyle: Record<string, { bg: string; color: string }> = {
  Easy: { bg: "rgba(34,197,94,0.1)", color: "#4ade80" },
  Medium: { bg: "rgba(234,179,8,0.1)", color: "#facc15" },
  Hard: { bg: "rgba(239,68,68,0.1)", color: "#f87171" },
};

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const topicQuestions = getQuestionsByTopic(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/topics" className="hover:text-white transition-colors">Topics</Link>
        <span>/</span>
        <span style={{ color: "var(--foreground)" }}>{topic.name}</span>
      </nav>

      <div className="mb-10">
        <div className="text-5xl mb-4">{topic.icon}</div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>{topic.name}</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{topic.description}</p>
        <p className="text-xs mt-1 font-mono" style={{ color: "var(--muted)" }}>
          {topicQuestions.length} article{topicQuestions.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-1">
        {topicQuestions.map((q, i) => {
          const ds = difficultyStyle[q.difficulty] ?? { bg: "transparent", color: "var(--muted)" };
          return (
            <Link
              key={q.slug}
              href={`/articles/${q.slug}`}
              className="flex items-center gap-4 px-3 py-4 row-hover group transition-colors"
            >
              <span className="text-xs font-mono w-5 shrink-0 text-right" style={{ color: "var(--muted)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm font-medium group-hover:text-cyan-400 transition-colors" style={{ color: "var(--foreground)" }}>
                {q.title}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0" style={{ background: ds.bg, color: ds.color }}>
                {q.difficulty}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <Link href="/topics" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--accent)" }}>
          ← All Topics
        </Link>
      </div>
    </div>
  );
}
