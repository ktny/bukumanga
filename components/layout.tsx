import Head from "next/head";
import styles from "../styles/layout.module.scss";

const siteName = "ブクマンガ";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={styles.header}>{siteName}</header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>bukumanga.com 2021</footer>
    </>
  );
}
