import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heading: {
    marginTop: "32px",
    fontWeight: "bold",
    "&:first-of-type": {
      marginTop: 0,
    },
  },
});

export default function Announcement() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AnnouncementOutlinedIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>お知らせ</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className={classes.heading}>
            2021-07-17: 人気上昇中アイコンを追加
          </Typography>
          <Typography gutterBottom>
            現在注目度の高い人気の漫画は各漫画の右上で炎アイコンを表示するようになりました。また、期間の初期値が直近（最近3日間）になりました。
          </Typography>
          <Typography gutterBottom className={classes.heading}>
            2021-07-14: 配信サイトフィルター機能を追加
          </Typography>
          <Typography gutterBottom>
            詳細検索から各配信サイトでフィルターする機能を追加しました。各漫画の下部の配信サイト名をクリックしてもフィルターされます。
          </Typography>
          <Typography gutterBottom className={classes.heading}>
            2021-07-03: コメント表示機能を追加
          </Typography>
          <Typography gutterBottom>各漫画のコメント表示機能を追加しました。最大10コメント表示されます。</Typography>
          <Typography gutterBottom className={classes.heading}>
            2021-06-23: 期間ショートカット機能を追加
          </Typography>
          <Typography gutterBottom>
            期間でよく使用する、直近（最近3日間）/週間（7日間）/月間（30日間）/年間（365日間）/歴代のショートカットが用意されました。
          </Typography>
          <Typography gutterBottom className={classes.heading}>
            2021-06-20: サイトがリリースされました。
          </Typography>
          <Typography gutterBottom>当サイト（BUKUMANGA）がリリースされました。</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
