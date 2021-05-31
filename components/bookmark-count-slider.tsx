import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 1000,
    },
    margin: {
      height: theme.spacing(3),
    },
    input: {
      width: 42,
    },
  })
);

const marks = [
  {
    value: 100,
    label: "100 users",
  },
  {
    value: 300,
    label: "300 users",
  },
  {
    value: 500,
    label: "500 users",
  },
];

function valuetext(value: number) {
  return `${value} users`;
}

export default function BookmarkCountSlider() {
  const classes = useStyles();
  const [bookmarkCount, setBookmarkCount] = useState(10);

  const handleSliderChange = (event: any, newValue: number) => {
    setBookmarkCount(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookmarkCount(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (bookmarkCount < 0) {
      setBookmarkCount(0);
    } else if (bookmarkCount > 500) {
      setBookmarkCount(500);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            min={0}
            max={500}
            step={10}
            value={typeof bookmarkCount === "number" ? bookmarkCount : 0}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            marks={marks}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={bookmarkCount}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 500,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
