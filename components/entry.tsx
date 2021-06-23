import React, { useState } from "react";
import { IEntry } from "../models/model";
import { Avatar, Box, Card, CardHeader, CardContent, Divider, Typography } from "@material-ui/core";
import classes from "../styles/entry.module.scss";

export default function Entry({ entry }: { entry: IEntry }) {
  const is_https = entry.url.startsWith("https");

  /**
   * ブックマークページのURLを返す
   * @param e マウスイベント
   */
  const bookMarkUrl = () => {
    const s = is_https ? "s/" : "";
    const protocol = is_https ? "https" : "http";
    return `https://b.hatena.ne.jp/entry/${s}${entry.url.replace(`${protocol}://`, "")}`;
  };

  /**
   * エントリページのURLを返す
   * @param e マウスイベント
   */
  const entryUrl = () => {
    if (entry.url.startsWith("http://neetsha.com")) {
      return entry.url.replace("http://neetsha.com", "https://neetsha.jp");
    }
    return entry.url;
  };

  const dummyImg = "./noimage.png";

  return (
    <Card className={classes.root} component="article">
      <a href={bookMarkUrl()} target="_blank" className={classes.bookmarkLink}>
        <CardHeader
          classes={{
            root: classes.headerRoot,
            avatar: classes.headerAvatar,
            title: classes.headerTitle,
          }}
          avatar={<Avatar className={classes.headerAvatarIcon}>{entry.bookmark_count}</Avatar>}
          title="users"
          variant="outlined"
        />
      </a>
      <a href={entryUrl()} target="_blank" className={classes.body}>
        <Divider />
        <img
          src={entry.image.Valid ? entry.image.String : dummyImg}
          alt={entry.title}
          width="300"
          height="210"
          className={classes.image}
        />
        <Divider />
        <CardContent className={classes.content}>
          <Typography className={classes.title} component="h2" gutterBottom>
            {entry.title}
          </Typography>
          <Box className={classes.captions}>
            <Typography className={classes.caption} variant="caption" component="p" gutterBottom>
              Quoted by: {entry.domain}, b.hatena.ne.jp
            </Typography>
            <Typography className={classes.caption} variant="caption" component="p" gutterBottom>
              Hot Entried: {entry.hotentried_at.slice(0, 10)} / Published: {entry.published_at.slice(0, 10)}
            </Typography>
          </Box>
        </CardContent>
      </a>
    </Card>
  );
}
