import { cn } from "../lib/cn";
import { getPlatform } from "../lib/platforms";
import { getHatenaUrl } from "../utils/hatena";
import { DetailButton } from "./buttons/DetailButton";
import { FavoriteToggleButton } from "./FavoriteToggleButton";
import { HatenaBadge } from "./HatenaBadge";

interface RankingListItemProps {
  item: {
    id: string;
    title: string;
    url: string;
    description: string | null;
    mangaImageUrl: string | null;
    hatenaCount: number;
    mangaId: string;
    publishedAt: string;
    platformId: string;
  };
  rank: number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 24) {
    return `${diffHours}時間前`;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}

export function RankingListItem({ item, rank }: RankingListItemProps) {
  const hatenaUrl = item.url ? getHatenaUrl(item.url) : undefined;
  const platform = getPlatform(item.platformId);

  return (
    <div className="relative flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--glass)] p-4 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(102,126,234,0.2)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] text-base font-bold text-[var(--text-secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
              rank <= 3 &&
                "bg-gradient-to-br from-[#ffd700] to-[#ffed4e] text-[#1a1a2e] shadow-[0_4px_12px_rgba(255,215,0,0.4)]",
            )}
          >
            {rank}
          </div>
          <HatenaBadge count={item.hatenaCount} compact hatenaUrl={hatenaUrl} />
        </div>
        <div className="flex items-center gap-2">
          <FavoriteToggleButton mangaId={item.mangaId} />
          <DetailButton mangaId={item.mangaId} />
        </div>
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="flex flex-col gap-3 text-inherit transition-opacity duration-200 hover:opacity-90 sm:flex-row sm:items-start sm:gap-4"
      >
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-[0_2px_4px_rgba(0,0,0,0.05)] sm:aspect-square sm:w-[120px] md:w-[140px] lg:w-[200px]">
          {item.mangaImageUrl && (
            <img
              src={item.mangaImageUrl}
              alt={item.title}
              className="absolute inset-0 block h-full w-full object-cover"
              decoding="async"
              fetchPriority="low"
              loading="lazy"
              referrerPolicy="no-referrer"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 140px, 200px"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-base font-semibold leading-6 sm:text-lg lg:text-xl">{item.title}</p>
          {item.description && (
            <p className="line-clamp-3 text-sm leading-6 text-[var(--text-muted)] sm:text-[15px] lg:text-base">
              {item.description}
            </p>
          )}
          <div className="mt-auto flex flex-col gap-1">
            <span className="text-sm text-[var(--text-secondary)]">
              {formatDate(item.publishedAt)}
            </span>
            {platform && (
              <span className="self-start rounded bg-[rgba(100,100,100,0.15)] px-2 py-1 text-xs text-[var(--text-secondary)]">
                {platform.name}
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
