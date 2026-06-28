import type { Metadata } from "next";
import { questions, topics, difficultyColor, type Difficulty } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";

export const metadata: Metadata = {
  title: "All Questions",
  description: "Browse all Go interview questions sorted by topic and difficulty.",
};

export default function QuestionsPage() {
  const easyCnt = questions.filter((q) => q.difficulty === "Easy").length;
  const medCnt = questions.filter((q) => q.difficulty === "Medium").length;
  const hardCnt = questions.filter((q) => q.difficulty === "Hard").length;

  const byTopic = topics
    .map((t) => ({ topic: t, qs: questions.filter((q) => q.topic === t.slug) }))
    .filter((g) => g.qs.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">All Questions</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          {questions.length} questions across {topics.length} topics
        </p>
        <div className="flex gap-3 mt-4">
          {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
            <span key={d} className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColor[d]}`}>
              {d}: {d === "Easy" ? easyCnt : d === "Medium" ? medCnt : hardCnt}
            </span>
          ))}
        </div>
      </div>

      {byTopic.map(({ topic, qs }) => (
        <section key={topic.slug}>
          <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
            <span>{topic.icon}</span>
            {topic.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qs.map((q) => (
              <QuestionCard key={q.slug} question={q} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
