import { cn } from "../lib/cn";
import { getPlatform } from "../lib/platforms";
import { getHatenaUrl } from "../utils/hatena";
import { DetailButton } from "./buttons/DetailButton";
import { HatenaBadge } from "./HatenaBadge";

interface MangaCardProps {
  item: {
    title: string;
    url: string;
    mangaImageUrl: string | null;
    hatenaCount: number;
    mangaId: string;
    description?: string | null;
    publishedAt?: string;
    platformId: string;
  };
  rank?: number;
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

export function MangaCard({ item, rank }: MangaCardProps) {
  const hatenaUrl = item.url ? getHatenaUrl(item.url) : undefined;
  const platform = getPlatform(item.platformId);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--glass)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(102,126,234,0.2)]">
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <HatenaBadge count={item.hatenaCount} compact hatenaUrl={hatenaUrl} />
        <div className="flex items-center gap-3">
          {rank && (
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--surface)] text-sm font-bold text-[var(--text-secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
                rank <= 3 &&
                  "bg-gradient-to-br from-[#ffd700] to-[#ffed4e] text-[#1a1a2e] shadow-[0_4px_12px_rgba(255,215,0,0.4)]",
              )}
            >
              {rank}
            </div>
          )}
          {/* 一時的にお気に入り登録ボタンは非表示 */}
          <DetailButton mangaId={item.mangaId} />
        </div>
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="flex flex-col text-inherit transition-opacity duration-200 hover:opacity-90"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0]">
          {item.mangaImageUrl && (
            <img
              src={item.mangaImageUrl}
              alt={item.title}
              className="absolute inset-0 block h-full w-full object-cover"
              decoding="async"
              fetchPriority="low"
              loading="lazy"
              referrerPolicy="no-referrer"
              sizes="(max-width: 767px) 100vw, 200px"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
          <p className="line-clamp-3 text-base font-semibold leading-6 md:text-lg">{item.title}</p>
          {item.publishedAt && (
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
          )}
        </div>
      </a>
    </div>
  );
}
