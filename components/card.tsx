import Image from "next/image";
import styles from "../styles/card.module.scss";

export default function Card({ entry }: { entry: any }) {
  return (
    <div className={styles.card}>
      <div className={styles.bookmarkCount}>
        <span className={styles.bookmarkCountNum}>B! {entry.bookmark_count}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{entry.title}</div>
        </div>
        <div className={styles.img}>
          <Image src={entry.image.String} alt={entry.title} width="256" height="179"></Image>
        </div>
      </div>
    </div>
  );
}
