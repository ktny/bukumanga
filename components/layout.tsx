import Header from "./header";
import Footer from "./footer";
import classes from "../styles/layout.module.scss";

export default function Layout({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div className={classes.container}>
      <Header {...props} />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
}
