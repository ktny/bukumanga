import { useState } from "react";
import { Drawer } from "vaul";
import { cn } from "../lib/cn";
import { useMediaQuery } from "../hooks/use-media-query";

interface DatePickerProps {
  period: "monthly" | "yearly";
  year: number;
  month?: number;
  onChange: (year: number, month?: number) => void;
}

export function DatePicker({ period, year, month, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(year);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setViewYear(year); // Reset view year when opening
    }
    setIsOpen(open);
  };

  const currentYear = new Date().getFullYear();

  const CalendarContent = () => {
    const startYear = viewYear - 5;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    const handleMonthSelect = (m: number) => {
      onChange(viewYear, m);
      setIsOpen(false);
    };

    const handleYearSelect = (y: number) => {
      onChange(y);
      setIsOpen(false);
    };

    return (
      <div className="min-w-[280px]">
        {period === "monthly" ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                className="rounded p-2 text-[#ccc] transition hover:bg-white/10 hover:text-white"
                onClick={() => setViewYear(viewYear - 1)}
              >
                ◀
              </button>
              <span className="text-[1.1rem] font-bold">{viewYear}年</span>
              <button
                type="button"
                className="rounded p-2 text-[#ccc] transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                onClick={() => {
                  if (viewYear < currentYear) {
                    setViewYear(viewYear + 1);
                  }
                }}
                disabled={viewYear >= currentYear}
              >
                ▶
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                const isFuture = viewYear === currentYear && m > new Date().getMonth() + 1;
                return (
                  <button
                    key={m}
                    type="button"
                    className={cn(
                      "rounded-md border border-transparent bg-white/5 px-2 py-2 text-center text-[#ccc] transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed",
                      year === viewYear &&
                        month === m &&
                        "border-white/20 bg-[var(--primary,#e63946)] text-white hover:bg-[#d62839]",
                    )}
                    onClick={() => !isFuture && handleMonthSelect(m)}
                    disabled={isFuture}
                    style={{ opacity: isFuture ? 0.3 : 1 }}
                  >
                    {m}月
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                className="rounded p-2 text-[#ccc] transition hover:bg-white/10 hover:text-white"
                onClick={() => setViewYear(viewYear - 10)}
              >
                ◀
              </button>
              <span className="text-[1.1rem] font-bold">
                {startYear} - {startYear + 11}
              </span>
              <button
                type="button"
                className="rounded p-2 text-[#ccc] transition hover:bg-white/10 hover:text-white"
                onClick={() => {
                  const nextStart = viewYear + 10;
                  if (nextStart <= currentYear + 5) {
                    setViewYear(viewYear + 10);
                  }
                }}
              >
                ▶
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  className={cn(
                    "rounded-md border border-transparent bg-white/5 px-2 py-2 text-center text-[#ccc] transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed",
                    year === y &&
                      "border-white/20 bg-[var(--primary,#e63946)] text-white hover:bg-[#d62839]",
                  )}
                  onClick={() => {
                    if (y <= currentYear) {
                      handleYearSelect(y);
                    }
                  }}
                  disabled={y > currentYear}
                  style={{ opacity: y > currentYear ? 0.3 : 1 }}
                >
                  {y}年
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const TriggerButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-base text-white transition hover:border-white/30 hover:bg-white/15"
      {...props}
    >
      📅 {year}年{period === "monthly" && `${month}月`}
    </button>
  );

  if (isDesktop) {
    return (
      <div className="relative inline-block">
        <TriggerButton onClick={() => handleOpenChange(!isOpen)} />
        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Close"
              className="fixed inset-0 z-[99] cursor-default border-0 bg-transparent"
              onClick={() => handleOpenChange(false)}
            />
            <div className="absolute left-0 top-full z-[100] mt-2 min-w-[280px] rounded-xl border border-white/10 bg-[#1a1a1a] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-[10px]">
              <CalendarContent />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Drawer.Trigger asChild>
        <TriggerButton />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[999] bg-black/40" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-[1000] max-h-[85vh] rounded-t-[10px] bg-[#1a1a1a] p-6 outline-none"
          aria-describedby={undefined}
        >
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/20" />
          <div>
            <CalendarContent />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
