import React from "react";
import Image from "next/image";
import styles from "../styles/card.module.scss";
import { Entry } from "../models/model";

export default function Card({ entry }: { entry: Entry }) {
  const clickCard = (e: React.MouseEvent) => {
    window.open(entry.url, "_blank");
  };
  const clickBookMark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://b.hatena.ne.jp/entry/s/${entry.url.replace("https://", "")}`, "_blank");
  };

  const dummyImg =
    "https://cdn-ak-scissors.b.st-hatena.com/image/square/abf4f339344e96f39ffb9c18856eca5d454e63f8/height=280;version=1;width=400/https%3A%2F%2Fanond.hatelabo.jp%2Fimages%2Fog-image-1500.gif";

  return (
    <section className={styles.card}>
      <div className={styles.bookmarkCount}>
        <div className={styles.bookmarkCountNum} onClick={clickBookMark}>
          B! {entry.bookmark_count}
        </div>
      </div>
      <Image
        src={entry.image.Valid ? entry.image.String : dummyImg}
        alt={entry.title}
        width="300"
        height="210"
        onClick={clickCard}
      ></Image>
      <div className={styles.body}>
        <div className={styles.titleWrapper} onClick={clickCard}>
          <div className={styles.title} title={entry.title}>
            {entry.title}
          </div>
        </div>
        <div className={styles.addon}>
          <div className={styles.addonItem}>{entry.domain}</div>
          <div className={styles.addonItem}>HotEntried: {entry.hotentried_at}</div>
          <div className={styles.addonItem}>Published: {entry.published_at}</div>
        </div>
      </div>
    </section>
  );
}
