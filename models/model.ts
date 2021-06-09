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
  comments: IComment[];
}

export interface IComment {
  id: number;
  entry_id: string;
  rank: number;
  username: string;
  icon: string;
  content: string;
  commented_at: string;
}
