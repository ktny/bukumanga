import { formatDate } from "../../helpers/util";

const baseUrl = "http://localhost:5000/entries";

export default function search(startDate: Date, endDate: Date, keyword: string, bookmarkCount: number): Promise<any> {
  const params = {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    keyword: keyword,
    bookmarkCount: bookmarkCount.toString(),
  };
  const queryString =
    "?" +
    Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURI(v)}`)
      .join("&");

  const url = `${baseUrl}${queryString}`;
  return fetch(url);
}
