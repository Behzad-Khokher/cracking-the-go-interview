"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/videos", label: "Videos" },
  { href: "/projects", label: "Projects" },
  { href: "/topics", label: "Topics" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--border)",
        background: "rgba(9, 9, 11, 0.85)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/gopher.png"
              alt="Go Gopher"
              width={32}
              height={32}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="font-bold text-base tracking-tight" style={{ color: "var(--foreground)" }}>
              Cracking<span style={{ color: "var(--accent)" }}>TheGo</span>Interview
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                  style={{
                    color: active ? "var(--accent)" : "var(--muted)",
                    background: active ? "rgba(34, 211, 238, 0.08)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
