import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import classes from "../styles/header.module.scss";
import { siteName } from "../pages/_app";

export default function Header(props) {
  return (
    <header>
      <AppBar>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => props.setIsHeaderExpanded(expanded => !expanded)}
          >
            <SearchIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {siteName}
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
