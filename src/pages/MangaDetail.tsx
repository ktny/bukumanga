import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { ReadButton } from "../components/buttons/ReadButton";
import { MangaCarouselList } from "../components/MangaCarouselList";
import {
  type EpisodeSortKey,
  MangaEpisodeList,
  type MangaEpisodeSummary,
} from "../components/MangaEpisodeList";
import type { MangaCardItem } from "../components/MangaGridCard";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { SEO } from "../components/SEO";
import { useInfiniteApiList } from "../hooks/useInfiniteApiList";
import { getPlatform } from "../lib/platforms";
import { createApiFetcher, fetchApiJson } from "../lib/api";

interface MangaDetail {
  id: string;
  title: string;
  author: string | null;
  authors?: { id: string; name: string }[];
  description: string | null;
  imageUrl: string | null;
  platformId: string;
  url: string;
  hatenaCount: number;
  isFavorite: boolean;
}

interface EpisodeListResponse {
  success: boolean;
  data: {
    hasNextPage: boolean;
    items: MangaEpisodeSummary[];
  };
}

type DetailTabKey = "episodes" | "related";

const fetchSameAuthorManga = async (authorNames: string[], currentMangaId: string) => {
  if (authorNames.length === 0) {
    return [];
  }

  const results = await Promise.all(
    authorNames.map((name) =>
      fetchApiJson<{ success: boolean; data: MangaCardItem[] }>(
        `/v1/author/${encodeURIComponent(name)}/manga`,
      ).then((response) => response.data),
    ),
  );

  const seen = new Set<string>();
  const mergedData: MangaCardItem[] = [];

  for (const mangas of results) {
    for (const manga of mangas) {
      if (!seen.has(manga.id)) {
        seen.add(manga.id);
        mergedData.push(manga);
      }
    }
  }

  return mergedData
    .filter((manga) => manga.id !== currentMangaId)
    .toSorted((a, b) => b.hatenaCount - a.hatenaCount);
};

