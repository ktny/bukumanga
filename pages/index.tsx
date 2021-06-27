import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import useMedia from "use-media";
import Layout from "../components/layout";
import Search from "../components/search/search";
import EntryList from "../components/entry-list";
import search, { PER_PAGE } from "./api/search";
import { IEntry, IPeriod, Props } from "../models/model";

export const defaultEndDate = new Date();
export const defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() - 6); // デフォルトを今週にする
const defaultPeriods: IPeriod[] = [
  { label: "直近", days: 2, active: false },
  { label: "週間", days: 7, active: true },
  { label: "月間", days: 31, active: false },
  { label: "年間", days: 365, active: false },
  { label: "歴代", days: Infinity, active: false },
];

export const defaultKeyword = "";
export const defaultBookmarkCount = 0;
export const defaultBookmarkCountMax = 2000;

export default function Home() {
  // 各種state
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [periods, setPeriods] = useState<IPeriod[]>(defaultPeriods);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [bookmarkCount, setBookmarkCount] = useState(defaultBookmarkCount);
  const [bookmarkCountMax, setBookmarkCountMax] = useState(defaultBookmarkCountMax);
  const [orderKey, setOrderKey] = useState("bookmark_count");
  const [orderAsc, setOrderAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);

  // イベントを間引くためにdebounce変数をトリガーにする
  const [debounceStartDate] = useDebounce(startDate, 500);
  const [debounceEndDate] = useDebounce(endDate, 500);
  const [debounceKeyword] = useDebounce(keyword, 500);
  const [debounceBookmarkCount] = useDebounce(bookmarkCount, 500);
  const [debounceBookmarkCountMax] = useDebounce(bookmarkCountMax, 500);

  // SPモードとの境界
  const isSP = useMedia({ maxWidth: "480px" });

  // 検索条件変更時のeffect
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    search(
      debounceStartDate,
      debounceEndDate,
      debounceKeyword,
      debounceBookmarkCount,
      debounceBookmarkCountMax,
      orderKey,
      orderAsc
    ).then(res => {
      setEntries(res.entries);
      setCount(res.count);
      if (res.entries.length < PER_PAGE) {
        setHasMore(false);
      }
    });
  }, [
    debounceStartDate,
    debounceEndDate,
    debounceKeyword,
    debounceBookmarkCount,
    debounceBookmarkCountMax,
    orderKey,
    orderAsc,
  ]);

  // 無限スクロールのeffect
  useEffect(() => {
    // これ以上エントリがない、または、初回読み込み時は終了
    if (!hasMore || page === 0) {
      return;
    }
    search(
      debounceStartDate,
      debounceEndDate,
      debounceKeyword,
      debounceBookmarkCount,
      debounceBookmarkCountMax,
      orderKey,
      orderAsc,
      page
    ).then(res => {
      setEntries(entries => [...entries, ...res.entries]);
      if (res.entries.length < PER_PAGE) {
        setHasMore(false);
      }
    });
  }, [page]);

  const props: Props = {
    entries,
    setEntries,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    periods,
    setPeriods,
    keyword,
    setKeyword,
    bookmarkCount,
    setBookmarkCount,
    bookmarkCountMax,
    setBookmarkCountMax,
    orderKey,
    setOrderKey,
    orderAsc,
    setOrderAsc,
    page,
    setPage,
    hasMore,
    setHasMore,
    count,
    setCount,
    isSP,
  };

  return (
    <Layout {...props}>
      <Search {...props} />
      <EntryList {...props} />
    </Layout>
  );
}
