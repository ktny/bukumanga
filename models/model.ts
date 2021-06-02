export interface IEntry {
  id: number;
  title: string;
  url: string;
  domain: string;
  bookmark_count: number;
  image: {
    Valid: boolean;
    String: string;
  };
  hotentried_at: string;
  published_at: string;
}
