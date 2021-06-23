import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import classes from "../../styles/period-group.module.scss";
import { IPeriod } from "../../models/model";
import { getInActivePeriods } from "../../helpers/util";

export default function PeriodGroup({
  periods,
  setPeriods,
  setStartDate,
  setEndDate,
}: {
  periods: IPeriod[];
  setPeriods: Dispatch<SetStateAction<IPeriod[]>>;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
}) {
  const setPeriod = (days: number) => {
    return () => {
      const endDate = new Date();
      let startDate = new Date(endDate.getTime());
      if (days === Infinity) {
        startDate = new Date(2005, 0, 1);
      } else {
        startDate.setDate(startDate.getDate() - (days - 1));
      }
      setStartDate(startDate);
      setEndDate(endDate);

      const newPeriods = getInActivePeriods(periods);
      newPeriods.find(period => period.days === days).active = true;
      setPeriods(newPeriods);
    };
  };

  return (
    <ButtonGroup variant="text" className={classes.periods}>
      {periods.map(period => (
        <Button
          key={`${period.days}_${period.active}`}
          className={`${classes.periodItem} ${period.active ? "active" : ""}`}
          onClick={setPeriod(period.days)}
        >
          {period.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
