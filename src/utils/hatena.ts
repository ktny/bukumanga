/**
 * はてなブックマーク関連のユーティリティ
 */

/**
 * URLからはてなブックマークエントリーページのURLを生成する
 * 例: https://shonenjumpplus.com/episode/xxx
 *   -> https://b.hatena.ne.jp/entry/s/shonenjumpplus.com/episode/xxx
 */
export function getHatenaUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === "https:" ? "s/" : ""; // Https -> s, http -> 空文字
    const { host } = urlObj;
    const path = urlObj.pathname + urlObj.search + urlObj.hash;
    return `https://b.hatena.ne.jp/entry/${protocol}${host}${path}`;
  } catch {
    // URLパースに失敗した場合は空文字を返す
    return "";
  }
}
