import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/cn";

const navItems = [
  { label: "トレンド", to: "/" },
  { label: "ランキング", to: "/ranking" },
  { label: "検索", to: "/search" },
];

export default function Header() {
  const { pathname } = useLocation();
  const { authenticated, login, logout, user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide
        setIsVisible(false);
      } else {
        // Scrolling up -> show
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (to: string) => {
    if (pathname === to) {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  };

  const isActive = (to: string) => {
    if (to === "/") {
      return pathname === "/" || pathname === "/trend";
    }
    return pathname === to;
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-white/10 bg-[#0f0f19]/90 backdrop-blur-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[var(--max-width)] flex-col px-4">
        <div className="flex h-[60px] items-center justify-between">
          <Link
            to="/"
            onClick={() => handleNavClick("/")}
            className="inline-flex items-center gap-2 text-[#f5f7fb] sm:gap-3"
            aria-label="Bukumanga ホーム"
          >
            <img
              src="/logo.svg"
              alt=""
              aria-hidden="true"
              className="h-8 w-8 shrink-0 sm:h-10 sm:w-10"
            />
            <span className="text-[0.98rem] font-black uppercase leading-none tracking-[0.14em] text-[#f8fafc] sm:text-[1.15rem] sm:tracking-[0.16em]">
              BUKUMANGA
            </span>
          </Link>
          <div className="flex items-center gap-0 sm:gap-3">
            <nav className="hidden items-center gap-2 sm:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  active={isActive(item.to)}
                  onClick={() => handleNavClick(item.to)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="relative flex items-center" ref={menuRef}>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-transparent p-0 leading-none text-[#f8fafc] transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(102,126,234,0.9)] sm:h-10 sm:w-10"
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
                aria-label="メニューを開く"
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
              {isMenuOpen ? (
                <div
                  className="absolute right-0 top-[calc(100%+0.5rem)] flex min-w-[180px] flex-col rounded-[14px] border border-white/10 bg-[rgba(15,15,25,0.96)] p-1.5 shadow-[0_16px_40px_rgba(15,15,25,0.36)] backdrop-blur-[18px]"
                  role="menu"
                >
                  {authenticated ? (
                    <>
                      <div className="px-[0.85rem] py-[0.7rem] text-[0.8rem] font-semibold text-[#cbd5e1]">
                        {user?.name}
                      </div>
                      <Link
                        to="/favorites"
                        className="block rounded-[10px] px-[0.85rem] py-[0.7rem] text-[0.92rem] font-semibold text-[#f8fafc] transition-colors duration-200 hover:bg-white/10"
                        role="menuitem"
                      >
                        お気に入り
                      </Link>
                      <button
                        type="button"
                        onClick={() => void logout()}
                        className="block rounded-[10px] px-[0.85rem] py-[0.7rem] text-left text-[0.92rem] font-semibold text-[#f8fafc] transition-colors duration-200 hover:bg-white/10"
                        role="menuitem"
                      >
                        ログアウト
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => login()}
                      className="block rounded-[10px] px-[0.85rem] py-[0.7rem] text-left text-[0.92rem] font-semibold text-[#f8fafc] transition-colors duration-200 hover:bg-white/10"
                      role="menuitem"
                    >
                      Googleでログイン
                    </button>
                  )}
                  <Link
                    to="/about"
                    className="block rounded-[10px] px-[0.85rem] py-[0.7rem] text-[0.92rem] font-semibold text-[#f8fafc] transition-colors duration-200 hover:bg-white/10"
                    role="menuitem"
                  >
                    このサイトについて
                  </Link>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeg_kL348hfDtVIsR1FFfjTUm20ktCe8kl7mFME-XgRa69ltg/viewform"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block rounded-[10px] px-[0.85rem] py-[0.7rem] text-[0.92rem] font-semibold text-[#f8fafc] transition-colors duration-200 hover:bg-white/10"
                    role="menuitem"
                  >
                    お問い合わせ
                  </a>
                  <a
                    href="https://github.com/ktny/bukumanga"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block rounded-[10px] px-[0.85rem] py-[0.7rem] text-[0.92rem] font-semibold text-[#f8fafc] transition-colors duration-200 hover:bg-white/10"
                    role="menuitem"
                  >
                    GitHub
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <nav className="flex sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleNavClick(item.to)}
              aria-current={isActive(item.to) ? "page" : undefined}
              className={cn(
                "flex h-11 min-w-0 flex-1 touch-manipulation items-center justify-center border-t border-white/10 text-[0.9rem] font-bold text-[#f8fafc] transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:bg-white/5",
                isActive(item.to) &&
                  "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white hover:bg-gradient-to-br",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  to,
  active,
  onClick,
  children,
}: {
  to: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-200 sm:px-4 sm:py-2 sm:text-base ${
        active
          ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
          : "text-[#f8fafc] hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
