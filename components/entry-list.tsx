import { IEntry } from "../models/model";
import Entry from "./entry";
import Grid from "@material-ui/core/Grid";

export default function EntryList({ entries }: { entries: IEntry[] }) {
  return (
    <Grid container spacing={2}>
      {entries.map((entry, i) => (
        <Grid item key={i}>
          <Entry entry={entry} key={entry.id}></Entry>
        </Grid>
      ))}
    </Grid>
  );
}
