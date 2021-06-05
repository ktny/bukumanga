import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Box, Divider } from "@material-ui/core";
import PeriodInput from "./period-input";
import KeywordInput from "./keyword-input";
import BookmarkCountInput from "./bookmark-count-input";
import search from "../../pages/api/search";
import { IEntry } from "../../models/model";

export default function Search({ setEntries }: { setEntries: Dispatch<SetStateAction<IEntry[]>> }) {
  const defaultEndDate = new Date();
  const defaultStartDate = new Date(defaultEndDate.getTime());
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [keyword, setKeyword] = useState("");
  const [bookmarkCount, setBookmarkCount] = useState(10);
  const [debouncedKeyword] = useDebounce(keyword, 1000);
  const [debouncedBookmarkCount] = useDebounce(bookmarkCount, 1000);

  useEffect(() => {
    search(startDate, endDate, debouncedKeyword, debouncedBookmarkCount)
      .then(res => res.json())
      .then(res => setEntries(res.sort((a, b) => b.bookmark_count - a.bookmark_count)));
  }, [startDate, endDate, debouncedKeyword, debouncedBookmarkCount]);

  return (
    <Box mx={3}>
      <Box mb={2}>
        <PeriodInput
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        ></PeriodInput>
      </Box>
      <Divider />
      <Box my={2}>
        <KeywordInput keyword={keyword} setKeyword={setKeyword}></KeywordInput>
      </Box>
      <Divider />
      <Box mt={2}>
        <BookmarkCountInput bookmarkCount={bookmarkCount} setBookmarkCount={setBookmarkCount}></BookmarkCountInput>
      </Box>
    </Box>
  );
}
