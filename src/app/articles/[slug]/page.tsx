import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { questions, getQuestion, getTopic } from "@/lib/questions";

export async function generateStaticParams() {
  return questions.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const q = getQuestion(slug);
  if (!q) return {};
  return { title: q.title, description: q.shortAnswer };
}

const difficultyStyle: Record<string, { bg: string; color: string }> = {
  Easy: { bg: "rgba(34,197,94,0.1)", color: "#4ade80" },
  Medium: { bg: "rgba(234,179,8,0.1)", color: "#facc15" },
  Hard: { bg: "rgba(239,68,68,0.1)", color: "#f87171" },
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) notFound();

  const topic = getTopic(question.topic);
  const ds = difficultyStyle[question.difficulty] ?? { bg: "transparent", color: "var(--muted)" };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-white transition-colors">Articles</Link>
        <span>/</span>
        <span style={{ color: "var(--foreground)" }} className="truncate">{question.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          {topic && (
            <Link
              href={`/topics/${topic.slug}`}
              className="text-xs font-medium px-2.5 py-1 rounded-full border transition-colors hover:border-cyan-400/40"
              style={{ borderColor: "rgba(34,211,238,0.2)", color: "var(--accent)", background: "rgba(34,211,238,0.06)" }}
            >
              {topic.icon} {topic.name}
            </Link>
          )}
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: ds.bg, color: ds.color }}
          >
            {question.difficulty}
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-snug" style={{ color: "var(--foreground)" }}>
          {question.title}
        </h1>
        <blockquote
          className="text-sm leading-relaxed border-l-2 pl-4 italic"
          style={{ borderColor: "var(--accent)", color: "var(--muted)" }}
        >
          {question.shortAnswer}
        </blockquote>
      </header>

      {/* Answer */}
      <section className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>Full Answer</h2>
        <div className="text-sm leading-relaxed space-y-4 whitespace-pre-wrap" style={{ color: "#d4d4d8" }}>
          {question.answer}
        </div>
      </section>

      {/* Code */}
      {question.codeExample && (
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "var(--accent)" }}>Code Example</h2>
          <pre
            className="rounded-2xl p-6 overflow-x-auto text-sm leading-relaxed font-mono border"
            style={{ background: "#0d0d10", borderColor: "var(--border)", color: "#e4e4e7" }}
          >
            <code>{question.codeExample}</code>
          </pre>
        </section>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md font-mono"
            style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted)", border: "1px solid var(--border)" }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <Link href="/articles" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--accent)" }}>
          ← All Articles
        </Link>
        {topic && (
          <Link href={`/topics/${topic.slug}`} className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--accent)" }}>
            More {topic.name} →
          </Link>
        )}
      </div>
    </div>
  );
}
