import React, { Dispatch, SetStateAction } from "react";
import { Box, Grid, Input, Slider } from "@material-ui/core";
import classes from "../../styles/bookmark-count.module.scss";

export default function BookmarkCount({
  bookmarkCount,
  setBookmarkCount,
  bookmarkCountMax,
  setBookmarkCountMax,
}: {
  bookmarkCount: number;
  setBookmarkCount: Dispatch<SetStateAction<number>>;
  bookmarkCountMax: number;
  setBookmarkCountMax: Dispatch<SetStateAction<number>>;
}) {
  const MIN = 0;
  const MAX = 3500;
  const STEP = 10;

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setBookmarkCount(newValue[0]);
      setBookmarkCountMax(newValue[1]);
    } else {
      setBookmarkCount(newValue);
      setBookmarkCountMax(newValue);
    }
  };

  const handleInputChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookmarkCount(event.target.value === "" ? MIN : Number(event.target.value));
  };

  const handleInputChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookmarkCountMax(event.target.value === "" ? MAX : Number(event.target.value));
  };

  const handleBlur = () => {
    if (bookmarkCount < MIN) {
      setBookmarkCount(MIN);
    } else if (bookmarkCountMax > MAX) {
      setBookmarkCountMax(MAX);
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
            onChange={handleInputChangeMin}
            onBlur={handleBlur}
            inputProps={{ min: MIN, max: MAX, step: STEP, type: "number" }}
            className={classes.sliderInput}
            color="secondary"
          />
        </Grid>
        <Grid item className={classes.gridItemSlider}>
          <Slider
            min={MIN}
            max={MAX}
            step={STEP}
            value={[bookmarkCount, bookmarkCountMax]}
            getAriaValueText={valuetext}
            classes={{ root: classes.sliderRoot }}
            onChange={handleSliderChange}
            color="secondary"
          />
        </Grid>
        <Grid item>
          <Input
            value={bookmarkCountMax}
            onChange={handleInputChangeMax}
            onBlur={handleBlur}
            inputProps={{ min: MIN, max: MAX, step: STEP, type: "number" }}
            className={classes.sliderInput}
            color="secondary"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
