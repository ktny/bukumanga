import classes from "../styles/footer.module.scss";
import { siteName } from "../pages/_app";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div>&copy; 2021 {siteName.toLowerCase()}</div>
    </footer>
  );
}
