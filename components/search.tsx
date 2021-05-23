import styles from "../styles/search.module.scss";

export default function Search() {
  return (
    <section className={styles.search}>
      <section className={styles.simpleSearch}>
        <div className={styles.button}>週間</div>
        <div className={styles.button}>月間</div>
        <div className={styles.button}>年間</div>
        <div className={styles.button}>全期間</div>
        <div>▼詳細検索</div>
      </section>
      <section className={styles.detailSearch}>
        <div className={styles.block}>
          <div className={styles.blockTitle}>キーワード</div>
          <div className={styles.blockContent}>
            <input type="text" />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>ブックマーク数</div>
          <div className={styles.blockContent}>
            <input type="number" />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>期間指定</div>
          <div className={styles.blockContent}>
            <input type="text" />
          </div>
        </div>
      </section>
    </section>
  );
}
