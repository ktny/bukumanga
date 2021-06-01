import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/search.module.scss";
import { formateDate } from "../helpers/util";
import KeywordInput from "./search/keyword-input";
import BookmarkCountInput from "./search/bookmark-count-input";

registerLocale("ja", ja);

const HATEBU_START_DATE = new Date(2005, 1, 10);

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
  const [debouncedKeyword] = useDebounce(keyword, 1000);
  const [bookmarkCount, setBookmarkCount] = useState(10);
  const [debouncedBookmarkCount] = useDebounce(bookmarkCount, 1000);

  useEffect(() => {
    search(startDate, endDate, debouncedKeyword, debouncedBookmarkCount);
  }, [startDate, endDate, debouncedKeyword, debouncedBookmarkCount]);

  const changePeriod = (days: number) => {
    return () => {
      const endDate = new Date();
      setEndDate(endDate);
      let startDate = new Date(endDate.getTime());
      if (days === -1) {
        startDate = HATEBU_START_DATE;
      } else {
        startDate.setDate(startDate.getDate() - days);
      }
      setStartDate(startDate);
      setEndDate(endDate);
    };
  };

  const checkActive = (target: any, comparison: any) => {
    return target === comparison ? { backgroundColor: "#ff9a00" } : undefined;
  };

  const checkActivePeriod = (comparison: number) => {
    let date = new Date();
    if (formateDate(endDate) !== formateDate(date)) return;
    if (comparison === -1) {
      date = HATEBU_START_DATE;
    } else {
      date.setDate(date.getDate() - comparison);
    }
    return formateDate(startDate) === formateDate(date) ? { backgroundColor: "#ff9a00" } : undefined;
  };

  const periodList = [
    { name: "今週", value: 7 },
    { name: "今月", value: 30 },
    { name: "今年", value: 365 },
    { name: "全期間", value: -1 },
  ];

  return (
    <section className={styles.search}>
      <section className={styles.detailSearch}>
        <div className={styles.block}>
          <div className={styles.blockTitle}>期間指定</div>
          <div className={styles.blockContent}>
            <div className={styles.dateInputWrapper}>
              <DatePicker selected={startDate} locale="ja" onChange={date => setStartDate(date)} />
              <span className={styles.periodDelimiter}>～</span>
              <DatePicker selected={endDate} locale="ja" onChange={date => setEndDate(date)} />
            </div>
            <div className={styles.tagList}>
              {periodList.map(item => (
                <div className={styles.tag} style={checkActivePeriod(item.value)} onClick={changePeriod(item.value)}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
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
