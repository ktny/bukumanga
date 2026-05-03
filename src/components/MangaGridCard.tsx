import { Link } from "react-router-dom";
import { getPlatform } from "../lib/platforms";
import { cn } from "../lib/cn";
import { BookmarkIcon } from "./icons/BookmarkIcon";

export interface MangaCardItem {
  id: string;
  title: string;
  authors?: { id: string; name: string }[];
  imageUrl: string | null;
  platformId: string;
  hatenaCount: number;
}

export function MangaCardContent({
  item,
  imageClassName,
  imageSizes,
}: {
  item: MangaCardItem;
  imageClassName?: string;
  imageSizes?: string;
}) {
  const authorLabel = item.authors?.map((author) => author.name).join(" / ");

  return (
    <>
      <div className="aspect-square shrink-0 overflow-hidden bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0]">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-300 hover:scale-105",
              imageClassName,
            )}
            decoding="async"
            fetchPriority="low"
            loading="lazy"
            referrerPolicy="no-referrer"
            sizes={imageSizes ?? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 180px"}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold">{item.title}</h3>
        {authorLabel && (
          <p className="truncate text-xs text-[var(--text-secondary)]">{authorLabel}</p>
        )}
        <span className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
          {getPlatform(item.platformId)?.name || item.platformId}
        </span>
        {item.hatenaCount > 0 && (
          <span className="mt-0.5 flex items-center gap-1 text-[13px] text-[var(--text-secondary)]">
            <BookmarkIcon className="h-4 w-4" /> {item.hatenaCount}
          </span>
        )}
      </div>
    </>
  );
}

export function MangaGridCard({ item }: { item: MangaCardItem }) {
  return (
    <Link
      to={`/manga/${item.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--glass)] text-inherit backdrop-blur-xl transition duration-200 hover:-translate-y-0.5"
    >
      <MangaCardContent item={item} />
    </Link>
  );
}
