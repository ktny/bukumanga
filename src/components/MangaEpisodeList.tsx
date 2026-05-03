import { HatenaBadge } from "./HatenaBadge";
import { CircleSlash2 } from "lucide-react";
import { getHatenaUrl } from "../utils/hatena";
import { LoadingIndicator } from "./LoadingIndicator";

export type EpisodeSortKey = "hatenaCountDesc" | "publishedAtAsc" | "publishedAtDesc";

export interface MangaEpisodeSummary {
  hatenaCount: number;
  imageUrl: string | null;
  publishedAt: string;
  title: string;
  url: string;
}

export const EPISODE_SORT_OPTIONS: { label: string; value: EpisodeSortKey }[] = [
  { label: "新しい順", value: "publishedAtDesc" },
  { label: "古い順", value: "publishedAtAsc" },
  { label: "ブックマーク順", value: "hatenaCountDesc" },
];

function formatEpisodeDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}/${month}/${day}`;
}

interface MangaEpisodeListProps {
  episodes: MangaEpisodeSummary[];
  episodeSort: EpisodeSortKey;
  onEpisodeSortChange: (value: EpisodeSortKey) => void;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  isReachingEnd?: boolean;
  loadMoreRef?: (node?: Element | null) => void;
}

export function MangaEpisodeList({
  episodes,
  episodeSort,
  onEpisodeSortChange,
  isLoading = false,
  isLoadingMore = false,
  isReachingEnd = true,
  loadMoreRef,
}: MangaEpisodeListProps) {
  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">エピソード一覧</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            はてなブックマークで登録済のエピソードのみ表示されます。
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span>並び順</span>
          <select
            value={episodeSort}
            onChange={(event) => onEpisodeSortChange(event.target.value as EpisodeSortKey)}
            className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-sm text-[var(--text-primary,#1a1a2e)] outline-none transition focus:border-[var(--text-primary,#1a1a2e)]"
          >
            {EPISODE_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <LoadingIndicator size="lg" />
      ) : episodes.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--border)] bg-white/40 px-6 py-10 text-center text-sm text-[var(--text-secondary)]">
          <CircleSlash2 className="h-8 w-8 text-[var(--text-muted)]" aria-hidden="true" />
          <p>登録済みエピソードはまだありません</p>
        </div>
      ) : (
        <div className="space-y-3">
          {episodes.map((episode) => (
            <a
              key={episode.url}
              href={episode.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white/60 px-4 py-4 text-inherit transition duration-200 hover:-translate-y-0.5 hover:bg-white/75"
            >
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-sm text-[var(--text-secondary)]">
                  {formatEpisodeDate(episode.publishedAt)}
                </p>
                <p className="line-clamp-2 text-base font-semibold leading-7 text-[var(--text-primary,#1a1a2e)] md:text-lg">
                  {episode.title}
                </p>
              </div>
              <div className="shrink-0 self-center">
                <HatenaBadge
                  count={episode.hatenaCount}
                  compact
                  hatenaUrl={getHatenaUrl(episode.url)}
                  className="items-center"
                />
              </div>
            </a>
          ))}
          {!isReachingEnd && <div ref={loadMoreRef} className="h-4" />}
          {isLoadingMore && <LoadingIndicator className="py-4" inline size="lg" />}
        </div>
      )}
    </section>
  );
}
