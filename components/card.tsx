import Head from "next/head";
import styles from "../styles/card.module.css";

export default function Card({ entry }: { entry: any }) {
  return (
    <div className={styles.card}>
      <p>{entry.id}</p>
      <p>{entry.title}</p>
      <p>{entry.bookmark_count}</p>
    </div>
  );
}
