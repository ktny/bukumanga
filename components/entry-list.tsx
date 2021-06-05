import { IEntry } from "../models/model";
import Entry from "./entry";
import { Box, Grid } from "@material-ui/core";

export default function EntryList({ entries }: { entries: IEntry[] }) {
  return (
    <Box p={3}>
      <Grid container spacing={2}>
        {entries.map((entry, i) => (
          <Grid item key={i}>
            <Entry entry={entry} key={entry.id}></Entry>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
