import React, { Dispatch, SetStateAction } from "react";
import { Box, InputBase } from "@material-ui/core";
import classes from "../../styles/keyword.module.scss";

export default function Keyword({
  keyword,
  setKeyword,
}: {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <Box className={classes.root}>
      <InputBase fullWidth value={keyword} placeholder="スペース区切りでAND検索" onChange={handleInputChange} />
    </Box>
  );
}
