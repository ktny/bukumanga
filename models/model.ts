import { Dispatch, SetStateAction } from "react";

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

export interface SearchResponse {
  count: number;
  entries: IEntry[];
}

export interface Props {
  entries: IEntry[];
  setEntries: Dispatch<SetStateAction<IEntry[]>>;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  bookmarkCount: number;
  setBookmarkCount: Dispatch<SetStateAction<number>>;
  orderKey: string;
  setOrderKey: Dispatch<SetStateAction<string>>;
  orderAsc: boolean;
  setOrderAsc: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}
