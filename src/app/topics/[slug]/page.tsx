import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { topics, getTopic, getQuestionsByTopic } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return {
    title: topic.name,
    description: `Go interview questions about ${topic.name}: ${topic.description}`,
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const topicQuestions = getQuestionsByTopic(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/topics" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Topics</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-white">{topic.name}</span>
      </nav>

      <div className="mb-10">
        <div className="text-4xl mb-3">{topic.icon}</div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{topic.name}</h1>
        <p className="text-zinc-500 dark:text-zinc-400">{topic.description}</p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          {topicQuestions.length} question{topicQuestions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {topicQuestions.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicQuestions.map((q) => (
            <QuestionCard key={q.slug} question={q} />
          ))}
        </div>
      ) : (
        <p className="text-zinc-500 dark:text-zinc-400">No questions yet for this topic.</p>
      )}

      <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <Link href="/topics" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
          ← All Topics
        </Link>
      </div>
    </div>
  );
}
