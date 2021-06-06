import { Dispatch, SetStateAction, useEffect } from "react";
import lodash from "lodash";
import { Box, CircularProgress, Grid } from "@material-ui/core";
import { IEntry } from "../models/model";
import Entry from "./entry";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "100%",
    overflow: "auto",
  },
  progress: {
    position: "relative",
    left: "calc(50% - 20px)",
    top: "20px",
  },
});

const threshold = 100;

export default function EntryList({
  entries,
  hasMore,
  setPage,
}: {
  entries: IEntry[];
  hasMore: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const classes = useStyles();

  /**
   * ページを読み込むときのコールバック関数
   */
  const handleScroll = lodash.throttle(() => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - threshold) {
      return;
    }
    setPage(page => page + 1);
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box p={3} className={classes.root}>
      <Grid container spacing={3}>
        {entries.map((entry, i) => (
          <Grid item key={i}>
            <Entry entry={entry} key={entry.id}></Entry>
          </Grid>
        ))}
      </Grid>
      {hasMore ? <CircularProgress className={classes.progress} color="secondary" /> : ""}
    </Box>
  );
}
