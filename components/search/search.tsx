import { Box, Divider } from "@material-ui/core";
import Period from "./period";
import Keyword from "./keyword";
import BookmarkCount from "./bookmark-count";
import Order from "./order";
import classes from "../../styles/search.module.scss";

export default function Search(props) {
  return (
    <Box>
      <Period {...props}></Period>
      <Divider classes={{ root: classes.divider }} />
      <BookmarkCount {...props}></BookmarkCount>
      <Divider classes={{ root: classes.divider }} />
      <Keyword {...props}></Keyword>
      <Divider classes={{ root: classes.divider }} />
      <Order {...props}></Order>
    </Box>
  );
}
