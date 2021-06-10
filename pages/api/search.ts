import { formatDate } from "../../helpers/util";
import { SearchResponse } from "../../models/model";

const baseUrl = "http://localhost:5000/entries";
export const PER_PAGE = 20;

/**
 * 条件に合致するエントリを検索する
 * @param startDate 開始日
 * @param endDate 終了日
 * @param keyword キーワード
 * @param bookmarkCount ブックマーク数
 * @param orderKey 並び替えのキー列
 * @param orderAsc 昇順/降順
 * @param page ページ番号
 * @param perPage ページごとのエントリ数
 * @return 条件に合致するEntryのリスト
 */
export default function search(
  startDate: Date,
  endDate: Date,
  keyword: string,
  bookmarkCount: number,
  orderKey: string,
  orderAsc: boolean,
  page: number = 0,
  perPage: number = PER_PAGE
): Promise<SearchResponse> {
  const params = {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    keyword: keyword,
    bookmarkCount: bookmarkCount.toString(),
    order: makeOrderParam(orderKey, orderAsc),
    page: page.toString(),
    perPage: perPage.toString(),
  };
  const queryString =
    "?" +
    Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURI(v)}`)
      .join("&");

  const url = `${baseUrl}${queryString}`;
  return fetch(url).then(res => res.json());
}

/**
 * 並び替え用パラメータを作成する
 * @param orderKey 並び替えのキー列
 * @param orderAsc 昇順/降順
 * @return 並び替え用パラメータ
 */
function makeOrderParam(orderKey: string, orderAsc: boolean): string {
  const symbol = orderAsc ? "+" : "-";
  return `${symbol}${orderKey}`;
}
