import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import EntryList from "../components/entry-list";
import Layout from "../components/layout";
import search from "./api/search";

export default function Home() {
  const defaultEndDate = new Date();
  const defaultStartDate = new Date(defaultEndDate.getTime());
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);

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

  // イベントを間引くためにdebounced変数をトリガーにする
  const [debouncedStartDate] = useDebounce(startDate, 500);
  const [debouncedEndDate] = useDebounce(endDate, 500);
  const [debouncedKeyword] = useDebounce(keyword, 500);
  const [debouncedBookmarkCount] = useDebounce(bookmarkCount, 500);

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    console.log("setHasMore", true);
    search(debouncedStartDate, debouncedEndDate, debouncedKeyword, debouncedBookmarkCount, orderKey, orderAsc).then(
      entries => setEntries(entries)
    );
  }, [debouncedStartDate, debouncedEndDate, debouncedKeyword, debouncedBookmarkCount, orderKey, orderAsc]);

  // console.log(entries);

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
  };

  return (
    <Layout {...props}>
      <EntryList {...props}></EntryList>
    </Layout>
  );
}
