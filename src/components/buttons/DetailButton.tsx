import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

interface DetailButtonProps {
  mangaId: string;
  label?: string;
  className?: string;
}

export function DetailButton({ mangaId, label = "もっと詳しく", className }: DetailButtonProps) {
  return (
    <Link
      to={`/manga/${mangaId}`}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-black/10 px-4 py-2 text-sm font-semibold text-[var(--text-primary,#1a1a2e)] transition-colors duration-200 hover:bg-black/15",
        className,
      )}
    >
      {label}
    </Link>
  );
}
