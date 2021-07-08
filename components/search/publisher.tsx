import React, { Dispatch, SetStateAction } from "react";
import { createStyles, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { Chip, FormControl, Select, MenuItem } from "@material-ui/core";
import classes from "../../styles/bookmark-count.module.scss";

interface IPublisher {
  id: number;
  name: string;
}

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

const options: IPublisher[] = [
  { id: 1, name: "少年ジャンプ+" },
  { id: 2, name: "となりのヤングジャンプ" },
  { id: 3, name: "コミックDAYS" },
  { id: 4, name: "トーチ" },
];

export default function Publisher({
  publisherIds,
  setPublisherIds,
}: {
  publisherIds: number[];
  setPublisherIds: Dispatch<SetStateAction<number[]>>;
}) {
  const classes = useStyles();

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
          {options.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
