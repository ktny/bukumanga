import Header from "./header";
import classes from "../styles/layout.module.scss";

export default function Layout({ children, ...props }: { children: React.ReactNode }) {
  return (
    <>
      <Header {...props} />
      <main className={classes.main}>{children}</main>
      <footer>bukumanga.com 2021</footer>
    </>
  );
}
