import { Accordion, AccordionSummary, AccordionDetails, Toolbar, Typography, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Search from "./search/search";
import classes from "../styles/header.module.scss";
import { siteName } from "../pages/_app";

export default function Header(props) {
  return (
    <header className={classes.header}>
      <Accordion className={classes.accordion} square expanded={props.isHeaderExpanded}>
        <Toolbar>
          <AccordionSummary classes={{ content: classes.accContent, expanded: classes.accExpanded }}>
            <IconButton edge="start" color="inherit" onClick={() => props.setIsHeaderExpanded(expanded => !expanded)}>
              <SearchIcon />
            </IconButton>
          </AccordionSummary>
          <Typography variant="h1" component="h1" color="inherit" className={classes.title}>
            {siteName}
          </Typography>
          <Typography variant="subtitle2" component="div" color="primary" className={classes.count}>
            <span className={classes.countNum}>{props.count}</span>HIT
          </Typography>
        </Toolbar>
        <AccordionDetails className={classes.accDetails}>
          <Search {...props}></Search>
        </AccordionDetails>
      </Accordion>
    </header>
  );
}
