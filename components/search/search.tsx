import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Period from "./period";
import Keyword from "./keyword";
import BookmarkCount from "./bookmark-count";
import search from "../../pages/api/search";
import { IEntry } from "../../models/model";

const useStyles = makeStyles({
  divider: {
    margin: "16px 0",
  },
});

export default function Search({ setEntries }: { setEntries: Dispatch<SetStateAction<IEntry[]>> }) {
  const classes = useStyles();

  const defaultEndDate = new Date();
  const defaultStartDate = new Date(defaultEndDate.getTime());
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [keyword, setKeyword] = useState("");
  const [bookmarkCount, setBookmarkCount] = useState(10);
  const [orderKey, setOrderKey] = useState("bookmark_count");
  const [orderAsc, setOrderAsc] = useState(false);

  // イベントを間引くためにdebounced変数をトリガーにする
  const [debouncedStartDate] = useDebounce(startDate, 1000);
  const [debouncedEndDate] = useDebounce(endDate, 1000);
  const [debouncedKeyword] = useDebounce(keyword, 1000);
  const [debouncedBookmarkCount] = useDebounce(bookmarkCount, 1000);

  useEffect(() => {
    search(debouncedStartDate, debouncedEndDate, debouncedKeyword, debouncedBookmarkCount, orderKey)
      .then(res => res.json())
      .then(res => setEntries(res));
  }, [debouncedStartDate, debouncedEndDate, debouncedKeyword, debouncedBookmarkCount]);

  return (
    <Box mx={3}>
      <Period startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}></Period>
      <Divider classes={{ root: classes.divider }} />
      <Keyword keyword={keyword} setKeyword={setKeyword}></Keyword>
      <Divider classes={{ root: classes.divider }} />
      <BookmarkCount bookmarkCount={bookmarkCount} setBookmarkCount={setBookmarkCount}></BookmarkCount>
      <Divider classes={{ root: classes.divider }} />
    </Box>
  );
}
