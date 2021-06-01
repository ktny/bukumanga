import React, { Dispatch, SetStateAction } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: { width: 1000 },
  input: { width: 42 },
});

const marks = [
  { value: 100, label: "100" },
  { value: 200, label: "200" },
  { value: 300, label: "300" },
  { value: 400, label: "400" },
  { value: 500, label: "500" },
];

export default function BookmarkCountSlider({
  bookmarkCount,
  setBookmarkCount,
}: {
  bookmarkCount: number;
  setBookmarkCount: Dispatch<SetStateAction<number>>;
}) {
  const classes = useStyles();
  const MIN = 0;
  const MAX = 500;
  const STEP = 10;

  const handleSliderChange = (event: any, newValue: number) => {
    setBookmarkCount(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookmarkCount(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (bookmarkCount < MIN) {
      setBookmarkCount(MIN);
    } else if (bookmarkCount > MAX) {
      setBookmarkCount(MAX);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        ブックマーク数
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={9}>
          <Slider
            min={MIN}
            max={MAX}
            step={STEP}
            value={typeof bookmarkCount === "number" ? bookmarkCount : 0}
            aria-labelledby="discrete-slider-custom"
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            marks={marks}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            className={classes.input}
            value={bookmarkCount}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              min: MIN,
              max: MAX,
              step: STEP,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
