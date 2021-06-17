import React, { Dispatch, SetStateAction } from "react";
import { Box, IconButton, MenuItem, Select } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import classes from "../../styles/order.module.scss";
import { Props } from "../../models/model";

export default function Order(props: Props) {
  const handleOrderKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setOrderKey(event.target.value);
  };
  const handleOrderAscClick = (event: React.MouseEvent<HTMLInputElement>) => {
    props.setOrderAsc(!props.orderAsc);
  };

  return (
    <Box className={classes.root}>
      <div className={classes.count}>
        <span className={classes.countNum}>{props.count}</span> HIT
      </div>
      <div>
        <IconButton edge="start" onClick={handleOrderAscClick}>
          {props.orderAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </IconButton>
        <Select value={props.orderKey} onChange={handleOrderKeyChange}>
          <MenuItem value={"bookmark_count"}>Bookmark Count</MenuItem>
          <MenuItem value={"hotentried_at"}>Hot Entried Date</MenuItem>
          <MenuItem value={"published_at"}>Published Date</MenuItem>
        </Select>
      </div>
    </Box>
  );
}
