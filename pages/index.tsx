import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import queryString from "querystring";
import EntryList from "../components/entry-list";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import search, { PER_PAGE } from "./api/search";
import { calcDate, parseOrderParam, str2Date } from "../helpers/util";

const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    left: 0,
    top: 0,
    zIndex: 100,
    background: "rgba(100, 100, 100, .8)",
  },
});

export default function Home() {
  const classes = useStyles();

  const router = useRouter();
  const params = queryString.parse(router.asPath.split("?")[1]);
  const { paramOrderKey, paramOrderAsc } = parseOrderParam(params.order as string);

  // エントリ一覧と検索条件のstate
  const [entries, setEntries] = useState([]);
  const [startDate, setStartDate] = useState(str2Date(params.startDate as string) || calcDate(new Date(), -7));
  const [endDate, setEndDate] = useState(str2Date(params.endDate as string) || new Date());
  const [keyword, setKeyword] = useState(params.keyword as string);
  const [bookmarkCount, setBookmarkCount] = useState(Number(params.bookmarkCount) || 10);
  const [orderKey, setOrderKey] = useState(paramOrderKey || "bookmark_count");
  const [orderAsc, setOrderAsc] = useState(paramOrderAsc || false);
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
