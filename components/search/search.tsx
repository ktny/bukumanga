import { Box, Divider, IconButton, Tooltip } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import Period from "./period";
import Keyword from "./keyword";
import BookmarkCount from "./bookmark-count";
import { defaultKeyword, defaultStartDate, defaultEndDate, defaultBookmarkCount } from "../../pages/index";
import classes from "../../styles/search.module.scss";

export default function Search(props) {
  const reset = () => {
    props.setKeyword(defaultKeyword);
    props.setStartDate(defaultStartDate);
    props.setEndDate(defaultEndDate);
    props.setBookmarkCount(defaultBookmarkCount);
  };

  return (
    <Box className={classes.root}>
      <Keyword {...props}></Keyword>
      <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
      <Period {...props}></Period>
      <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
      <BookmarkCount {...props}></BookmarkCount>
      <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
      <Tooltip title="Reset" classes={{ tooltip: classes.tooltip }}>
        <IconButton onClick={reset}>
          <RefreshIcon></RefreshIcon>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
