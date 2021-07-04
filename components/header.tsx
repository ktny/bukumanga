import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import classes from "../styles/header.module.scss";
import { siteName } from "../pages/_app";
import PeriodGroup from "./search/period-group";

export default function Header(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerLeft}>
        <Typography variant="h6" component="h1" className={classes.title}>
          <a href="/" className={classes.link}>
            {siteName}
          </a>
        </Typography>
        {props.isSP ? <></> : <PeriodGroup {...props}></PeriodGroup>}
      </div>
      <IconButton onClick={handleClickOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>About</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className="bold">
            当サイトについて
          </Typography>
          <Typography gutterBottom>
            当サイトでは、はてな社様のサービス「
            <a href="https://b.hatena.ne.jp/" target="_blank" rel="noopener nofollow">
              はてなブックマーク
            </a>
            」を元にwebマンガをまとめています。はてな社様への負荷軽減のため一定の間隔を空けて情報を更新しています。
          </Typography>
          <Typography gutterBottom className={classes.mt}>
            アクセス解析ツールについて
          </Typography>
          <Typography gutterBottom>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </Typography>
          <Typography gutterBottom className={classes.mt}>
            お問い合わせ
          </Typography>
          <Typography gutterBottom>
            <a href="https://forms.gle/xAngdgWxsJ6QiSwA9" target="_blank" rel="noopener nofollow">
              こちら
            </a>
            のGoogleFormsからお問い合わせお願いします。
          </Typography>
          <Typography gutterBottom className={classes.mt}>
            開発者について
          </Typography>
          <Typography gutterBottom>
            <div>
              <span>Twitter: </span>
              <a href="https://twitter.com/kattsu_3" target="_blank" rel="noopener nofollow">
                @kattsu_3
              </a>
            </div>
            <div>
              <span>GitHub: </span>
              <a href="https://github.com/ktny/bukumanga" target="_blank" rel="noopener nofollow">
                bukumanga
              </a>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}
