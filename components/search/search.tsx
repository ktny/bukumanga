import { Box, Divider } from "@material-ui/core";
import Period from "./period";
import Keyword from "./keyword";
import BookmarkCount from "./bookmark-count";
import Order from "./order";
import classes from "../../styles/search.module.scss";

export default function Search(props) {
  return (
    <Box className={classes.root}>
      <Keyword {...props}></Keyword>
      <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
      <Period {...props}></Period>
      <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
      <BookmarkCount {...props}></BookmarkCount>
      {/* <Order {...props}></Order> */}
    </Box>
  );
}
