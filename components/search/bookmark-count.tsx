import React, { Dispatch, SetStateAction } from "react";
import { Box, Grid, Input, Slider } from "@material-ui/core";
import classes from "../../styles/bookmark-count.module.scss";

export default function BookmarkCount({
  bookmarkCount,
  setBookmarkCount,
}: {
  bookmarkCount: number;
  setBookmarkCount: Dispatch<SetStateAction<number>>;
  isSP: boolean;
}) {
  const MIN = 0;
  const MAX = 1000;
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
    <Box className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            value={bookmarkCount}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{ min: MIN, max: MAX, step: STEP, type: "number" }}
            className={classes.sliderInput}
            color="secondary"
          />
          <span>users</span>
        </Grid>
        <Grid item className={classes.gridItemSlider}>
          <Slider
            min={MIN}
            max={MAX}
            step={STEP}
            value={typeof bookmarkCount === "number" ? bookmarkCount : 0}
            getAriaValueText={valuetext}
            classes={{ root: classes.sliderRoot }}
            onChange={handleSliderChange}
            color="secondary"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
