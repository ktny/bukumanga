import { Dispatch, SetStateAction } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "./search/search";
import { IEntry } from "../models/model";

const siteName = "BUKUMANGA";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "10px 0",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function Header({ setEntries }: { setEntries: Dispatch<SetStateAction<IEntry[]>> }) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Accordion>
        <Toolbar variant="dense">
          <AccordionSummary>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </AccordionSummary>
          <Typography variant="h6" component="h1" color="inherit">
            {siteName}
          </Typography>
        </Toolbar>
        <AccordionDetails>
          <Search setEntries={setEntries}></Search>
        </AccordionDetails>
      </Accordion>
    </AppBar>
  );
}
