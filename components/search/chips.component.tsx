import { Chip } from "@material-ui/core";

export interface IChip<T> {
  label: string;
  value: T;
}

export default function Chips<T>({
  chips,
  clickHandler,
}: {
  chips: IChip<T>[];
  clickHandler: (chip: IChip<T>) => () => void;
}) {
  return (
    <>
      {chips.map((chip, i) => (
        <Chip size="small" key={i} label={chip.label} clickable color="primary" onClick={clickHandler(chip)} />
      ))}
    </>
  );
}
