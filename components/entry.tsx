import React, { useState } from "react";
import Image from "next/image";
import { IEntry } from "../models/model";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Card, CardHeader, CardContent, Divider, IconButton, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 450,
    position: "relative",
  },
  headerRoot: {
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: red[100],
  },
  headerAvatar: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
  },
  headerAction: {
    marginTop: 0,
  },
  avatar: {
    backgroundColor: red[500],
  },
  body: {
    position: "relative",
    height: "calc(100% - 56px)",
  },
  imageContainer: {
    position: "relative",
  },
  imageSkeleton: {
    position: "absolute",
    zIndex: 0,
  },
  image: {
    position: "absolute",
    zIndex: 1,
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
  comments: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 100,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
});

export default function Entry({ entry }: { entry: IEntry }) {
  const classes = useStyles();

  const is_https = entry.url.startsWith("https");
  const [showComment, setShowComment] = useState(false);

  /**
   * エントリページに遷移する
   * @param e マウスイベント
   */
  const openEntryPage = (e: React.MouseEvent) => {
    window.open(entry.url, "_blank");
  };

  /**
   * ブックマークページに遷移する
   * @param e マウスイベント
   */
  const openBookMarkPage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const s = is_https ? "s/" : "";
    const protocol = is_https ? "https" : "http";
    window.open(`https://b.hatena.ne.jp/entry/${s}${entry.url.replace(`${protocol}://`, "")}`, "_blank");
  };

  /**
   * コメント表示・非表示を切り替える
   * @param e マウスイベント
   */
  const toggleShowComment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowComment(showComment => !showComment);
  };

  const dummyImg =
    "https://cdn-ak-scissors.b.st-hatena.com/image/square/abf4f339344e96f39ffb9c18856eca5d454e63f8/height=280;version=1;width=400/https%3A%2F%2Fanond.hatelabo.jp%2Fimages%2Fog-image-1500.gif";

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          root: classes.headerRoot,
          avatar: classes.headerAvatar,
          title: classes.headerTitle,
          action: classes.headerAction,
        }}
        avatar={<Avatar className={classes.avatar}>{entry.bookmark_count}</Avatar>}
        title="users"
        variant="outlined"
        action={
          <IconButton onClick={toggleShowComment}>
            <SmsOutlinedIcon />
          </IconButton>
        }
        onClick={openBookMarkPage}
      />
      <Box className={classes.body}>
        <Box className={classes.imageContainer}>
          <Skeleton className={classes.imageSkeleton} variant="rect" animation="wave" width={300} height={210} />
          <Image
            className={classes.image}
            layout="responsive"
            src={entry.image.Valid ? entry.image.String : dummyImg}
            alt={entry.title}
            width="300"
            height="210"
            onClick={openEntryPage}
          ></Image>
        </Box>
        <Divider />
        <CardContent onClick={openEntryPage}>
          <Typography className={classes.title} component="h2" gutterBottom>
            {entry.title}
          </Typography>
          <Box className={classes.captions}>
            <Typography variant="caption" component="p" gutterBottom>
              引用: {entry.domain}, b.hatena.ne.jp
            </Typography>
            <Typography variant="caption" component="p" gutterBottom>
              HotEntried: {entry.hotentried_at}
            </Typography>
            <Typography variant="caption" component="p" gutterBottom>
              Published: {entry.published_at}
            </Typography>
          </Box>
        </CardContent>
        {showComment ? (
          <Box className={classes.comments} p={2}>
            {entry.comments.map(c => (
              <Box my={1}>
                {c.username} {c.content}
              </Box>
            ))}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Card>
  );
}
