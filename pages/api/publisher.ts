import { GetPublishersResponse } from "../../models/model";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/publishers`;

/**
 * 条件に合致するエントリを検索する
 * @return 条件に合致するEntryのリスト
 */
export default function getPublishers(): Promise<GetPublishersResponse> {
  return fetch(`${baseUrl}`).then(res => res.json());
}
