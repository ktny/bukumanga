import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/search.module.scss";

export default function Search() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <section className={styles.search}>
      <section className={styles.detailSearch}>
        <div className={styles.block}>
          <div className={styles.blockTitle}>期間指定</div>
          <div className={styles.blockContent}>
            <div className={styles.shortcuts}>
              <div className={styles.button}>今週</div>
              <div className={styles.button}>今月</div>
              <div className={styles.button}>今年</div>
              <div className={styles.button}>全期間</div>
            </div>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <span className={styles.periodDelimiter}>～</span>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>キーワード</div>
          <div className={styles.blockContent}>
            <div className={styles.shortcuts}>
              <div className={styles.button}>少年ジャンプ+</div>
              <div className={styles.button}>コミックDAYS</div>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>ブックマーク数</div>
          <div className={styles.blockContent}>
            <div className={styles.shortcuts}>
              <div className={styles.button}>3 users</div>
              <div className={styles.button}>10 users</div>
              <div className={styles.button}>50 users</div>
              <div className={styles.button}>100 users</div>
            </div>
            <input type="number" />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.button}>検索</div>
        </div>
      </section>
    </section>
  );
}
