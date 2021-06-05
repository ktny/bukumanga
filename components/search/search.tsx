import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Period from "./period";
import Keyword from "./keyword";
import BookmarkCount from "./bookmark-count";
import Order from "./order";

const useStyles = makeStyles({
  divider: {
    margin: "16px 0",
  },
});

export default function Search(props) {
  const classes = useStyles();

  return (
    <Box mx={3}>
      <Period {...props}></Period>
      <Divider classes={{ root: classes.divider }} />
      <Keyword {...props}></Keyword>
      <Divider classes={{ root: classes.divider }} />
      <BookmarkCount {...props}></BookmarkCount>
      <Divider classes={{ root: classes.divider }} />
      <Order {...props}></Order>
    </Box>
  );
}
