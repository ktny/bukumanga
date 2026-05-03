import useSWR from "swr";
import { createApiFetcher, fetchApiJson, toApiUrl } from "../lib/api";

interface SessionUser {
  avatarUrl: string | null;
  email: string;
  id: string;
  name: string;
}

interface SessionResponse {
  data: {
    authenticated: boolean;
    user: SessionUser | null;
  };
  success: boolean;
}

export function useAuth() {
  const { data, isLoading, mutate } = useSWR<SessionResponse>(
    "/v1/auth/session",
    createApiFetcher<SessionResponse>(),
  );

  const authenticated = Boolean(data?.data.authenticated);
  const user = data?.data.user ?? null;

  return {
    authenticated,
    isLoading,
    login: (returnTo?: string) => {
      const target =
        returnTo ??
        `${globalThis.location.pathname}${globalThis.location.search}${globalThis.location.hash}`;
      globalThis.location.href = `${toApiUrl("/v1/auth/google")}?returnTo=${encodeURIComponent(target)}`;
    },
    logout: async () => {
      await fetchApiJson("/v1/auth/logout", {
        method: "POST",
      });
      await mutate();
    },
    mutate,
    user,
  };
}
