import { Heart } from "lucide-react";
import { cn } from "../lib/cn";
import { useFavorites } from "../hooks/useFavorites";

export function FavoriteToggleButton({
  mangaId,
  className,
}: {
  mangaId: string;
  className?: string;
}) {
  const { authenticated, isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(mangaId);
  const tooltipLabel = favorite ? "お気に入り解除" : "お気に入り登録";

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        aria-label={tooltipLabel}
        onClick={() => {
          if (!authenticated) {
            globalThis.alert("お気に入りにはログインが必要です");
            return;
          }

          void toggleFavorite(mangaId)
            .then(() => {})
            .catch(() => {
              globalThis.alert("お気に入りの更新に失敗しました");
            });
        }}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff4136]/35 bg-white/40 text-[#ff4136] transition duration-200 hover:scale-105 hover:border-[#ff4136]/55 hover:bg-white/70",
          className,
        )}
      >
        <Heart
          className={cn("h-[22px] w-[22px]", favorite ? "fill-current" : "fill-transparent")}
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </button>
      <span className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111827] px-2.5 py-1.5 text-xs font-semibold text-white shadow-[0_6px_24px_rgba(0,0,0,0.2)] group-hover:block">
        {tooltipLabel}
      </span>
    </div>
  );
}
