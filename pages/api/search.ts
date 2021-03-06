import querystring from "querystring";
import { date2str } from "../../helpers/util";
import { SearchResponse } from "../../models/model";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/entries`;
export const PER_PAGE = 20;

/**
 * 条件に合致するエントリを検索する
 * @param startDate 開始日
 * @param endDate 終了日
 * @param keyword キーワード
 * @param bookmarkCount 最小ブックマーク数
 * @param bookmarkCountMax 最大ブックマーク数
 * @param publisherIds 配信元ID
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
  bookmarkCountMax: number,
  publisherIds: number[],
  orderKey: string,
  orderAsc: boolean,
  page: number = 0,
  perPage: number = PER_PAGE
): Promise<SearchResponse> {
  const params = {
    startDate: date2str(startDate),
    endDate: date2str(endDate),
    keyword: keyword,
    bookmarkCount: bookmarkCount,
    bookmarkCountMax: bookmarkCountMax,
    publisherIds: publisherIds,
    isTrend: true,
    order: makeOrderParam(orderKey, orderAsc),
    page: page,
    perPage: perPage,
  };
  const queryString = querystring.stringify(params);
  const url = `${baseUrl}?${queryString}`;
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
