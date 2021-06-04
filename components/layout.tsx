import Header from "./header";

const siteName = "ブクマンガ";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>bukumanga.com 2021</footer>
    </>
  );
}
