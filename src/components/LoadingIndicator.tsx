import { LoaderCircle } from "lucide-react";
import { cn } from "../lib/cn";

interface LoadingIndicatorProps {
  className?: string;
  inline?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClassMap: Record<NonNullable<LoadingIndicatorProps["size"]>, string> = {
  lg: "h-10 w-10",
  md: "h-8 w-8",
  sm: "h-5 w-5",
};

export function LoadingIndicator({
  className,
  inline = false,
  label = "読み込み中",
  size = "lg",
}: LoadingIndicatorProps) {
  return (
    <div
      className={cn(
        "text-[var(--text-secondary)]",
        inline
          ? "inline-flex items-center justify-center"
          : "flex w-full items-center justify-center py-12",
        className,
      )}
      aria-live="polite"
      aria-label={label}
      role="status"
    >
      <LoaderCircle
        className={cn("animate-spin text-[var(--secondary)]", sizeClassMap[size])}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
