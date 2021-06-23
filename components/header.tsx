import { Typography } from "@material-ui/core";
import classes from "../styles/header.module.scss";
import { siteName } from "../pages/_app";
import PeriodGroup from "./search/period-group";

export default function Header(props) {
  return (
    <header className={classes.header}>
      <Typography variant="h6" className={classes.title}>
        {siteName}
      </Typography>
      {props.isSP ? <></> : <PeriodGroup {...props}></PeriodGroup>}
    </header>
  );
}
