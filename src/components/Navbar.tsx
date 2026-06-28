import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐹</span>
            <span className="font-bold text-zinc-900 dark:text-white text-lg tracking-tight">
              CrackingTheGoInterview
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/questions" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Questions
            </Link>
            <Link href="/topics" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Topics
            </Link>
            <a
              href="https://go.dev/doc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Go Docs ↗
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
