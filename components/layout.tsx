import Header from "./header";
import Footer from "./footer";
import SideMenu from "./side-menu";

export default function Layout({ children, ...props }: { children: React.ReactNode }) {
  return (
    <>
      <Header {...props} />
      <SideMenu {...props} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
