import type { Metadata } from "next";
import Link from "next/link";
import { topics, questions } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse Go interview articles by topic.",
};

export default function TopicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>Topics</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Browse by Topic</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Pick a concept to focus your prep.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topics.map((topic) => {
          const count = questions.filter((q) => q.topic === topic.slug).length;
          return (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="p-5 rounded-2xl border card-hover group block"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="text-3xl mb-3">{topic.icon}</div>
              <h2 className="text-sm font-bold mb-1 group-hover:text-cyan-400 transition-colors" style={{ color: "var(--foreground)" }}>
                {topic.name}
              </h2>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--muted)" }}>{topic.description}</p>
              <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                {count} article{count !== 1 ? "s" : ""}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
