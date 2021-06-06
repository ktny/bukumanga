import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Accordion, AccordionSummary, AccordionDetails, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "./search/search";

const siteName = "BUKUMANGA";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      position: "sticky",
      left: 0,
      top: 0,
      zIndex: 1000,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function Header(props) {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Accordion square>
        <Toolbar variant="dense">
          <AccordionSummary>
            <IconButton edge="start" className={classes.menuButton} color="inherit">
              <MenuIcon />
            </IconButton>
          </AccordionSummary>
          <Typography variant="h6" component="h1" color="inherit">
            {siteName}
          </Typography>
        </Toolbar>
        <AccordionDetails>
          <Search {...props}></Search>
        </AccordionDetails>
      </Accordion>
    </header>
  );
}
