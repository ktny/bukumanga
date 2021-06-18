import { Typography } from "@material-ui/core";
import classes from "../styles/header.module.scss";
import { siteName } from "../pages/_app";

export default function Header(props) {
  return (
    <header className={classes.header}>
      <Typography variant="h6">{siteName}</Typography>
    </header>
  );
}
