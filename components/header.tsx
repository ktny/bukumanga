import { Accordion, AccordionSummary, AccordionDetails, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "./search/search";
import classes from "../styles/header.module.scss";

const siteName = "BUKUMANGA!";

export default function Header(props) {
  return (
    <header className={classes.header}>
      <Accordion square expanded={props.isHeaderExpanded}>
        <Toolbar variant="dense">
          <AccordionSummary>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => props.setIsHeaderExpanded(expanded => !expanded)}
            >
              <MenuIcon />
            </IconButton>
          </AccordionSummary>
          <Typography variant="h6" component="h1" color="inherit">
            {siteName}
          </Typography>
          <Typography variant="subtitle2" component="div" color="primary" className={classes.count}>
            {props.count} HIT
          </Typography>
        </Toolbar>
        <AccordionDetails className={classes.accordionDetails}>
          <Search {...props}></Search>
        </AccordionDetails>
      </Accordion>
    </header>
  );
}
