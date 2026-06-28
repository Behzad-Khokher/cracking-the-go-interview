import Link from "next/link";
import { questions, topics } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";

export default function Home() {
  const featuredQuestions = questions.slice(0, 6);
  const stats = {
    questions: questions.length,
    topics: topics.length,
    difficulties: ["Easy", "Medium", "Hard"],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Hero */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="text-6xl">🐹</div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
          Crack the{" "}
          <span className="text-blue-600 dark:text-blue-400">Go Interview</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Deep-dive Go interview questions with clear answers, code examples, and explanations.
          From goroutines to generics — everything you need to land your next Go role.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/questions"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors text-center"
          >
            Browse All Questions
          </Link>
          <Link
            href="/topics"
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-colors text-center"
          >
            Explore Topics
          </Link>
        </div>
        {/* Stats */}
        <div className="flex items-center justify-center gap-8 pt-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span><strong className="text-zinc-900 dark:text-white">{stats.questions}</strong> questions</span>
          <span><strong className="text-zinc-900 dark:text-white">{stats.topics}</strong> topics</span>
          <span><strong className="text-zinc-900 dark:text-white">3</strong> difficulty levels</span>
        </div>
      </section>

      {/* Topics grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Browse by Topic</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-2xl mb-2">{topic.icon}</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug">
                {topic.name}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                {topic.description}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured questions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Featured Questions</h2>
          <Link
            href="/questions"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredQuestions.map((q) => (
            <QuestionCard key={q.slug} question={q} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
        <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
          Ready to prepare?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
          Start with the most common Go interview topics and work your way up to advanced concurrency patterns.
        </p>
        <Link
          href="/questions"
          className="inline-block px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Start Studying
        </Link>
      </section>
    </div>
  );
}
