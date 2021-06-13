import React, { useState } from "react";
import Image from "next/image";
import { IEntry } from "../models/model";
import { Avatar, Box, Card, CardHeader, CardContent, Divider, IconButton, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import classes from "../styles/entry.module.scss";

export default function Entry({ entry }: { entry: IEntry }) {
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
        avatar={<Avatar className={classes.headerAvatarIcon}>{entry.bookmark_count}</Avatar>}
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
          <Divider />
          <Skeleton className={classes.imageSkeleton} variant="rect" width={300} height={210} animation="wave" />
          <Image
            className={classes.image}
            layout="responsive"
            src={entry.image.Valid ? entry.image.String : dummyImg}
            alt={entry.title}
            width="300"
            height="210"
          ></Image>
          <Divider />
        </Box>
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
        {showComment ? (
          <Box className={classes.comments} p={2}>
            {entry.comments.map((comment, i) => (
              <Box key={i}>
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
