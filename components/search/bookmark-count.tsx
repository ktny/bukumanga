import React, { Dispatch, SetStateAction } from "react";
import { Grid, Input, Slider, Typography } from "@material-ui/core";
import { range } from "../../helpers/util";

export default function BookmarkCount({
  bookmarkCount,
  setBookmarkCount,
  isSP,
}: {
  bookmarkCount: number;
  setBookmarkCount: Dispatch<SetStateAction<number>>;
  isSP: boolean;
}) {
  const MIN = 0;
  const MAX = 1000;
  const STEP = 10;

  const marksStep = isSP ? 200 : 100;
  const marks = range(0, 1001, marksStep).map(n => ({ value: n, label: n.toString() }));

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
