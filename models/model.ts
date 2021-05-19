export interface Entry {
  id: number;
  title: string;
  url: string;
  domain: string;
  bookmark_count: number;
  image: {
    Valid: boolean;
    String: string;
  };
  publsihed_at: string;
}
