import Header from "./header";
import Footer from "./footer";

export default function Layout({ children, ...props }: { children: React.ReactNode }) {
  return (
    <>
      <Header {...props} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
