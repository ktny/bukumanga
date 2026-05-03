interface ReadButtonProps {
  url: string;
  label?: string;
  className?: string;
}

export function ReadButton({ url, label = "読む", className }: ReadButtonProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer nofollow" className={className}>
      {label}
    </a>
  );
}
