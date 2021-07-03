import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { IEntry } from "../models/model";
import { Avatar, Box, Card, CardHeader, CardContent, Divider, Typography } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
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

  const Accordion = withStyles({
    root: {
      border: "none",
      boxShadow: "none",
      fontFamily: "Noto Sans JP",
      backgroundColor: "#fafafa",
      margin: 0,
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: 0,
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      padding: "16px 0",
      minHeight: 0,
      "&$expanded": {
        minHeight: 0,
      },
    },
    content: {
      margin: 0,
      "&$expanded": {
        margin: 0,
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles({
    root: {
      padding: 0,
    },
  })(MuiAccordionDetails);

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
      <div className={classes.body}>
        <Divider />
        <a href={entryUrl()} target="_blank" className={classes.imageLink}>
          <img
            src={entry.image.Valid ? entry.image.String : dummyImg}
            alt={entry.title}
            width="300"
            height="210"
            className={classes.image}
          />
        </a>
        <Divider />
        <CardContent className={classes.content}>
          <a href={entryUrl()} target="_blank" className={classes.titleLink}>
            <Typography className={classes.title} component="h2" gutterBottom title={entry.title}>
              {entry.title}
            </Typography>
          </a>
          {entry.comments.length ? (
            <Accordion>
              <AccordionSummary>
                <div className={classes.commentOpen}>
                  <ChatOutlinedIcon></ChatOutlinedIcon>
                  <span className={classes.commentBlockTitle}>コメントを見る</span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <div className={classes.comments}>
                    {entry.comments.map(comment => (
                      <div>
                        <div className={classes.comment}>
                          <Typography className={classes.caption} variant="caption" component="p">
                            <Avatar className={classes.commentIcon} src={comment.icon} />
                            <span className={classes.commentContent}>{comment.content}</span>
                            <span className={classes.commentUsername}>({comment.username})</span>
                          </Typography>
                        </div>
                        <Divider />
                      </div>
                    ))}
                  </div>
                  <a href={bookMarkUrl()} target="_blank" className={classes.more}>
                    もっと見る
                  </a>
                </div>
              </AccordionDetails>
            </Accordion>
          ) : (
            <></>
          )}
          <Box className={classes.captions}>
            <Typography className={classes.caption} variant="caption" component="p" gutterBottom>
              Quote: {entry.domain}, b.hatena.ne.jp
            </Typography>
            <Typography className={classes.caption} variant="caption" component="p" gutterBottom>
              Published: {entry.published_at.slice(0, 10)}
            </Typography>
          </Box>
        </CardContent>
      </div>
    </Card>
  );
}
