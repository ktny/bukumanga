import React, { Dispatch, SetStateAction } from "react";
import { Chip, FormControl, Select, MenuItem } from "@material-ui/core";
import { IPublisher } from "../../models/model";
import classes from "../../styles/publisher.module.scss";

export default function Publisher({
  publishers,
  publisherIds,
  setPublisherIds,
}: {
  publishers: IPublisher[];
  publisherIds: number[];
  setPublisherIds: Dispatch<SetStateAction<number[]>>;
}) {
  const options = publishers;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPublisherIds(event.target.value as number[]);
  };

  return (
    <div>
      <div>配信サイト</div>
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
