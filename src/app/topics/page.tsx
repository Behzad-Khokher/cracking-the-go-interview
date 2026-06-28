import type { Metadata } from "next";
import Link from "next/link";
import { topics, questions } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse Go interview questions by topic — goroutines, channels, interfaces, and more.",
};

export default function TopicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Topics</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        Choose a topic to focus your preparation.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => {
          const count = questions.filter((q) => q.topic === topic.slug).length;
          return (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-3xl mb-3">{topic.icon}</div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                {topic.name}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{topic.description}</p>
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {count} question{count !== 1 ? "s" : ""}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
