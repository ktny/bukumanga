export const date2str = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const str2Date = (str: string): Date => {
  if (!str) {
    return null;
  }
  const d = str.split("-").map(v => Number(v));
  return new Date(d[0], d[1] - 1, d[2]);
};

export const calcDate = (date: Date, diff: number): Date => {
  date.setDate(date.getDate() + diff);
  return date;
};

/**
 * 並び替え用パラメータを作成する
 * @param orderKey 並び替えのキー列
 * @param orderAsc 昇順/降順
 * @return 並び替え用パラメータ
 */
export const makeOrderParam = (orderKey: string, orderAsc: boolean): string => {
  const symbol = orderAsc ? "+" : "-";
  return `${symbol}${orderKey}`;
};

/**
 * 並び替え用パラメータを作成する
 * @param orderKey 並び替えのキー列
 * @param orderAsc 昇順/降順
 * @return 並び替え用パラメータ
 */
export const parseOrderParam = (order: string) => {
  if (!order) {
    return { paramOrderKey: undefined, paramOrderAsc: undefined };
  }
  const paramOrderAsc = order.startsWith("+");
  const paramOrderKey = order.slice(1);
  return { paramOrderKey, paramOrderAsc };
};
