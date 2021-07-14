import React, { Dispatch, SetStateAction, useEffect } from "react";
import lodash from "lodash";
import { Box, CircularProgress, Fab, Grid } from "@material-ui/core";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { IEntry, Props } from "../models/model";
import Entry from "./entry";
import Order from "../components/search/order";
import classes from "../styles/entry-list.module.scss";
import { range } from "../helpers/util";

const threshold = 100;

const EntryList = (props: Props) => {
  /**
   * ページを読み込むときのコールバック関数
   */
  const handleScroll = lodash.throttle(() => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - threshold) {
      return;
    }
    props.setPage(page => page + 1);
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box className={classes.root}>
      <Order {...props}></Order>
      <Grid container className={classes.entryList}>
        {props.entries.map((entry, i) => (
          <Grid item key={i} className={classes.entryItem}>
            <Entry entry={entry} setPublisherIds={props.setPublisherIds} key={entry.id}></Entry>
          </Grid>
        ))}
        {/* 最終行のspace-betweenが崩れないように高さ0で幅は他のカードと同じダミーを用意する */}
        <Grid item className={classes.entryItemEmpty}></Grid>
        <Grid item className={classes.entryItemEmpty}></Grid>
        <Grid item className={classes.entryItemEmpty}></Grid>
        <Grid item className={classes.entryItemEmpty}></Grid>
      </Grid>
      {props.hasMore ? <CircularProgress className={classes.progress} color="secondary" /> : ""}
      <Fab className={classes.fab} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <UpIcon />
      </Fab>
    </Box>
  );
};

export default EntryList;
