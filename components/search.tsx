import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import styles from "../styles/search.module.scss";
import PeriodInput from "./search/period-input";
import KeywordInput from "./search/keyword-input";
import BookmarkCountInput from "./search/bookmark-count-input";

export default function Search({
  search,
}: {
  search: (startDate: Date, endDate: Date, keyword: string, bookmarkCount: number) => void;
}) {
  const defaultEndDate = new Date();
  const defaultStartDate = new Date(defaultEndDate.getTime());
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [keyword, setKeyword] = useState("");
  const [bookmarkCount, setBookmarkCount] = useState(10);
  const [debouncedKeyword] = useDebounce(keyword, 1000);
  const [debouncedBookmarkCount] = useDebounce(bookmarkCount, 1000);

  useEffect(() => {
    search(startDate, endDate, debouncedKeyword, debouncedBookmarkCount);
  }, [startDate, endDate, debouncedKeyword, debouncedBookmarkCount]);

  return (
    <section className={styles.search}>
      <section className={styles.detailSearch}>
        <div className={styles.block}>
          <PeriodInput
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          ></PeriodInput>
        </div>
        <div className={styles.block}>
          <KeywordInput keyword={keyword} setKeyword={setKeyword}></KeywordInput>
        </div>
        <div className={styles.block}>
          <BookmarkCountInput bookmarkCount={bookmarkCount} setBookmarkCount={setBookmarkCount}></BookmarkCountInput>
        </div>
      </section>
    </section>
  );
}
