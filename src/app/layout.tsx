import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Cracking the Go Interview",
    template: "%s | Cracking the Go Interview",
  },
  description:
    "Master Go (Golang) interview questions with clear explanations, code examples, and deep-dives into goroutines, channels, interfaces, and more.",
  keywords: ["Go", "Golang", "interview", "interview questions", "goroutines", "channels", "concurrency"],
  openGraph: {
    title: "Cracking the Go Interview",
    description: "Master Go interview questions with clear explanations and code examples.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>
            Built for Go developers everywhere ·{" "}
            <a href="https://go.dev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              go.dev ↗
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
