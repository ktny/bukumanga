import { Typography } from "@material-ui/core";
import classes from "../styles/header.module.scss";
import { siteName } from "../pages/_app";
import PeriodGroup from "./search/period-group";
import Help from "./menu/help";
import Announcement from "./menu/announcement";

export default function Header(props) {
  return (
    <header className={classes.header}>
      <div className={classes.headerLeft}>
        <Typography variant="h6" component="h1" className={classes.title}>
          <a href="/" className={classes.link}>
            {siteName}
          </a>
        </Typography>
        {props.isSP ? <></> : <PeriodGroup {...props}></PeriodGroup>}
      </div>
      <div className={classes.headerRight}>
        <Announcement></Announcement>
        <Help></Help>
      </div>
    </header>
  );
}
