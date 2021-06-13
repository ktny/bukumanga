import { Dispatch, SetStateAction, useEffect } from "react";
import lodash from "lodash";
import { Box, CircularProgress, Fab, Grid } from "@material-ui/core";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { IEntry } from "../models/model";
import Entry from "./entry";
import classes from "../styles/entry-list.module.scss";
import { range } from "../helpers/util";

const threshold = 100;

export default function EntryList({
  entries,
  hasMore,
  setPage,
  count,
}: {
  entries: IEntry[];
  hasMore: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  count: number;
}) {
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
    <Box className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        {entries.map((entry, i) => (
          <Grid item key={i}>
            <Entry entry={entry} key={entry.id}></Entry>
          </Grid>
        ))}
        {range(0, count % 5).map((_, i) => (
          <Grid item key={`empty${i}`} className={classes.gridItemEmpty}></Grid>
        ))}
      </Grid>
      {hasMore ? <CircularProgress className={classes.progress} color="secondary" /> : ""}
      <Fab className={classes.fab} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <UpIcon />
      </Fab>
    </Box>
  );
}
