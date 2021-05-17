import Head from "next/head";
import styles from "../styles/card-list.module.css";
import Card from "./card";

export default function CardList({ entries }: { entries: any[] }) {
  return (
    <section className={styles.cardList}>
      {entries.map(entry => (
        <Card entry={entry} key={entry.id}></Card>
      ))}
    </section>
  );
}
