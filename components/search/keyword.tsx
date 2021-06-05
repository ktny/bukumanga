import React, { Dispatch, SetStateAction } from "react";
import { Box, TextField } from "@material-ui/core";
import Chips, { IChip } from "./chips";

const chips: IChip<string>[] = [
  { label: "少年ジャンプ+", value: "shonenjumpplus.com" },
  { label: "コミックDAYS", value: "comic-days.com" },
  { label: "となりのヤングジャンプ", value: "tonarinoyj.jp" },
  // { label: "ジャンプルーキー", value: "rookie.shonenjump.com" },
  // { label: "コミックウォーカー", value: "comic-walker.com" },
  // { label: "マンガクロス", value: "mangacross.jp" },
  // { label: "コミックアクション", value: "comic-action.com" },
  // { label: "くらげバンチ", value: "kuragebunch.com" },
  // { label: "マガポケ", value: "pocket.shonenmagazine.com" },
  // { label: "サンデーうぇぶり", value: "www.sunday-webry.com" },
  // { label: "MAGCOMI", value: "magcomi.com" },
  // { label: "ニコニコ静画", value: "seiga.nicovideo.jp" },
];

export default function Keyword({ keyword, setKeyword }: { keyword: string; setKeyword: Dispatch<SetStateAction<string>> }) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClickChip = (chip: IChip<string>) => {
    return () => {
      setKeyword(chip.value);
    };
  };

  return (
    <>
      <TextField label="キーワード" variant="outlined" size="small" fullWidth value={keyword} onChange={handleInputChange} />
      <Box mt={1}>
        <Chips chips={chips} clickHandler={handleClickChip}></Chips>
      </Box>
    </>
  );
}
