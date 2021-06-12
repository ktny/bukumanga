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
