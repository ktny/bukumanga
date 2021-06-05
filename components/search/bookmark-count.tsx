import React, { Dispatch, SetStateAction } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Input, Slider, Typography } from "@material-ui/core";

const marks = [
  { value: 100, label: "100" },
  { value: 200, label: "200" },
  { value: 300, label: "300" },
  { value: 400, label: "400" },
  { value: 500, label: "500" },
];

export default function BookmarkCount({
  bookmarkCount,
  setBookmarkCount,
}: {
  bookmarkCount: number;
  setBookmarkCount: Dispatch<SetStateAction<number>>;
}) {
  const useStyles = makeStyles({ root: { width: 1000 } });
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

  const valuetext = (value: number) => {
    return `${value} users`;
  };

  return (
    <>
      <Typography id="input" variant="subtitle1" gutterBottom>
        ブックマーク数
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={9}>
          <Slider
            min={MIN}
            max={MAX}
            step={STEP}
            marks={marks}
            value={typeof bookmarkCount === "number" ? bookmarkCount : 0}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            aria-labelledby="bookmark-count-slider"
            onChange={handleSliderChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            value={bookmarkCount}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              min: MIN,
              max: MAX,
              step: STEP,
              type: "number",
              "aria-labelledby": "input",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
