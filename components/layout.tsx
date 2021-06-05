import Header from "./header";

export default function Layout({ children, ...props }: { children: React.ReactNode }) {
  return (
    <>
      <Header {...props} />
      <main>{children}</main>
      <footer>bukumanga.com 2021</footer>
    </>
  );
}
