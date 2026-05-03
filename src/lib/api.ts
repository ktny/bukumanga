const API_ORIGIN = import.meta.env.VITE_API_URL;

export function toApiUrl(path: string) {
  if (!API_ORIGIN) {
    return path;
  }

  return new URL(path, API_ORIGIN).toString();
}

export async function fetchApiJson<T>(path: string, init?: RequestInit) {
  const response = await fetch(toApiUrl(path), {
    credentials: "include",
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function createApiFetcher<T>() {
  return (path: string) => fetchApiJson<T>(path);
}
