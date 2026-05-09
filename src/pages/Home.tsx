import type { EpisodeList } from "../lib/types";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { MangaCard } from "../components/MangaCard";
import { SEO } from "../components/SEO";
import { useInfiniteApiList } from "../hooks/useInfiniteApiList";

interface TrendResponse {
  success: boolean;
  data: {
    items: EpisodeList;
    hasNextPage: boolean;
  };
}
const TREND_LIMIT = 18;

export default function Home() {
  const getKey = (pageIndex: number, previousPageData: TrendResponse | null) => {
    if (previousPageData && !previousPageData.data.hasNextPage) {
      return null;
    }

    const params = new URLSearchParams();
    params.set("limit", String(TREND_LIMIT));
    params.set("offset", String(pageIndex * TREND_LIMIT));
    return `/v1/trend?${params}`;
  };

  const { items, isValidating, isLoading, isReachingEnd, loadMoreRef } = useInfiniteApiList<
    TrendResponse,
    EpisodeList[number]
  >({
    getKey,
    getItems: (page) => page.data.items,
    hasNextPage: (page) => page.data.hasNextPage,
  });

  return (
    <main className="min-h-screen">
      <SEO description="最新のWEB漫画トレンドをはてなブックマーク数でチェック" />
      <section className="mx-auto max-w-[var(--max-width)] px-4">
        {isLoading ? (
          <LoadingIndicator className="px-6" size="lg" />
        ) : items.length > 0 ? (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 py-8">
              {items.map((item) => (
                <MangaCard key={item.id} item={item} />
              ))}
            </div>
            <div ref={loadMoreRef} className="px-6 py-12 text-center text-[var(--text-secondary)]">
              {isValidating && !isReachingEnd ? <LoadingIndicator inline size="lg" /> : null}
            </div>
          </>
        ) : (
          <div className="px-6 py-12 text-center text-[var(--text-secondary)]">
            該当するエピソードがありません
          </div>
        )}
      </section>
    </main>
  );
}
