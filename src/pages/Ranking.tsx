import type { EpisodeList } from "../lib/types";
import { DatePicker } from "../components/DatePicker";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { cn } from "../lib/cn";
import { RankingListItem } from "../components/RankingListItem";
import { SEO } from "../components/SEO";
import { useInfiniteApiList } from "../hooks/useInfiniteApiList";
import { useSearchParamUpdater } from "../hooks/useSearchParamUpdater";

type Period = "recent" | "monthly" | "yearly" | "all";
type Span = "week" | "month" | "year";

interface RankingResponse {
  success: boolean;
  data: { items: EpisodeList; hasNextPage: boolean };
}

const PAGE_SIZE = 4;
const MAX_ITEMS = 1000;

export default function Ranking() {
  const { searchParams, updateParams } = useSearchParamUpdater();

  // URLパラメータから状態を読み取り
  const period = (searchParams.get("period") as Period) || "recent";
  const span = (searchParams.get("span") as Span) || "week";
  const year = Number(searchParams.get("year")) || new Date().getFullYear();
  const month = Number(searchParams.get("month")) || new Date().getMonth() + 1;

  const getKey = (pageIndex: number, previousPageData: RankingResponse | null) => {
    if (previousPageData && !previousPageData.data.hasNextPage) {
      return null;
    }
    if (pageIndex * PAGE_SIZE >= MAX_ITEMS) {
      return null;
    }

    const params = new URLSearchParams({ period });
    if (period === "recent") {
      params.set("span", span);
    } else if (period === "monthly") {
      params.set("year", String(year));
      params.set("month", String(month));
    } else if (period === "yearly") {
      params.set("year", String(year));
    }
    params.set("limit", PAGE_SIZE.toString());
    params.set("offset", (pageIndex * PAGE_SIZE).toString());

    return `/v1/ranking?${params}`;
  };

  const { items, isValidating, isLoading, isReachingEnd, loadMoreRef } = useInfiniteApiList<
    RankingResponse,
    EpisodeList[number]
  >({
    getKey,
    getItems: (page) => page.data.items,
    hasNextPage: (page, itemCount) => page.data.hasNextPage && itemCount < MAX_ITEMS,
  });

  const handleDateChange = (newYear: number, newMonth?: number) => {
    if (period === "monthly") {
      updateParams({ month: String(newMonth), period: "monthly", year: String(newYear) });
    } else if (period === "yearly") {
      updateParams({ period: "yearly", year: String(newYear) });
    }
  };

  // SEOタイトルを期間に応じて生成
  const getSeoTitle = () => {
    if (period === "recent") {
      if (span === "week") {
        return "直近1週間ランキング";
      }
      if (span === "year") {
        return "直近1年間ランキング";
      }
      return "直近1ヶ月ランキング";
    }
    if (period === "all") {
      return "歴代ランキング";
    }
    if (period === "yearly") {
      return `${year}年年間ランキング`;
    }
    return `${year}年${month}月度ランキング`;
  };

  return (
    <main className="min-h-screen">
      <SEO
        title={getSeoTitle()}
        description="はてなブックマーク数で集計した人気のWeb漫画ランキング"
      />
      {/* コントロールパネル */}
      <section className="flex min-h-[140px] flex-col justify-center border-b border-white/10 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-6">
        <div className="mx-auto w-full max-w-[var(--max-width)] px-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={cn(
                "rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-white/15 hover:text-white sm:px-6 sm:py-2.5",
                period === "recent" && "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white",
              )}
              onClick={() =>
                updateParams({ month: undefined, period: "recent", span, year: undefined })
              }
            >
              直近
            </button>
            <button
              type="button"
              className={cn(
                "rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-white/15 hover:text-white sm:px-6 sm:py-2.5",
                period === "monthly" && "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white",
              )}
              onClick={() =>
                updateParams({
                  month: String(month),
                  period: "monthly",
                  span: undefined,
                  year: String(year),
                })
              }
            >
              月別
            </button>
            <button
              type="button"
              className={cn(
                "rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-white/15 hover:text-white sm:px-6 sm:py-2.5",
                period === "yearly" && "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white",
              )}
              onClick={() =>
                updateParams({
                  month: undefined,
                  period: "yearly",
                  span: undefined,
                  year: String(year),
                })
              }
            >
              年別
            </button>
            <button
              type="button"
              className={cn(
                "rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-white/15 hover:text-white sm:px-6 sm:py-2.5",
                period === "all" && "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white",
              )}
              onClick={() =>
                updateParams({ month: undefined, period: "all", span: undefined, year: undefined })
              }
            >
              歴代
            </button>
          </div>

          <div
            className="flex items-center gap-4"
            style={{
              visibility: period === "all" ? "hidden" : "visible",
            }}
          >
            {period === "recent" ? (
              <div className="flex gap-2 rounded-xl bg-white/5 p-1">
                <button
                  type="button"
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-white/10 hover:text-white",
                    span === "week" && "bg-white/15 font-semibold text-white",
                  )}
                  onClick={() => updateParams({ span: "week" })}
                >
                  1週間
                </button>
                <button
                  type="button"
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-white/10 hover:text-white",
                    span === "month" && "bg-white/15 font-semibold text-white",
                  )}
                  onClick={() => updateParams({ span: "month" })}
                >
                  1ヶ月
                </button>
                <button
                  type="button"
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-white/10 hover:text-white",
                    span === "year" && "bg-white/15 font-semibold text-white",
                  )}
                  onClick={() => updateParams({ span: "year" })}
                >
                  1年間
                </button>
              </div>
            ) : (
              <DatePicker
                period={period === "yearly" ? "yearly" : "monthly"}
                year={year}
                month={period === "monthly" ? month : undefined}
                onChange={handleDateChange}
              />
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--max-width)] px-4">
        {isLoading ? (
          <LoadingIndicator className="px-6" size="lg" />
        ) : items.length > 0 ? (
          <>
            <div className="mx-auto flex max-w-[900px] flex-col gap-6 py-8">
              {items.map((item, index) => (
                <RankingListItem key={item.id} item={item} rank={index + 1} />
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
