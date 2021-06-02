import React from "react";
import Image from "next/image";
// import styles from "../styles/card.module.scss";
import { IEntry } from "../models/model";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
      height: 404,
    },
    headerRoot: {
      alignItems: "flex-end",
      padding: 8,
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
  })
);

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
      <CardActionArea onClick={clickBookMark}>
        <CardHeader
          classes={{ root: classes.headerRoot, avatar: classes.headerAvatar, title: classes.headerTitle }}
          avatar={<Avatar className={classes.avatar}>{entry.bookmark_count}</Avatar>}
          title="users"
          variant="outlined"
        />
      </CardActionArea>
      <CardActionArea onClick={clickCard}>
        <Image
          src={entry.image.Valid ? entry.image.String : dummyImg}
          alt={entry.title}
          width="300"
          height="210"
        ></Image>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {entry.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {entry.domain}
            HotEntried: {entry.hotentried_at}
            Published: {entry.published_at}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
