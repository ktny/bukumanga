import React, { Dispatch, SetStateAction } from "react";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";

interface Chip {
  label: string;
  value: string;
}

const chips: Chip[] = [
  { label: "少年ジャンプ+", value: "shonenjumpplus.com" },
  { label: "コミックDAYS", value: "comic-days.com" },
  { label: "となりのヤングジャンプ", value: "tonarinoyj.jp" },
  { label: "マガポケ", value: "pocket.shonenmagazine.com" },
  { label: "ジャンプルーキー", value: "rookie.shonenjump.com" },
  { label: "コミックウォーカー", value: "comic-walker.com" },
  { label: "マンガクロス", value: "mangacross.jp" },
  { label: "コミックアクション", value: "comic-action.com" },
  { label: "くらげバンチ", value: "kuragebunch.com" },
  { label: "サンデーうぇぶり", value: "www.sunday-webry.com" },
  { label: "MAGCOMI", value: "magcomi.com" },
  { label: "ニコニコ静画", value: "seiga.nicovideo.jp" },
];

export default function KeywordInput({
  keyword,
  setKeyword,
}: {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClickChip = (chip: Chip) => {
    return () => {
      setKeyword(chip.value);
    };
  };

  return (
    <div>
      <TextField id="standard-basic" label="キーワード" value={keyword} onChange={handleInputChange} />
      <Box mt={1}>
        {chips.map((chip, i) => (
          <Chip size="small" key={i} label={chip.label} clickable color="primary" onClick={handleClickChip(chip)} />
        ))}
      </Box>
    </div>
  );
}
