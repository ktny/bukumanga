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
    "&:hover": {
      cursor: "pointer",
    },
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
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#f3f3f3",
    },
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
  content: {
    cursor: "pointer",
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
    overflow: "scroll",
  },
  commentIcon: {
    display: "inline-block",
    verticalAlign: "middle",
    width: 24,
    height: 24,
    marginRight: 8,
  },
  commentContent: {
    fontSize: 13,
    marginRight: 4,
  },
  commentUsername: {
    fontSize: 11,
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
      <Box className={classes.body} onClick={openEntryPage}>
        <Box className={classes.imageContainer}>
          <Skeleton className={classes.imageSkeleton} variant="rect" animation="wave" width={300} height={210} />
          <Image
            className={classes.image}
            layout="responsive"
            src={entry.image.Valid ? entry.image.String : dummyImg}
            alt={entry.title}
            width="300"
            height="210"
          ></Image>
        </Box>
        <Divider />
        <CardContent className={classes.content}>
          <Typography className={classes.title} component="h2" gutterBottom>
            {entry.title}
          </Typography>
          <Box className={classes.captions}>
            <Typography variant="caption" component="p" gutterBottom>
              引用: {entry.domain}, b.hatena.ne.jp
            </Typography>
            <Typography variant="caption" component="p" gutterBottom>
              HotEntried: {entry.hotentried_at.slice(0, 10)}
            </Typography>
            <Typography variant="caption" component="p" gutterBottom>
              Published: {entry.published_at.slice(0, 10)}
            </Typography>
          </Box>
        </CardContent>
        {showComment ? (
          <Box className={classes.comments} p={2}>
            {entry.comments.map(comment => (
              <Box>
                <Box my={1.5}>
                  <Avatar variant="square" className={classes.commentIcon} src={comment.icon} alt={comment.username} />
                  <span className={classes.commentContent}>{comment.content}</span>
                  <span className={classes.commentUsername}>({comment.username})</span>
                </Box>
                <Divider />
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
