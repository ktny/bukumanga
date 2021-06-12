/**
 * Dateをstringに変換する
 * @param date 日付
 * @return 日付文字列
 */
export const date2str = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * 指定の数値配列を作成する
 * @param start 開始数値
 * @param end 終了数値
 * @param step ステップ数
 * @return 開始から終了までの数値配列
 */
export const range = (start: number, end: number, step: number = 1): number[] => {
  return [...Array(Math.floor((end - start) / step) + 1)].map((_, i) => start + i * step);
};
