import { PLATFORMS, getPlatformIdsByCategory } from "../lib/platforms";
import { useEffect, useMemo, useRef, useState } from "react";
import { MangaGridCard } from "../components/MangaGridCard";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { cn } from "../lib/cn";
import { SEO } from "../components/SEO";
import { useInfiniteApiList } from "../hooks/useInfiniteApiList";
import { useSearchParamUpdater } from "../hooks/useSearchParamUpdater";

interface MangaItem {
  id: string;
  title: string;
  authors: { id: string; name: string }[];
  imageUrl: string | null;
  platformId: string;
  url: string;
  hatenaCount: number;
}

interface MangaResponse {
  success: boolean;
  data: {
    items: MangaItem[];
    hasNextPage: boolean;
  };
}
const PAGE_SIZE = 6;

// プラットフォーム一覧（フィルター用）
const platformList = [
  ...Object.entries(PLATFORMS)
    .filter(([, config]) => config.category !== "個人サイト")
    .map(([id, config]) => ({ id, ...config })),
  ...(getPlatformIdsByCategory("個人サイト").length > 0
    ? [{ id: "personal", name: "個人サイト", url: "", domain: "" }]
    : []),
];

export default function List() {
  const inputClassName =
    "w-full rounded-lg border-0 bg-white/10 px-4 py-3 pr-10 text-sm text-white outline-none transition placeholder:text-[var(--text-secondary,#888)] focus:bg-white/15 focus:ring-2 focus:ring-[rgba(102,126,234,0.5)]";
  const dropdownClassName =
    "absolute left-0 right-0 top-[calc(100%+4px)] z-10 max-h-[300px] overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]";
  const dropdownOptionClassName =
    "w-full bg-transparent px-4 py-2.5 text-left text-[var(--text-primary)] transition hover:bg-white/10";

  const { searchParams, updateParams } = useSearchParamUpdater();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInternalUpdateRef = useRef(false);
  const isComposingRef = useRef(false);

  // サイト検索用の状態
  const [siteSearchQuery, setSiteSearchQuery] = useState("");
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);

  // URLパラメータから状態を読み取り
  const searchQuery = searchParams.get("q") || "";
  const platformFilter = searchParams.get("platform") || "";

  const selectedPlatformName = useMemo(() => {
    if (!platformFilter) {
      return "";
    }
    return platformList.find((platform) => platform.id === platformFilter)?.name || "";
  }, [platformFilter]);

  // 検索クエリ用のデバウンス付きURL更新
  const updateSearchQuery = (value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    isInternalUpdateRef.current = true;
    debounceTimerRef.current = setTimeout(() => {
      updateParams({ q: value || undefined });
    }, 500);
  };

  // 内部の検索入力状態（デバウンス用）
  const [inputValue, setInputValue] = useState(searchQuery);

  // URLパラメータが変わったら入力値も同期（ユーザー入力によるURL更新はスキップ）
  useEffect(() => {
    if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };

  const handleClearAllFilters = () => {
    updateParams({ platform: undefined });
    setSiteSearchQuery("");
    setIsSiteDropdownOpen(false);
  };

  const filteredPlatforms = useMemo(() => {
    if (!siteSearchQuery) {
      return platformList;
    }

    const normalizedQuery = siteSearchQuery.toLowerCase();
    return platformList.filter((platform) => platform.name.toLowerCase().includes(normalizedQuery));
  }, [siteSearchQuery]);

  const getKey = (pageIndex: number, previousPageData: MangaResponse | null) => {
    if (previousPageData && !previousPageData.data.hasNextPage) {
      return null;
    }

    const params = new URLSearchParams();
    if (platformFilter) {
      params.set("platform", platformFilter);
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    params.set("limit", PAGE_SIZE.toString());
    params.set("offset", (pageIndex * PAGE_SIZE).toString());

    return `/v1/manga?${params}`;
  };

  const { items, isValidating, isLoading, isReachingEnd, loadMoreRef } = useInfiniteApiList<
    MangaResponse,
    MangaItem
  >({
    getKey,
    getItems: (page) => page.data.items,
    hasNextPage: (page) => page.data.hasNextPage,
  });

  const renderSearchControls = () => (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <div className="relative min-w-[200px] flex-1 sm:max-w-[400px]">
          <input
            type="text"
            placeholder="タイトル・作者名で検索..."
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              if (!isComposingRef.current) {
                updateSearchQuery(value);
              }
            }}
            onCompositionStart={() => {
              isComposingRef.current = true;
            }}
            onCompositionEnd={(e) => {
              isComposingRef.current = false;
              updateSearchQuery(e.currentTarget.value);
            }}
            className={inputClassName}
          />
          {inputValue && (
            <button
              type="button"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-xs text-white transition hover:bg-white/30"
              onClick={() => handleSearchChange("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="relative min-w-[200px] flex-1 sm:max-w-[400px]">
          <input
            type="text"
            placeholder="サイトで絞り込み..."
            value={isSiteDropdownOpen ? siteSearchQuery : selectedPlatformName}
            onFocus={() => {
              setIsSiteDropdownOpen(true);
              setSiteSearchQuery("");
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsSiteDropdownOpen(false);
                setSiteSearchQuery("");
              }, 200);
            }}
            onChange={(e) => {
              setSiteSearchQuery(e.target.value);
              setIsSiteDropdownOpen(true);
            }}
            className={inputClassName}
            aria-label="サイトで絞り込み"
            aria-expanded={isSiteDropdownOpen}
            aria-autocomplete="list"
          />
          {(siteSearchQuery || platformFilter) && (
            <button
              type="button"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-xs text-white transition hover:bg-white/30"
              onClick={() => {
                setSiteSearchQuery("");
                setIsSiteDropdownOpen(false);
                updateParams({ platform: undefined });
              }}
              aria-label="サイト絞り込みをクリア"
            >
              ✕
            </button>
          )}

          {isSiteDropdownOpen && (
            <div className={dropdownClassName}>
              <button
                type="button"
                className={cn(dropdownOptionClassName, !platformFilter && "bg-white/10")}
                onClick={() => {
                  updateParams({ platform: undefined });
                  setSiteSearchQuery("");
                  setIsSiteDropdownOpen(false);
                }}
              >
                すべてのサイト
              </button>
              {filteredPlatforms.length > 0 ? (
                filteredPlatforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    className={cn(
                      dropdownOptionClassName,
                      platformFilter === platform.id && "bg-white/10",
                    )}
                    onClick={() => {
                      updateParams({ platform: platform.id });
                      setSiteSearchQuery("");
                      setIsSiteDropdownOpen(false);
                    }}
                  >
                    {platform.name}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2.5 text-[13px] text-[var(--text-secondary)]">
                  一致するサイトはありません
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {platformFilter && (
        <div className="mt-2 flex w-full flex-wrap items-center gap-2">
          <span className="text-[13px] text-[var(--text-secondary)]">絞り込み中:</span>
          {platformFilter && selectedPlatformName && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(102,126,234,0.2)] px-3 py-1.5 text-[13px] font-semibold text-[#9fb3ff] transition hover:bg-[rgba(102,126,234,0.3)]"
              onClick={() => updateParams({ platform: undefined })}
            >
              サイト: {selectedPlatformName} ✕
            </button>
          )}
          <button
            type="button"
            className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-[var(--text-secondary)] transition hover:bg-white/20 hover:text-white"
            onClick={handleClearAllFilters}
          >
            すべてクリア
          </button>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen">
      <SEO title="作品検索" description="タイトル、作者名、プラットフォームからWeb漫画を検索" />
      <section className="mb-6 flex h-auto flex-col justify-center border-b border-white/10 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-6">
        {renderSearchControls()}
      </section>

      <section className="mx-auto max-w-[var(--max-width)] px-4">
        {isLoading ? (
          <LoadingIndicator className="px-6" size="lg" />
        ) : items.length > 0 ? (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
              {items.map((item) => (
                <MangaGridCard key={item.id} item={item} />
              ))}
            </div>
            <div ref={loadMoreRef} className="px-6 py-12 text-center text-[var(--text-secondary)]">
              {isValidating && !isReachingEnd ? <LoadingIndicator inline size="lg" /> : null}
            </div>
          </>
        ) : (
          <div className="px-6 py-12 text-center text-[var(--text-secondary)]">
            該当する漫画がありません
          </div>
        )}
      </section>
    </main>
  );
}
