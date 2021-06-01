import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/search.module.scss";
import { formateDate } from "../helpers/util";
import BookmarkCountSlider from "./bookmark-count-slider";

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
  const [bookmarkCount, setBookmarkCount] = useState(10);

  useEffect(() => {
    search(startDate, endDate, keyword, bookmarkCount);
  }, [startDate, endDate, keyword, bookmarkCount]);

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

  const changeKeyword = (keyword: string) => {
    return () => setKeyword(keyword);
  };

  const changeBookmarkCount = (bookmarkCount: number) => {
    return () => setBookmarkCount(bookmarkCount);
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
  const keywordList = [
    { name: "少年ジャンプ+", value: "shonenjumpplus.com" },
    { name: "コミックDAYS", value: "comic-days.com" },
    { name: "となりのヤングジャンプ", value: "tonarinoyj.jp" },
    { name: "マガポケ", value: "pocket.shonenmagazine.com" },
    { name: "ジャンプルーキー", value: "rookie.shonenjump.com" },
    { name: "コミックウォーカー", value: "comic-walker.com" },
    { name: "マンガクロス", value: "mangacross.jp" },
    { name: "コミックアクション", value: "comic-action.com" },
    { name: "くらげバンチ", value: "kuragebunch.com" },
    { name: "サンデーうぇぶり", value: "www.sunday-webry.com" },
    { name: "MAGCOMI", value: "magcomi.com" },
    { name: "ニコニコ静画", value: "seiga.nicovideo.jp" },
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
          <div className={styles.blockTitle}>キーワード</div>
          <div className={styles.blockContent}>
            <input
              type="text"
              placeholder="キーワードを入力"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <div className={styles.tagList}>
              {keywordList.map(item => (
                <div
                  className={styles.tag}
                  style={checkActive(keyword, item.value)}
                  onClick={changeKeyword(item.value)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <BookmarkCountSlider bookmarkCount={bookmarkCount} setBookmarkCount={setBookmarkCount}></BookmarkCountSlider>
        </div>
      </section>
    </section>
  );
}
