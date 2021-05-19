import styles from "../styles/menu.module.scss";

export default function Menu() {
  return (
    <section className={styles.menu}>
      <div className={styles.button}>週間</div>
      <div className={styles.button}>月間</div>
      <div className={styles.button}>年間</div>
      <div className={styles.button}>全期間</div>
    </section>
  );
}
