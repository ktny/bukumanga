import { Dispatch, SetStateAction, useState } from "react";
import { IEntry } from "../models/model";
import Entry from "./entry";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import search, { PER_PAGE } from "../pages/api/search";

const useStyles = makeStyles({
  root: {
    height: "100%",
    overflow: "auto",
  },
});

export default function EntryList({
  entries,
  setEntries,
  startDate,
  endDate,
  keyword,
  bookmarkCount,
  orderKey,
  orderAsc,
  page,
  setPage,
  hasMore,
  setHasMore,
}: {
  entries: IEntry[];
  setEntries: Dispatch<SetStateAction<IEntry[]>>;
  startDate: Date;
  endDate: Date;
  keyword: string;
  bookmarkCount: number;
  orderKey: string;
  orderAsc: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: Dispatch<SetStateAction<boolean>>;
}) {
  const classes = useStyles();

  /**
   * ページを読み込むときのコールバック関数
   * @param page ページ番号
   */
  const loadMore = (): void => {
    setPage(page + 1);
    search(startDate, endDate, keyword, bookmarkCount, orderKey, orderAsc, page).then(newEntries => {
      setEntries([...entries, ...newEntries]);
      if (newEntries.length < PER_PAGE) {
        setHasMore(false);
        console.log("setHasMore", false);
      }
    });
  };

  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  return (
    <Box p={3} className={classes.root}>
      <InfiniteScroll pageStart={page} loadMore={loadMore} hasMore={hasMore} initialLoad={false} loader={loader}>
        <Grid container spacing={2}>
          {entries.map((entry, i) => (
            <Grid item key={i}>
              <Entry entry={entry} key={entry.id}></Entry>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
}
