import React, { Dispatch, SetStateAction } from "react";
import { IconButton, MenuItem, Select, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export default function Order({
  orderKey,
  setOrderKey,
  orderAsc,
  setOrderAsc,
}: {
  orderKey: string;
  setOrderKey: Dispatch<SetStateAction<string>>;
  orderAsc: boolean;
  setOrderAsc: Dispatch<SetStateAction<boolean>>;
}) {
  const handleOrderKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderKey(event.target.value);
  };
  const handleOrderAscClick = (event: React.MouseEvent<HTMLInputElement>) => {
    setOrderAsc(!orderAsc);
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        並び替え
      </Typography>
      <IconButton edge="start" onClick={handleOrderAscClick}>
        {orderAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
      <Select value={orderKey} onChange={handleOrderKeyChange}>
        <MenuItem value={"bookmark_count"}>ブックマーク数</MenuItem>
        <MenuItem value={"hotentried_at"}>ホットエントリー日</MenuItem>
        <MenuItem value={"published_at"}>公開日</MenuItem>
      </Select>
    </>
  );
}
