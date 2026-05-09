import { useSearchParams } from "react-router-dom";

export function useSearchParamUpdater() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (updates: Record<string, string | undefined>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "" || value === "false") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      }
      return newParams;
    });
  };

  return {
    searchParams,
    setSearchParams,
    updateParams,
  };
}
