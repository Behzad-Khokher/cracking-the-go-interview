import type { Metadata } from "next";
import { videoSeries } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Video Tutorials",
  description: "Hand-picked Go tutorial videos from the best Go educators on YouTube.",
};

const levelColor: Record<string, { color: string }> = {
  Beginner: { color: "#4ade80" },
  Intermediate: { color: "#22d3ee" },
  Advanced: { color: "#f87171" },
};

export default function VideosPage() {
  const totalVideos = videoSeries.reduce((acc, s) => acc + s.videos.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>Video Tutorials</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Learn Go on YouTube</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {totalVideos} hand-picked videos from top Go educators. Opens directly on YouTube.
        </p>
      </div>

      <div className="space-y-16">
        {videoSeries.map((series) => (
          <section key={series.slug}>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-1" style={{ color: "var(--foreground)" }}>{series.title}</h2>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{series.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {series.videos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border overflow-hidden card-hover block"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden" style={{ background: "#000" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                        style={{ background: "rgba(0,0,0,0.65)" }}
                      >
                        <svg className="w-5 h-5 ml-0.5" fill="white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="absolute bottom-2 right-2 text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(0,0,0,0.8)", color: "#fff" }}
                    >
                      {video.duration}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>{video.channel}</p>
                      <span className="text-xs font-medium" style={{ color: levelColor[video.level]?.color ?? "var(--muted)" }}>
                        {video.level}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: "var(--foreground)" }}>
                      {video.title}
                    </h3>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                      {video.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
