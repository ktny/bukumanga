import Head from "next/head";
import styles from "../styles/layout.module.scss";

export const siteName = "ブクマンガ";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="はてなブックマーク数を元にweb漫画をまとめているサイトです。" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteName
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <title>{siteName}</title>
        <meta name="og:title" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>{siteName}</header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>bukumanga.com 2021</footer>
    </>
  );
}
