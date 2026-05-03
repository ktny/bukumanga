import { SEO } from "../components/SEO";

const mainClassName = "min-h-screen py-12 pb-20 sm:py-8 sm:pb-16";
const heroClassName = "mx-auto mb-8 max-w-[820px] border-b border-white/10 px-4 pb-8 pt-6";
const titleClassName = "mb-3 text-[2rem] font-extrabold leading-tight";
const metaClassName = "m-0 text-[0.95rem] text-[var(--text-secondary,#94a3b8)]";
const contentClassName =
  "mx-auto flex max-w-[820px] flex-col gap-4 px-4 text-[var(--text-secondary,#cbd5e1)]";
const sectionClassName = "flex flex-col gap-3 pt-4";
const sectionTitleClassName = "m-0 text-[1.2rem] font-bold text-[var(--foreground)]";
const paragraphClassName = "m-0 leading-8";
const listClassName = "list-disc pl-5 leading-8";
const linkClassName = "text-[#9fb3ff] hover:underline";

const UPDATED_AT = "2026年4月18日";

export default function Terms() {
  return (
    <main className={mainClassName}>
      <SEO title="利用規約" description="BUKUMANGAの利用条件について" />
      <section className={heroClassName}>
        <h1 className={titleClassName}>利用規約</h1>
        <p className={metaClassName}>最終更新日: {UPDATED_AT}</p>
      </section>

      <section className={contentClassName}>
        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>サービスについて</h2>
          <p className={paragraphClassName}>
            当サイトは、外部の漫画配信サイト等に関する情報を収集・整理し、閲覧しやすい形で提供するサービスです。掲載内容は予告なく変更されることがあります。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>免責事項</h2>
          <ul className={listClassName}>
            <li>当サイトは、掲載情報の正確性、完全性、最新性、有用性を保証しません</li>
            <li>
              当サイトの利用または利用不能により生じた損害について、当サイト運営者は責任を負いません
            </li>
            <li>
              当サイトから遷移した外部サイトの内容、配信状況、規約等について、当サイト運営者は責任を負いません
            </li>
            <li>当サイトは、予告なく変更、停止または終了することがあります</li>
          </ul>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>権利について</h2>
          <p className={paragraphClassName}>
            当サイトに掲載される作品画像、作品名、ロゴその他第三者に権利が帰属する情報については、各権利者に帰属します。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>お問い合わせ</h2>
          <p className={paragraphClassName}>
            当サイトに関するお問い合わせは、
            <a
              className={linkClassName}
              href="https://docs.google.com/forms/d/e/1FAIpQLSeg_kL348hfDtVIsR1FFfjTUm20ktCe8kl7mFME-XgRa69ltg/viewform"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              お問い合わせフォーム
            </a>
            からご連絡ください。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>改定</h2>
          <p className={paragraphClassName}>
            本ページは、必要に応じて変更することがあります。変更後の内容は当サイトに掲載した時点で効力を生じます。
          </p>
        </section>
      </section>
    </main>
  );
}
