import React, { Dispatch, SetStateAction } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import { date2str } from "../../helpers/util";
import classes from "../../styles/period.module.scss";

export default function Period({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
}) {
  const handleInputChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(event.target.value));
  };

  const handleInputChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(event.target.value));
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item>
          <TextField id="date" type="date" value={date2str(startDate)} onChange={handleInputChangeStartDate} />
        </Grid>
        <span className={classes.glue}>~</span>
        <Grid item>
          <TextField id="date" type="date" value={date2str(endDate)} onChange={handleInputChangeEndDate} />
        </Grid>
      </Grid>
    </Box>
  );
}
