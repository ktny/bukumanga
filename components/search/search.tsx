import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Box, Divider } from "@material-ui/core";
import PeriodInput from "./period-input";
import KeywordInput from "./keyword-input";
import BookmarkCountInput from "./bookmark-count-input";

export default function Search({
  search,
}: {
  search: (startDate: Date, endDate: Date, keyword: string, bookmarkCount: number) => void;
}) {
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
    search(startDate, endDate, debouncedKeyword, debouncedBookmarkCount);
  }, [startDate, endDate, debouncedKeyword, debouncedBookmarkCount]);

  return (
    <Box my={3}>
      <Box my={2}>
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
      <Box my={2}>
        <BookmarkCountInput bookmarkCount={bookmarkCount} setBookmarkCount={setBookmarkCount}></BookmarkCountInput>
      </Box>
    </Box>
  );
}
