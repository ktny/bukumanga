"use client";

import { useRef } from "react";
import { CircleSlash2 } from "lucide-react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { LoadingIndicator } from "./LoadingIndicator";
import { MangaCardContent, type MangaCardItem } from "./MangaGridCard";

interface MangaCarouselListProps {
  emptyMessage?: string;
  swrKey: string | null;
  title: string;
  fetcher: () => Promise<MangaCardItem[]>;
}

export function MangaCarouselList({
  emptyMessage = "表示できる作品はまだありません",
  swrKey,
  title,
  fetcher,
}: MangaCarouselListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useSWR<MangaCardItem[]>(swrKey, fetcher);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) {
      return;
    }

    const { current } = scrollRef;
    const scrollAmount = 350;
    const maxScroll = current.scrollWidth - current.clientWidth;

    if (direction === "left") {
      if (current.scrollLeft <= 0) {
        current.scrollTo({ behavior: "smooth", left: maxScroll });
      } else {
        current.scrollBy({ behavior: "smooth", left: -scrollAmount });
      }
    } else if (current.scrollLeft >= maxScroll - 1) {
      current.scrollTo({ behavior: "smooth", left: 0 });
    } else {
      current.scrollBy({ behavior: "smooth", left: scrollAmount });
    }
  };

  if (isLoading) {
    return <LoadingIndicator className="px-4 py-4" inline size="lg" />;
  }
  if (error || !data || data.length === 0) {
    return (
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">{title}</h2>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--border)] bg-white/40 px-6 py-10 text-center text-sm text-[var(--text-secondary)]">
          <CircleSlash2 className="h-8 w-8 text-[var(--text-muted)]" aria-hidden="true" />
          <p>{emptyMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">{title}</h2>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-2">
          <button
            type="button"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-black/80 active:scale-95"
            onClick={() => scroll("left")}
            aria-label="Previous"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Previous</title>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-black/80 active:scale-95"
            onClick={() => scroll("right")}
            aria-label="Next"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Next</title>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        <div
          className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={scrollRef}
        >
          {data.map((manga) => (
            <Link
              key={manga.id}
              to={`/manga/${manga.id}`}
              className="flex w-40 min-w-40 flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--glass)] text-inherit backdrop-blur-xl transition duration-200 hover:-translate-y-0.5"
            >
              <MangaCardContent item={manga} imageSizes="160px" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
