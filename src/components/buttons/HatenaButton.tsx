import { BookmarkIcon } from "../icons/BookmarkIcon";

interface HatenaButtonProps {
  url: string;
  count: number;
  showCount?: boolean;
  className?: string;
}

function getHatenaUrl(url: string) {
  const isHttps = url.startsWith("https");
  const s = isHttps ? "s/" : "";
  const protocol = isHttps ? "https" : "http";
  const urlWithoutProtocol = url.replace(`${protocol}://`, "");
  return `https://b.hatena.ne.jp/entry/${s}${urlWithoutProtocol}`;
}

export function HatenaButton({ url, count, showCount = true, className }: HatenaButtonProps) {
  return (
    <a
      href={getHatenaUrl(url)}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={className}
      data-no-count={!showCount}
    >
      <BookmarkIcon />
      {showCount && <span>{count}</span>}
    </a>
  );
}
