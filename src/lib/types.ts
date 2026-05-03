export interface EpisodeItem {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  hatenaCount: number;
  mangaImageUrl: string | null;
  mangaId: string;
  description: string | null;
  platformId: string;
}

export type EpisodeList = EpisodeItem[];

export interface MangaAuthor {
  id: string;
  name: string;
}

export interface RecommendedManga {
  authors?: MangaAuthor[];
  id: string;
  title: string;
  imageUrl: string | null;
  platformId: string;
  score: number;
  hatenaCount: number;
}
