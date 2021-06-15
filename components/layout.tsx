import Header from "./header";
import Footer from "./footer";
import SideMenu from "./side-menu";
import classes from "../styles/layout.module.scss";

export default function Layout({ children, ...props }: { children: React.ReactNode }) {
  return (
    <>
      <Header {...props} />
      {/* <SideMenu {...props} /> */}
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  );
}
