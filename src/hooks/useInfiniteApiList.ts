import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { createApiFetcher } from "../lib/api";

interface UseInfiniteApiListParams<TPage, TItem> {
  getKey: (pageIndex: number, previousPageData: TPage | null) => string | null;
  getItems: (page: TPage) => TItem[];
  hasNextPage: (page: TPage, itemCount: number) => boolean;
  rootMargin?: string;
}

export function useInfiniteApiList<TPage, TItem>({
  getKey,
  getItems,
  hasNextPage,
  rootMargin = "200px",
}: UseInfiniteApiListParams<TPage, TItem>) {
  const { ref, inView } = useInView({ rootMargin });
  const { data, size, setSize, isValidating, isLoading, mutate } = useSWRInfinite<TPage>(
    getKey,
    createApiFetcher<TPage>(),
    { revalidateFirstPage: false },
  );

  const items = useMemo(
    () => (data ? data.flatMap((page) => getItems(page)) : []),
    [data, getItems],
  );
  const isReachingEnd = data ? !hasNextPage(data[data.length - 1]!, items.length) : false;

  useEffect(() => {
    if (inView && !isValidating && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [inView, isValidating, isReachingEnd, setSize, size]);

  return {
    data,
    isLoading,
    isReachingEnd,
    isValidating,
    items,
    loadMoreRef: ref,
    mutate,
    setSize,
    size,
  };
}
