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
    "The definitive Go learning platform. Master interview questions, watch video tutorials, and build real projects in Go (Golang).",
  keywords: ["Go", "Golang", "interview prep", "goroutines", "channels", "concurrency", "tutorials"],
  openGraph: {
    title: "Cracking the Go Interview",
    description: "The definitive Go learning platform — questions, videos, and projects.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-10 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-semibold" style={{ color: "var(--foreground)" }}>
              <span>🐹</span>
              <span>CrackingTheGoInterview</span>
            </div>
            <p>Built for Go developers everywhere</p>
            <a
              href="https://go.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              go.dev ↗
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
