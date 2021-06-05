import React from "react";
import Image from "next/image";
import { IEntry } from "../models/model";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Card, CardHeader, CardContent, Divider, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 450,
    position: "relative",
  },
  headerRoot: {
    alignItems: "flex-end",
    padding: "8px 16px",
    backgroundColor: red[100],
  },
  headerAvatar: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
  },
  avatar: {
    backgroundColor: red[500],
  },
  image: {
    display: "block",
  },
  title: {
    fontSize: 15,
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
    overflow: "hidden",
  },
  captions: {
    position: "absolute",
    right: 8,
    bottom: 8,
    textAlign: "right",
  },
});

export default function Entry({ entry }: { entry: IEntry }) {
  const classes = useStyles();

  const clickCard = (e: React.MouseEvent) => {
    window.open(entry.url, "_blank");
  };
  const clickBookMark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://b.hatena.ne.jp/entry/s/${entry.url.replace("https://", "")}`, "_blank");
  };

  const dummyImg =
    "https://cdn-ak-scissors.b.st-hatena.com/image/square/abf4f339344e96f39ffb9c18856eca5d454e63f8/height=280;version=1;width=400/https%3A%2F%2Fanond.hatelabo.jp%2Fimages%2Fog-image-1500.gif";

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ root: classes.headerRoot, avatar: classes.headerAvatar, title: classes.headerTitle }}
        avatar={<Avatar className={classes.avatar}>{entry.bookmark_count}</Avatar>}
        title="users"
        variant="outlined"
        onClick={clickBookMark}
      />
      <Image
        layout="responsive"
        src={entry.image.Valid ? entry.image.String : dummyImg}
        alt={entry.title}
        width="300"
        height="210"
        onClick={clickCard}
      ></Image>
      <Divider />
      <CardContent onClick={clickCard}>
        <Typography className={classes.title} component="h2" gutterBottom>
          {entry.title}
        </Typography>
        <Box className={classes.captions}>
          <Typography variant="caption" component="p" gutterBottom>
            {entry.domain}
          </Typography>
          <Typography variant="caption" component="p" gutterBottom>
            HotEntried: {entry.hotentried_at}
          </Typography>
          <Typography variant="caption" component="p" gutterBottom>
            Published: {entry.published_at}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}