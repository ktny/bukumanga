import React, { Dispatch, SetStateAction } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import { date2str } from "../../helpers/util";
import Chips, { IChip } from "./chips";

const chips: IChip<number>[] = [
  { label: "今週", value: 7 },
  { label: "今月", value: 30 },
  { label: "今年", value: 365 },
  { label: "全期間", value: -1 },
];

const HATEBU_START_DATE = new Date(2005, 1, 10);

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

  const handleClickChip = (chip: IChip<number>) => {
    return () => {
      const days = chip.value;
      const endDate = new Date();
      setEndDate(endDate);
      let startDate = new Date(endDate.getTime());
      if (days === -1) {
        startDate = HATEBU_START_DATE;
      } else {
        startDate.setDate(startDate.getDate() - days);
      }
      setStartDate(startDate);
      setEndDate(endDate);
    };
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            id="date"
            label="開始日"
            type="date"
            value={date2str(startDate)}
            onChange={handleInputChangeStartDate}
          />
        </Grid>
        <Grid item>
          <TextField
            id="date"
            label="終了日"
            type="date"
            value={date2str(endDate)}
            onChange={handleInputChangeEndDate}
          />
        </Grid>
      </Grid>
      <Box mt={1}>
        <Chips chips={chips} clickHandler={handleClickChip}></Chips>
      </Box>
    </>
  );
}
