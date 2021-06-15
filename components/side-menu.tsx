import { Drawer, Toolbar, Typography, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Search from "./search/search";
// import classes from "../styles/header.module.scss";
import { siteName } from "../pages/_app";

export default function SideMenu(props) {
  return (
    <aside>
      <Drawer anchor="left" open={props.isHeaderExpanded} onClose={() => props.setIsHeaderExpanded(false)}>
        <Typography variant="subtitle2" component="div" color="primary">
          <span>{props.count}</span>HIT
        </Typography>
        <Search {...props}></Search>
      </Drawer>
    </aside>
  );
}