export default function MangaDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<DetailTabKey>("related");
  const [episodeSort, setEpisodeSort] = useState<EpisodeSortKey>("publishedAtDesc");
  const detailPath = id ? `/v1/manga/${id}` : null;

  const { data, error, isLoading } = useSWR<{
    success: boolean;
    data: MangaDetail;
  }>(detailPath, createApiFetcher<{ success: boolean; data: MangaDetail }>());

  const {
    isLoading: isEpisodesLoading,
    isReachingEnd,
    isValidating: isEpisodesValidating,
    items: episodes,
    loadMoreRef,
  } = useInfiniteApiList<EpisodeListResponse, MangaEpisodeSummary>({
    getKey: (pageIndex, previousPageData) => {
      if (!id || activeTab !== "episodes") {
        return null;
      }
      if (previousPageData && !previousPageData.data.hasNextPage) {
        return null;
      }

      const params = new URLSearchParams({
        episodeSort,
        limit: "20",
        offset: String(pageIndex * 20),
      });
      return `/v1/manga/${id}/episodes?${params.toString()}`;
    },
    getItems: (page) => page.data.items,
    hasNextPage: (page) => page.data.hasNextPage,
  });

  const manga = data?.data;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[var(--max-width)] px-4">
        <LoadingIndicator size="lg" />
      </div>
    );
  }
  if (error || !manga) {
    return (
      <div className="mx-auto max-w-[var(--max-width)] px-4">
        <h1>Manga Not Found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const platform = getPlatform(manga.platformId);
  const platformName = platform?.name || manga.platformId;
  const platformFilter = platform?.category === "個人サイト" ? "personal" : manga.platformId;
  const authorNames = manga.authors?.map((a) => a.name) || [];

  return (
    <main className="pb-16">
      {manga && (
        <SEO
          title={manga.title}
          description={manga.description || undefined}
          ogp={{
            description: manga.description || undefined,
            title: manga.title,
            type: "article",
          }}
        />
      )}
      {/* Header Section */}
      <section className="mb-12 border-b border-[var(--border)] py-12">
        <div className="mx-auto max-w-[var(--max-width)] px-4">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:text-left">
            <div className="w-full shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--glass)] backdrop-blur-xl md:w-[360px]">
              {manga.imageUrl && (
                <img
                  src={manga.imageUrl}
                  alt={manga.title}
                  className="block h-auto w-full"
                  decoding="async"
                  fetchPriority="high"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 360px"
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.style.display = "none";
                    }
                  }}
                />
              )}
            </div>
            <div className="flex-1">
              <h1 className="mb-4 text-[2rem] font-extrabold leading-tight">{manga.title}</h1>
              <div className="mb-6 flex flex-col items-center gap-2 text-[1.1rem] text-[#aaa] md:items-start">
                {(manga.authors?.length || manga.author) && (
                  <span>
                    {manga.authors && manga.authors.length > 0 ? (
                      manga.authors.map((author, index) => (
                        <span key={author.id}>
                          {index > 0 && " / "}
                          <Link
                            to={`/search?q=${encodeURIComponent(author.name)}`}
                            className="transition hover:text-[var(--text-primary,#fff)] hover:underline"
                          >
                            {author.name}
                          </Link>
                        </span>
                      ))
                    ) : manga.author ? (
                      <Link
                        to={`/search?q=${encodeURIComponent(manga.author)}`}
                        className="transition hover:text-[var(--text-primary,#fff)] hover:underline"
                      >
                        {manga.author}
                      </Link>
                    ) : null}
                  </span>
                )}
                <div className="flex gap-2">
                  <Link
                    to={`/search?platform=${platformFilter}`}
                    className="rounded bg-[rgba(100,100,100,0.2)] px-2 py-0.5 text-base font-bold text-[#888] transition hover:bg-[rgba(100,100,100,0.3)] hover:text-[var(--text-primary,#fff)]"
                  >
                    {platformName}
                  </Link>
                </div>
              </div>
              {manga.description && (
                <p className="mb-8 max-w-[800px] leading-7 text-[var(--text-secondary)]">
                  {manga.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                {manga.url && (
                  <ReadButton
                    url={manga.url}
                    className="inline-flex min-w-[240px] justify-center whitespace-nowrap rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] px-12 py-4 text-xl font-bold text-white shadow-[0_4px_14px_rgba(102,126,234,0.5)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.6)]"
                  />
                )}
                {/* 一時的にお気に入り機能を非表示 */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--max-width)] px-4">
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("related")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "related"
                ? "bg-[var(--text-primary,#1a1a2e)] text-white"
                : "bg-black/5 text-[var(--text-secondary)] hover:bg-black/10"
            }`}
          >
            関連作品
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("episodes")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "episodes"
                ? "bg-[var(--text-primary,#1a1a2e)] text-white"
                : "bg-black/5 text-[var(--text-secondary)] hover:bg-black/10"
            }`}
          >
            エピソード一覧
          </button>
        </div>

        {activeTab === "related" ? (
          <>
            <MangaCarouselList
              swrKey={
                authorNames.length > 0 ? `same-author:${authorNames.join(",")}:${manga.id}` : null
              }
              title="同じ作者の漫画"
              emptyMessage="同じ作者の漫画はまだありません"
              fetcher={() => fetchSameAuthorManga(authorNames, manga.id)}
            />
            <MangaCarouselList
              swrKey={`/v1/manga/${manga.id}/recommend`}
              title="おすすめの漫画"
              emptyMessage="おすすめできる漫画はまだありません"
              fetcher={() =>
                fetchApiJson<{ success: boolean; data: MangaCardItem[] }>(
                  `/v1/manga/${manga.id}/recommend`,
                ).then((response) => response.data)
              }
            />
          </>
        ) : (
          <MangaEpisodeList
            episodes={episodes}
            episodeSort={episodeSort}
            onEpisodeSortChange={setEpisodeSort}
            isLoading={isEpisodesLoading}
            isLoadingMore={isEpisodesValidating && episodes.length > 0}
            isReachingEnd={isReachingEnd}
            loadMoreRef={loadMoreRef}
          />
        )}
      </div>
    </main>
  );
}
