import { Dispatch, SetStateAction } from "react";
import { IEntry } from "../models/model";
import Entry from "./entry";
import { Box, Grid } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";

export default function EntryList({
  entries,
  setEntries,
}: {
  entries: IEntry[];
  setEntries: Dispatch<SetStateAction<IEntry[]>>;
}) {
  //項目を読み込むときのコールバック
  const loadMore = page => {
    setEntries([...entries, page]);
  };

  return (
    <Box p={3}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={true}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
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
