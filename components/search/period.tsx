import React, { Dispatch, SetStateAction } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import { date2str, getInActivePeriods } from "../../helpers/util";
import classes from "../../styles/period.module.scss";
import { IPeriod } from "../../models/model";

export default function Period({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  periods,
  setPeriods,
}: {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  periods: IPeriod[];
  setPeriods: Dispatch<SetStateAction<IPeriod[]>>;
}) {
  const handleInputChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(event.target.value));
    if (periods.some(p => p.active)) {
      const newPeriods = getInActivePeriods(periods);
      setPeriods(newPeriods);
    }
  };

  const handleInputChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(event.target.value));
    if (periods.some(p => p.active)) {
      const newPeriods = getInActivePeriods(periods);
      setPeriods(newPeriods);
    }
  };

  return (
    <Box className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <TextField
            id="date"
            type="date"
            value={date2str(startDate)}
            onChange={handleInputChangeStartDate}
            classes={{ root: classes.input }}
            color="secondary"
            inputProps={{ min: "2005-01-01", max: date2str(endDate) }}
          />
        </Grid>
        <span className={classes.glue}>~</span>
        <Grid item className={classes.gridItem}>
          <TextField
            id="date"
            type="date"
            value={date2str(endDate)}
            onChange={handleInputChangeEndDate}
            classes={{ root: classes.input }}
            color="secondary"
            inputProps={{ min: "2005-01-01", max: date2str(endDate) }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
