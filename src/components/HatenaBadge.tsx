import { cn } from "../lib/cn";

interface HatenaBadgeProps {
  count: number;
  className?: string;
  compact?: boolean;
  hatenaUrl?: string;
}

export function HatenaBadge({
  count,
  className = "",
  compact = false,
  hatenaUrl,
}: HatenaBadgeProps) {
  const wrapperClassName = cn(
    "inline-flex bg-transparent p-0",
    compact ? "items-center gap-1" : "items-baseline gap-1",
    hatenaUrl && "transition-opacity duration-200 hover:opacity-70",
    className,
  );

  const badgeContent = compact ? (
    <>
      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4136] to-[#ff6b6b] px-2 text-lg font-bold leading-none text-white">
        {count}
      </span>
      <span className="ml-1 text-[1.1rem] font-medium leading-none text-[#666]">users</span>
    </>
  ) : (
    <>
      <span className="text-[1.6rem] font-bold leading-none text-[#ff4136]">{count}</span>
      <span className="text-[1.1rem] font-medium leading-none text-[#666]">users</span>
    </>
  );

  if (hatenaUrl) {
    return (
      <a
        href={hatenaUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={wrapperClassName}
      >
        {badgeContent}
      </a>
    );
  }

  return <div className={wrapperClassName}>{badgeContent}</div>;
}
