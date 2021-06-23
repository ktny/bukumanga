import { Box, Divider } from "@material-ui/core";
import Period from "./period";
import PeriodGroup from "./period-group";
import Keyword from "./keyword";
import BookmarkCount from "./bookmark-count";
import classes from "../../styles/search.module.scss";

export default function Search(props) {
  return (
    <Box className={classes.root}>
      <Keyword {...props}></Keyword>
      <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
      <Period {...props}></Period>
      {props.isSP ? <PeriodGroup {...props} className={classes.periodGroup}></PeriodGroup> : <></>}
      <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
      <BookmarkCount {...props}></BookmarkCount>
    </Box>
  );
}
