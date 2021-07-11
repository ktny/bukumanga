import React, { Dispatch, SetStateAction } from "react";
import { createStyles, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { Chip, FormControl, Select, MenuItem } from "@material-ui/core";
import classes from "../../styles/bookmark-count.module.scss";
import { IPublisher } from "../../models/model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: "8px",
      minWidth: 200,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

export default function Publisher({
  publishers,
  publisherIds,
  setPublisherIds,
}: {
  publishers: IPublisher[];
  publisherIds: number[];
  setPublisherIds: Dispatch<SetStateAction<number[]>>;
}) {
  const classes = useStyles();
  const options = publishers;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPublisherIds(event.target.value as number[]);
  };

  return (
    <div>
      <div>ドメイン検索</div>
      <FormControl className={classes.formControl}>
        <Select
          multiple
          value={publisherIds}
          onChange={handleChange}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as number[]).map(publisherId => (
                <Chip
                  key={publisherId}
                  label={options.find(option => option.id === publisherId).name}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
        >
          {options?.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
