import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { questions, getQuestion, getTopic, difficultyColor } from "@/lib/questions";

export async function generateStaticParams() {
  return questions.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const q = getQuestion(slug);
  if (!q) return {};
  return {
    title: q.title,
    description: q.shortAnswer,
  };
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) notFound();

  const topic = getTopic(question.topic);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/questions" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Questions</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-white truncate">{question.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          {topic && (
            <Link
              href={`/topics/${topic.slug}`}
              className="text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              {topic.icon} {topic.name}
            </Link>
          )}
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColor[question.difficulty]}`}>
            {question.difficulty}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-snug">
          {question.title}
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
          {question.shortAnswer}
        </p>
      </div>

      {/* Full answer */}
      <section className="prose prose-zinc dark:prose-invert max-w-none mb-8">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Full Answer</h2>
        <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-3 text-sm whitespace-pre-wrap">
          {question.answer}
        </div>
      </section>

      {/* Code example */}
      {question.codeExample && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Code Example</h2>
          <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 rounded-xl p-5 overflow-x-auto text-sm leading-relaxed font-mono border border-zinc-800">
            <code>{question.codeExample}</code>
          </pre>
        </section>
      )}

      {/* Tags */}
      <section className="mb-10">
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded-md font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <Link href="/questions" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
          ← All Questions
        </Link>
        {topic && (
          <Link href={`/topics/${topic.slug}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
            More {topic.name} questions →
          </Link>
        )}
      </div>
    </div>
  );
}
