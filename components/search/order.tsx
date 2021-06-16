import React, { Dispatch, SetStateAction } from "react";
import { Box, IconButton, MenuItem, Select } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import classes from "../../styles/order.module.scss";

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
    <Box className={classes.root}>
      <span className={classes.subTitle}>Sort By</span>
      <IconButton edge="start" onClick={handleOrderAscClick}>
        {orderAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
      <Select value={orderKey} onChange={handleOrderKeyChange}>
        <MenuItem value={"bookmark_count"}>Bookmark Count</MenuItem>
        <MenuItem value={"hotentried_at"}>Hot Entried Date</MenuItem>
        <MenuItem value={"published_at"}>Published Date</MenuItem>
      </Select>
    </Box>
  );
}
