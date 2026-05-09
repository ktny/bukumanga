import { useMemo, useState } from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { MangaCardContent, type MangaCardItem } from "../components/MangaGridCard";
import { SEO } from "../components/SEO";
import { useAuth } from "../hooks/useAuth";
import { useInfiniteApiList } from "../hooks/useInfiniteApiList";
import { fetchApiJson } from "../lib/api";
import { cn } from "../lib/cn";

interface FavoritesResponse {
  data: {
    items: (MangaCardItem & {
      description: string | null;
      favoriteCreatedAt: string;
      isFavorite: number;
      updatedAt: string | null;
      url: string;
    })[];
    hasNextPage: boolean;
  };
  success: boolean;
}

type SortKey = "favoriteCreatedAt" | "title" | "updatedAt" | "hatenaCount";
const PAGE_SIZE = 24;

const sortOptions: { label: string; value: SortKey }[] = [
  { label: "お気に入り登録順", value: "favoriteCreatedAt" },
  { label: "タイトル", value: "title" },
  { label: "更新日時", value: "updatedAt" },
  { label: "最大ブックマーク数", value: "hatenaCount" },
];

export default function Favorites() {
  const { authenticated, isLoading: isAuthLoading, login } = useAuth();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("favoriteCreatedAt");
  const getKey = (pageIndex: number, previousPageData: FavoritesResponse | null) => {
    if (!authenticated) {
      return null;
    }

    if (previousPageData && !previousPageData.data.hasNextPage) {
      return null;
    }

    const params = new URLSearchParams({
      limit: PAGE_SIZE.toString(),
      offset: String(pageIndex * PAGE_SIZE),
      sort: sortKey,
    });

    return `/v1/me/favorites?${params.toString()}`;
  };

  const { data, isLoading, isReachingEnd, isValidating, items, loadMoreRef, mutate } =
    useInfiniteApiList<
      FavoritesResponse,
      MangaCardItem & {
        description: string | null;
        favoriteCreatedAt: string;
        isFavorite: number;
        updatedAt: string | null;
        url: string;
      }
    >({
      getKey,
      getItems: (page) => page.data.items,
      hasNextPage: (page) => page.data.hasNextPage,
    });

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const hasError = authenticated && !isLoading && data === undefined;

  const toggleSelection = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : items.map((item) => item.id));
  };

  const removeSelected = async () => {
    if (selectedIds.length === 0) {
      return;
    }

    if (!globalThis.confirm(`${selectedIds.length}件のお気に入りを解除しますか？`)) {
      return;
    }

    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetchApiJson(`/v1/me/favorites/${id}`, {
            method: "DELETE",
          }),
        ),
      );

      const removedIdSet = new Set(selectedIds);
      setSelectedIds([]);
      setIsSelectionMode(false);
      await mutate(
        (currentPages) =>
          currentPages?.map((page) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.filter((item) => !removedIdSet.has(item.id)),
            },
          })),
        { revalidate: false },
      );
    } catch {
      globalThis.alert("お気に入りの一括解除に失敗しました");
      await mutate();
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-[var(--max-width)] px-4 py-10">
      <SEO title="お気に入り" description="お気に入りに登録した作品一覧" />
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="shrink-0">
          <h1 className="text-3xl font-extrabold">お気に入り</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            複数選択で一括解除できます。並び順も切り替えられます。
          </p>
        </div>
        {authenticated && items.length > 0 ? (
          <div className="flex flex-col gap-3 sm:ml-auto sm:min-w-[320px] sm:items-end">
            <label className="flex items-center gap-2 self-start text-sm text-[var(--text-secondary)] sm:self-end">
              <span>ソート</span>
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as SortKey)}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {isSelectionMode ? (
              <div className="flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="rounded-lg border border-[var(--border)] bg-[var(--glass)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-white/80"
                >
                  {allSelected ? "選択解除" : "すべて選択"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void removeSelected();
                  }}
                  disabled={selectedIds.length === 0}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-semibold transition",
                    selectedIds.length === 0
                      ? "cursor-not-allowed bg-[#f1f5f9] text-[#94a3b8]"
                      : "bg-[#ff4136] text-white hover:opacity-90",
                  )}
                >
                  選択したお気に入りを解除
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIds([]);
                    setIsSelectionMode(false);
                  }}
                  className="rounded-lg border border-[var(--border)] bg-[var(--glass)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-white/80"
                >
                  キャンセル
                </button>
                <span className="text-sm text-[var(--text-secondary)]">
                  {selectedIds.length}件選択中
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsSelectionMode(true)}
                className="self-start rounded-lg border border-[#ff4136]/25 bg-white px-3 py-2 text-sm font-semibold text-[#ff4136] transition hover:border-[#ff4136]/45 hover:bg-[#fff5f5] sm:self-end"
              >
                お気に入りの解除
              </button>
            )}
          </div>
        ) : null}
      </div>

      {isAuthLoading ? (
        <LoadingIndicator size="lg" />
      ) : !authenticated ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--glass)] p-8 text-center backdrop-blur-xl">
          <p className="mb-4 text-[var(--text-secondary)]">
            お気に入りを見るには Google ログインが必要です。
          </p>
          <button
            type="button"
            onClick={() => login("/favorites")}
            className="rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] px-6 py-3 text-sm font-bold text-white"
          >
            Googleでログイン
          </button>
        </div>
      ) : isLoading ? (
        <LoadingIndicator size="lg" />
      ) : hasError ? (
        <div className="py-12 text-center text-[var(--text-secondary)]">
          お気に入りの取得に失敗しました。
        </div>
      ) : items.length ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--glass)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5"
              >
                {isSelectionMode ? (
                  <label className="absolute left-2 top-2 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)] shadow-sm">
                    <input
                      type="checkbox"
                      checked={selectedIdSet.has(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className="h-4 w-4 accent-[#ff4136]"
                    />
                    選択
                  </label>
                ) : null}
                <a href={`/manga/${item.id}`} className="flex flex-col text-inherit">
                  <MangaCardContent item={item} />
                </a>
              </div>
            ))}
          </div>
          <div ref={loadMoreRef} className="px-6 py-12 text-center text-[var(--text-secondary)]">
            {isValidating && !isReachingEnd ? <LoadingIndicator inline size="lg" /> : null}
          </div>
        </>
      ) : (
        <div className="py-12 text-center text-[var(--text-secondary)]">
          まだお気に入りはありません。
        </div>
      )}
    </main>
  );
}
