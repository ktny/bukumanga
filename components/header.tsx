import { Accordion, AccordionSummary, AccordionDetails, Toolbar, Typography, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Search from "./search/search";
import classes from "../styles/header.module.scss";

const siteName = "BUKUMANGA!";

export default function Header(props) {
  return (
    <header className={classes.header}>
      <Accordion square expanded={props.isHeaderExpanded}>
        <Toolbar>
          <AccordionSummary classes={{ content: classes.accContent, expanded: classes.accExpanded }}>
            <IconButton
              edge="start"
              className={classes.iconButton}
              color="inherit"
              onClick={() => props.setIsHeaderExpanded(expanded => !expanded)}
            >
              <SearchIcon />
            </IconButton>
          </AccordionSummary>
          <Typography variant="h6" component="h1" color="inherit">
            {siteName}
          </Typography>
          <Typography variant="subtitle2" component="div" color="primary" className={classes.count}>
            {props.count} HIT
          </Typography>
        </Toolbar>
        <AccordionDetails className={classes.accDetails}>
          <Search {...props}></Search>
        </AccordionDetails>
      </Accordion>
    </header>
  );
}
