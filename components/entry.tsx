import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "./util/accordion";
import { IComment, IEntry } from "../models/model";
import { Avatar, Box, Card, CardContent, Divider, Typography } from "@material-ui/core";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import classes from "../styles/entry.module.scss";

const Entry = React.memo(({ entry }: { entry: IEntry }) => {
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

  const createdAt = new Date(entry.created_at);
  const diff = new Date().getTime() - createdAt.getTime();
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  return (
    <Card className={classes.root} component="article">
      <a href={bookMarkUrl()} target="_blank" rel="noopener nofollow" className={classes.bookmarkLink}>
        <div className={classes.headerRoot}>
          <div className={classes.headerAvatar}>
            <Avatar className={classes.headerAvatarIcon}>{entry.bookmark_count}</Avatar>
            <span className={classes.headerTitle}>users</span>
          </div>
        </div>
      </a>
      <div className={classes.body}>
        <Divider />
        <a href={entryUrl()} target="_blank" rel="noopener nofollow" className={classes.imageLink}>
          {/* <img
            src={entry.image.Valid ? entry.image.String : dummyImg}
            alt={entry.title}
            width="300"
            height="210"
            className={classes.image}
          /> */}
        </a>
        <Divider />
        <CardContent className={classes.content}>
          <a href={entryUrl()} target="_blank" rel="noopener nofollow" className={classes.titleLink}>
            <Typography className={classes.title} component="h2" gutterBottom title={entry.title}>
              {entry.title}
            </Typography>
          </a>
          {entry.comments?.length ? (
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
                            <span
                              className={classes.commentContent}
                              dangerouslySetInnerHTML={{ __html: comment.content }}
                            ></span>
                            <span className={classes.commentUsername}>({comment.username})</span>
                          </Typography>
                        </div>
                        <Divider />
                      </div>
                    ))}
                  </div>
                  <a href={bookMarkUrl()} target="_blank" rel="noopener nofollow" className={classes.more}>
                    もっと見る
                  </a>
                </div>
              </AccordionDetails>
            </Accordion>
          ) : (
            <></>
          )}
          <Box className={classes.captions}>
            {diffDays < 7 ? (
              <Typography className={classes.published} variant="subtitle2" component="p" gutterBottom>
                {diffHours === 0 ? "新着" : diffHours < 24 ? `${diffHours}時間前` : `${diffDays}日前`}
              </Typography>
            ) : (
              <></>
            )}
            <Typography className={classes.caption} variant="caption" component="p" gutterBottom>
              {entry.published_at.slice(0, 10)}
            </Typography>
            <Typography className={classes.caption} variant="caption" component="p" gutterBottom>
              {entry.publisher?.name || entry.domain}
            </Typography>
          </Box>
        </CardContent>
      </div>
    </Card>
  );
});

export default Entry;
