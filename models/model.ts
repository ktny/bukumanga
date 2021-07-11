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
  publisher: IPublisher;
  created_at: string;
  updated_at: string;
}

export interface IPeriod {
  label: string;
  days: number;
  active: boolean;
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

export interface IPublisher {
  id: number;
  domain: string;
  name: string;
  icon: string;
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
  periods: IPeriod[];
  setPeriods: Dispatch<SetStateAction<IPeriod[]>>;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  bookmarkCount: number;
  setBookmarkCount: Dispatch<SetStateAction<number>>;
  bookmarkCountMax: number;
  setBookmarkCountMax: Dispatch<SetStateAction<number>>;
  publisherIds: number[];
  setPublisherIds: Dispatch<SetStateAction<number[]>>;
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
  isSP: boolean;
}
