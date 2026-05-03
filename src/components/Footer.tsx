import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0f0f19] py-8">
      <div className="mx-auto flex max-w-[var(--max-width)] flex-col items-center gap-4 px-4 text-center">
        <nav className="flex gap-6">
          <Link
            to="/privacy"
            className="text-[13px] text-[#f8fafc] transition-opacity duration-200 hover:opacity-70"
          >
            プライバシーポリシー
          </Link>
          <Link
            to="/terms"
            className="text-[13px] text-[#f8fafc] transition-opacity duration-200 hover:opacity-70"
          >
            利用規約
          </Link>
        </nav>
        <p className="m-0 text-[11px] text-[#f8fafc]">© 2026 BUKUMANGA</p>
      </div>
    </footer>
  );
}
