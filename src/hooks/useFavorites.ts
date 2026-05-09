import useSWR, { useSWRConfig } from "swr";
import { createApiFetcher, fetchApiJson } from "../lib/api";
import { useAuth } from "./useAuth";

interface FavoriteItem {
  id: string;
}

interface FavoritesResponse {
  data: {
    items: FavoriteItem[];
  };
  success: boolean;
}

export function useFavorites() {
  const { authenticated } = useAuth();
  const { mutate: mutateGlobal } = useSWRConfig();
  const { data, isLoading, mutate } = useSWR<FavoritesResponse>(
    authenticated ? "/v1/me/favorites" : null,
    createApiFetcher<FavoritesResponse>(),
  );

  const favoriteIds = new Set((data?.data.items ?? []).map((item) => item.id));

  return {
    authenticated,
    favoriteIds,
    isFavorite: (mangaId: string) => favoriteIds.has(mangaId),
    isLoading,
    toggleFavorite: async (mangaId: string) => {
      const currentlyFavorite = favoriteIds.has(mangaId);
      const nextItems = currentlyFavorite
        ? (data?.data.items ?? []).filter((item) => item.id !== mangaId)
        : [...(data?.data.items ?? []), { id: mangaId }];

      await mutate(
        {
          data: { items: nextItems },
          success: true,
        },
        { revalidate: false },
      );

      try {
        await fetchApiJson(`/v1/me/favorites/${mangaId}`, {
          method: currentlyFavorite ? "DELETE" : "POST",
        });
        await Promise.all([mutate(), mutateGlobal(`/v1/manga/${mangaId}`)]);
        return { isFavorite: !currentlyFavorite };
      } catch (error) {
        await mutate();
        throw error;
      }
    },
  };
}
