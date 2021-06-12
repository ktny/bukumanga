import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import EntryList from "../components/entry-list";
import Layout from "../components/layout";
import search, { PER_PAGE } from "./api/search";
import classes from "../styles/index.module.scss";

export default function Home() {
  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 7); // デフォルトを今週にする

  // エントリ一覧と検索条件のstate
  const [entries, setEntries] = useState([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [keyword, setKeyword] = useState("");
  const [bookmarkCount, setBookmarkCount] = useState(10);
  const [orderKey, setOrderKey] = useState("bookmark_count");
  const [orderAsc, setOrderAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  // イベントを間引くためにdebounce変数をトリガーにする
  const [debounceStartDate] = useDebounce(startDate, 500);
  const [debounceEndDate] = useDebounce(endDate, 500);
  const [debounceKeyword] = useDebounce(keyword, 500);
  const [debounceBookmarkCount] = useDebounce(bookmarkCount, 500);

  // 検索条件変更時のeffect
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    search(debounceStartDate, debounceEndDate, debounceKeyword, debounceBookmarkCount, orderKey, orderAsc).then(res => {
      setEntries(res.entries);
      setCount(res.count);
      if (res.entries.length < PER_PAGE) {
        setHasMore(false);
      }
    });
  }, [debounceStartDate, debounceEndDate, debounceKeyword, debounceBookmarkCount, orderKey, orderAsc]);

  // 無限スクロールのeffect
  useEffect(() => {
    // これ以上エントリがない、または、初回読み込み時は終了
    if (!hasMore || page === 0) {
      return;
    }
    search(debounceStartDate, debounceEndDate, debounceKeyword, debounceBookmarkCount, orderKey, orderAsc, page).then(
      res => {
        setEntries(entries => [...entries, ...res.entries]);
        if (res.entries.length < PER_PAGE) {
          setHasMore(false);
        }
      }
    );
  }, [page]);

  const props = {
    entries,
    setEntries,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    keyword,
    setKeyword,
    bookmarkCount,
    setBookmarkCount,
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
    isHeaderExpanded,
    setIsHeaderExpanded,
  };

  return (
    <Layout {...props}>
      <EntryList {...props}></EntryList>
      {isHeaderExpanded ? <div className={classes.overlay} onClick={() => setIsHeaderExpanded(false)}></div> : <></>}
    </Layout>
  );
}
