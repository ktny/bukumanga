import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/search.module.scss";
registerLocale("ja", ja);

export default function Search({
  search,
}: {
  search: (startDate: Date, endDate: Date, keyword: string, bookmarkCount: number) => void;
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [keyword, setKeyword] = useState("");
  const [bookmarkCount, setBookmarkCount] = useState(1);

  useEffect(() => {
    search(startDate, endDate, keyword, bookmarkCount);
  }, [startDate, endDate, keyword, bookmarkCount]);

  const changePeriod = days => {
    return () => {
      const endDate = new Date();
      setEndDate(endDate);
      let startDate = new Date(endDate.getTime());
      if (days === -1) {
        startDate = new Date(2005, 1, 10);
      } else {
        startDate.setDate(startDate.getDate() - days);
      }
      setStartDate(startDate);
      setEndDate(endDate);
    };
  };

  const changeKeyword = keyword => {
    return () => setKeyword(keyword);
  };

  const changeBookmarkCount = bookmarkCount => {
    return () => setBookmarkCount(bookmarkCount);
  };

  const checkActiveBookmarkCount = target => {
    return () => {
      return "active";
    };
  };

  const periodList = [
    { name: "今週", func: changePeriod(7) },
    { name: "今月", func: changePeriod(30) },
    { name: "今年", func: changePeriod(365) },
    { name: "全期間", func: changePeriod(-1) },
  ];
  const keywordList = [
    { name: "少年ジャンプ+", func: changeKeyword("shonenjumpplus.com") },
    { name: "コミックDAYS", func: changeKeyword("comic-days.com") },
    { name: "となりのヤングジャンプ", func: changeKeyword("tonarinoyj.jp") },
    { name: "マガポケ", func: changeKeyword("pocket.shonenmagazine.com") },
    { name: "ジャンプルーキー", func: changeKeyword("rookie.shonenjump.com") },
    { name: "コミックウォーカー", func: changeKeyword("comic-walker.com") },
    { name: "マンガクロス", func: changeKeyword("mangacross.jp") },
    { name: "コミックアクション", func: changeKeyword("comic-action.com") },
    { name: "くらげバンチ", func: changeKeyword("kuragebunch.com") },
    { name: "サンデーうぇぶり", func: changeKeyword("www.sunday-webry.com") },
    { name: "MAGCOMI", func: changeKeyword("magcomi.com") },
    { name: "ニコニコ静画", func: changeKeyword("seiga.nicovideo.jp") },
  ];
  const bookmarkCountList = [
    { name: "3 users", func: changeBookmarkCount(3), checkActive: checkActiveBookmarkCount(3) },
    { name: "10 users", func: changeBookmarkCount(10), checkActive: checkActiveBookmarkCount(10) },
    { name: "50 users", func: changeBookmarkCount(50), checkActive: checkActiveBookmarkCount(50) },
    { name: "100 users", func: changeBookmarkCount(100), checkActive: checkActiveBookmarkCount(100) },
  ];

  return (
    <section className={styles.search}>
      <section className={styles.detailSearch}>
        <div className={styles.block}>
          <div className={styles.blockTitle}>期間指定</div>
          <div className={styles.blockContent}>
            <div>
              <DatePicker selected={startDate} locale="ja" onChange={date => setStartDate(date)} />
              <span className={styles.periodDelimiter}>～</span>
              <DatePicker selected={endDate} locale="ja" onChange={date => setEndDate(date)} />
            </div>
            <div className={styles.tagList}>
              {periodList.map(period => (
                <div className={styles.tag} onClick={period.func}>
                  {period.name}
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
              {keywordList.map(keyword => (
                <div className={styles.tag} onClick={keyword.func}>
                  {keyword.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>ブックマーク数</div>
          <div className={styles.blockContent}>
            <input
              type="number"
              min="1"
              placeholder="ブクマ数を入力"
              value={bookmarkCount}
              onChange={e => setBookmarkCount(Number(e.target.value))}
            />
            <div className={styles.tagList}>
              {bookmarkCountList.map(item => (
                <div className={`${styles.tag} ${item.checkActive()}`} onClick={item.func}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
