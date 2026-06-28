import Link from "next/link";
import { Question, difficultyColor } from "@/lib/questions";

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <Link
      href={`/questions/${question.slug}`}
      className="block p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug">
          {question.title}
        </h3>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[question.difficulty]}`}
        >
          {question.difficulty}
        </span>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
        {question.shortAnswer}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {question.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
